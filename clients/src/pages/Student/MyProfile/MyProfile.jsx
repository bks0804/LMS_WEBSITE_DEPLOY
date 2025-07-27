import React, { useContext, useEffect, useState } from "react";
import Course from "../Course";
import axios from "axios";
import { AppContext } from "../../../components/ContextApi";
// import User from "../../../../../models/userModel";

const MyProfile = () => {
  const [editProfileModel, setEditProfileModel] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [course, setCourse] = useState(null);
  const [queryReply, setQueryReply] = useState(null);
  // console.log(user);

  const handleOpenProfileEdit = () => {
    setEditProfileModel(true);
  };
  const handleCloseProfileEdit = () => {
    setEditProfileModel(false);
  };

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("profilePhoto", profilePhoto);

      // for (let [key, value] of formdata.entries()) {
      //   // console.log(`${key}:`, value);
      // }

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "FRONTEND_SERVER_API/api/user/profile/update",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      setUser(response.data);
      setEditProfileModel(false);
    } catch (error) {
      // console.log(error);
    }
    // console.log(name, profilePhoto);
  };

  const getuserdetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.get("FRONTEND_SERVER_API/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("Fetched user:", res.data.user);
      setCourse(res.data.user);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    }
  };
  useEffect(() => {
    getuserdetails();
  }, []);
  // console.log(course);

  // Profile By first Letter
  const firstLettor = user?.user?.firstName?.charAt(0).toUpperCase() || " ";

  const textColor = () => {
    if (["A", "C", "E", "G", "I", "K", "B"].includes(firstLettor)) {
      return "bg-[#f2ae66]";
    } else if (["D", "F", "H", "J", "L"].includes(firstLettor)) {
      return "bg-[#9f5255]";
    } else if (["M", "O", "Q", "S", "U"].includes(firstLettor)) {
      return "bg-[#eb5a3c]";
    } else if (["N", "P", "R", "T", "V"].includes(firstLettor)) {
      return "bg-[#4c585b]";
    } else if (["W", "X", "Y", "Z"].includes(firstLettor)) {
      return "bg-[#86a788]";
    }
  };

  // //
  const handleGetQueryReply = async () => {
    try {
      const token = localStorage.getItem("token");
      // const userId = user?.user._id;
      // console.log(userId);
      const response = await axios.get(
        `FRONTEND_SERVER_API/api/contactus/getqueryreply`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data);
      setQueryReply(response.data.reply);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    handleGetQueryReply();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto px-3 my-24 ">
        <h1 className="font-bold text-2xl ml-5 md:ml-0 text-center md:text-left">
          PROFILE
        </h1>
        <div className="flex gap-8 my-12">
          {user.user.photoUrl ? (
            <img
              className="h-24 w-24 md:w:28 rounded-full border ml-5 lg:ml-0 object-cover"
              src={user?.user?.photoUrl || "/logo/user.png"}
              alt=""
            />
          ) : (
            <span
              className={`h-24 w-24 md:w:28 flex items-center ${textColor()} text-white justify-center rounded-full pt-[4px] pr-[8px] font-semibold text-5xl p-2.5`}
            >
              {firstLettor}
            </span>
          )}

          {/* </div> */}
          <div className="mt-2">
            <div className="text-lg font-bold">
              Name :{" "}
              <span className="text-base font-semibold">
                {user?.user?.name || user.user?.firstName} {user.user?.lastName}
              </span>
            </div>
            <div className="text-lg font-bold">
              User Id :{" "}
              <span className="text-base font-semibold">
                {user.user?.userUniqueId || "No Available"}
              </span>
            </div>
            <div className="text-lg font-bold">
              Email :{" "}
              <span className="text-base font-semibold">
                {user?.user?.email}
              </span>
            </div>
            <div className="text-lg font-bold">
              Role :{" "}
              <span className="text-base font-semibold uppercase">
                {user?.user?.role}
              </span>
            </div>
            <div className="text-lg font-bold">
              Mobile :{" "}
              <span className="text-base font-semibold uppercase">
                {user?.user?.phoneNumber}
              </span>
            </div>
            <div className="text-base font-semibold mt-3">
              <button
                onClick={handleOpenProfileEdit}
                className="px-4 py-1.5 bg-gray-700 text-white rounded-md"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="pl-24 pt-12">
          {queryReply ? (
            <>
              <h1>
                <span className="font-medium text-lg">Query</span> :{" "}
                <span className="text-md text-gray-600">
                  {queryReply?.message}
                </span>
              </h1>
              <p>
                <span className="font-medium text-lg">Reply</span>:{" "}
                <span className="text-md text-gray-500">
                  {queryReply?.queryReply?.[queryReply._id]}
                </span>
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {editProfileModel && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                      >
                        Edit Profile
                      </h2>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={handleCloseProfileEdit}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Make Changes to profile here. clich save when you are done
                    </p>
                  </div>
                </div>
                <div className="px-6 space-y-5 mt-3">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="">Name</label>
                    <input
                      className="col-span-3 py-1 border rounded-md focus:outline-none focus:border focus:border-black"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="">Profile Image</label>
                    <input
                      className="col-span-3"
                      onChange={onChangeHandler}
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleUpdateProfile}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {user?.user?.role === ("student" || "admin") && (
        <div className="text-lg font-medium max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-primary ml-12">
            My Enrolled Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-3 sm:px-5 md:px-12 lg:px-0">
            {course?.enrolledCourses?.length === 0 ? (
              <h2>You have not enrolled course yet</h2>
            ) : (
              course?.enrolledCourses?.map((course, index) => {
                return <Course key={index} course={course} />;
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
