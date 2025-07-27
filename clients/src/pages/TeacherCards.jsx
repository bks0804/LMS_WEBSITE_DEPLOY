import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "./Student/Rating/Star";
import TeacherStar from "./Student/Rating/TeacherStar";

const TeacherCards = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserDetailsModel, setOpenUserDetailsModel] = useState(false);
  const [rating, setRating] = useState(0);

  const getAllAdmins = async () => {
    try {
      const res = await axios.get("FRONTEND_SERVER_API/api/user/getalladmin");
      // console.log(res.data);
      // setMyCourse(res.data.course);
      setAdmins(res.data.admins);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  // user model
  const handleOpenUserDetailModel = (user) => {
    setSelectedUser(user);
    setOpenUserDetailsModel(true);
  };
  const handleCloseUserDetailModel = () => {
    setSelectedUser(null);
    setOpenUserDetailsModel(false);
  };
  const adminId = selectedUser?._id;
  // console.log(adminId);

  const addTeacherRatingHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }
      const res = await axios.put(
        "FRONTEND_SERVER_API/api/user/addteacherrating",
        { rating, adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res.data);
      // setMyCourse(res.data.course);
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-5 lg:px-6">
        <h3 className="py-24 mt-5 text-3xl text-center md:text-4xl font-bold font-serif text-primary">
          Meet Our Expert Instructor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-0 pb-24 items-center">
          {admins?.map((admin, index) => (
            <div
              onClick={() => handleOpenUserDetailModel(admin)}
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-md shadow-[0_6px_10px_rgba(0,0,0,0.3)]"
            >
              {/* Image */}
              <img
                className="w-full rounded-md aspect-square transition-transform duration-300 group-hover:scale-105"
                src={
                  admin.photoUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Instructor"
              />

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start pl-12 pt-40 justify-center text-white px-4">
                <div className="absolute bottom-3">
                  <h1 className="text-2xl font-bold hover:text-secondary">
                    {admin.firstName} {admin.lastName}
                  </h1>
                  <p className="text-sm font-semibold pb-1 ">
                    {admin.specialization}
                  </p>
                  <span className="mt-7 flex items-center gap-x-3 relative before:absolute before:-top-4 before:left-0 before:w-full before:h-[0.5px] before:bg-gray-300 before:content-['']">
                    <Link className="border p-1.5 hover:text-black hover:bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth={0}
                          d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894V28z"
                        />
                      </svg>
                    </Link>
                    <Link className="border p-1.5 hover:text-black hover:bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                          color="currentColor"
                        />
                      </svg>
                    </Link>
                    <Link
                      className="border p-1.5 hover:text-black hover:bg-white"
                      href=""
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <g fill="none">
                          <path
                            stroke="currentColor"
                            strokeWidth={2}
                            d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z"
                          />
                          <circle
                            cx={16.5}
                            cy={7.5}
                            r={1.5}
                            fill="currentColor"
                          />
                          <circle
                            cx={12}
                            cy={12}
                            r={3}
                            stroke="currentColor"
                            strokeWidth={2}
                          />
                        </g>
                      </svg>
                    </Link>
                    <Link className="border p-1.5 hover:text-black hover:bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path
                          fill="currentColor"
                          d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
                        />
                      </svg>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {openUserDetailsModel && selectedUser && (
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
                  <div className="px-6 my-3">
                    <span className="flex items-center justify-between">
                      <h1 className="font-semibold text-xl text-center uppercase">
                        Profile
                      </h1>

                      <button
                        onClick={handleCloseUserDetailModel}
                        className="absolute top-4 right-4 hover:text-red-500 transition"
                        aria-label="Close"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={32}
                          height={32}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.41 1.42L10.59 12l-4.88 4.88a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.41L13.41 12l4.88-4.88a1 1 0 0 0 .01-1.41z" />
                        </svg>
                      </button>
                    </span>
                    <div className="flex flex-col py-5 px-12 text-start">
                      <img
                        className="h-24 w-24 md:w-32 md:h-32 rounded-full border object-cover mx-auto"
                        src={selectedUser.photoUrl || "/logo/user.png"}
                        alt=""
                      />
                      <h1 className="font-semibold text-2xl text-center">
                        {selectedUser.name ||
                          `${selectedUser?.firstName} ${selectedUser?.lastName}`}
                      </h1>
                      <p className="text-center text-sm font-semibold text-gray-500">
                        {selectedUser.specialization}
                      </p>

                      <span className="mt-3 flex items-center justify-center gap-x-3">
                        <Link className="border border-primary p-1.5 hover:text-white hover:bg-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth={0}
                              d="M8.268 28H2.463V9.306h5.805zM5.362 6.756C3.506 6.756 2 5.218 2 3.362a3.362 3.362 0 0 1 6.724 0c0 1.856-1.506 3.394-3.362 3.394M29.994 28h-5.792v-9.1c0-2.169-.044-4.95-3.018-4.95-3.018 0-3.481 2.356-3.481 4.794V28h-5.799V9.306h5.567v2.55h.081c.775-1.469 2.668-3.019 5.492-3.019 5.875 0 6.955 3.869 6.955 8.894V28z"
                            />
                          </svg>
                        </Link>
                        <Link className="border border-primary p-1.5 hover:text-white hover:bg-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                              color="currentColor"
                            />
                          </svg>
                        </Link>
                        <Link
                          className="border border-primary p-1.5 hover:text-white hover:bg-primary"
                          href=""
                        >
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                          >
                            <g fill="none">
                              <path
                                stroke="currentColor"
                                strokeWidth={2}
                                d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z"
                              />
                              <circle
                                cx={16.5}
                                cy={7.5}
                                r={1.5}
                                fill="currentColor"
                              />
                              <circle
                                cx={12}
                                cy={12}
                                r={3}
                                stroke="currentColor"
                                strokeWidth={2}
                              />
                            </g>
                          </svg>
                        </Link>
                        <Link className="border border-primary p-1.5 hover:text-white hover:bg-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                          >
                            <path
                              fill="currentColor"
                              d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"
                            />
                          </svg>
                        </Link>
                      </span>
                      <div className="mt-6 text-start">
                        {/* <div className="text-base text-primary font-semibold">
                                MyCourses :{" "}
                                <span className="text-base text-gray-700 font-normal">
                                  {myCourse?.courseTitle}
                                </span>
                              </div> */}
                        <div className="text-base text-primary font-semibold">
                          Email :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser.email}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Mobile :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser.phoneNumber}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          DateOfBirth :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.dateOfBirth}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          DateOfJoining :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.dateOfJoining}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Degree :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.class_DegreeName}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          College :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.school_CollegeName}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Experience :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.experience} Year
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          His good Words :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.goodWords ||
                              "Keep learning, keep growing"}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 mx-auto text-center sm:mt-0 sm:px-12 sm:text-left">
                      <h3
                        className="text-lg font-semibold text-gray-900"
                        id="modal-title"
                      >
                        Please Rate Us
                      </h3>
                      <div className="py-3 flex gap-2">
                        {Array.from({ length: 5 }, (_, index) => (
                          <TeacherStar
                            key={index}
                            index={index}
                            rating={rating}
                            setRating={setRating}
                          />
                        ))}
                      </div>
                      {/* <p className="text-xl text-gray-500 font-bold">
                        {rating} Out of 5
                      </p> */}
                      {/* <p className="text-md font-semibold">
                        Please provide rating before moving to next page
                      </p> */}
                      <div className="bg-gray-50 px-4 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={addTeacherRatingHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherCards;
