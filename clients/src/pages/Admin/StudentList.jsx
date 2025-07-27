import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editDetailsModal, setEditDetailsModal] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUserDetailsModel, setOpenUserDetailsModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const getAllStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/getallstudent"
      );

      setStudents(res.data.students);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleOpenDetailEdit = (userId) => {
    setEditDetailsModal(true);
    setStudentId(userId);
  };
  const handleCloseDetailEdit = () => {
    setEditDetailsModal(false);
  };

  const [formdata, setFormdata] = useState({
    role: "",
    specialization: "",
    dateOfJoining: "",
    salary: "",
    experience: "",
    goodWords: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormdata({ ...formdata, [name]: value });
  };

  const handleUpdateAdminProfile = async (e, userId) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8000/api/user/${studentId}/updateStudentToAdmin`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // setUser(response.data);
      setEditDetailsModal(false);
    } catch (error) {
      // console.log(error);
    }
  };

  // user delete

  const handleOpenDeleteModal = (userId) => {
    setOpenDeleteModal(true);
    setStudentId(userId);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleUserDelete = async () => {
    try {
      if (!studentId) {
        console.error("Student ID is missing!");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8000/api/user/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudents((prevList) =>
        prevList.filter((x) => x._id !== response.data.deleteUser._id)
      );
      setOpenDeleteModal(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleOpenUserDetailModel = (user) => {
    setSelectedUser(user);
    setOpenUserDetailsModel(true);
  };
  const handleCloseUserDetailModel = (user) => {
    setSelectedUser(null);
    setOpenUserDetailsModel(false);
  };

  return (
    <div className="mt-32 md:mt-24 ml-0 sm:ml-52 lg:ml-64 z-50">
      <div className="relative overflow-x-auto shadow-[0_4px_10px_rgba(0,0,0,0.3)] sm:rounded-lg lg:p-12 lg:m-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student name
              </th>
              <th scope="col" className="px-6 py-3">
                UniqueId
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                No of Course
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="flex cursor-pointer items-center gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    onClick={() => handleOpenUserDetailModel(student)}
                  >
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt=""
                        className="w-10  h-10 rounded-full border"
                      />
                    ) : (
                      <div className="w-10  h-10 rounded-full border flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={36}
                          height={36}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                          />
                        </svg>
                      </div>
                    )}

                    {student.name ||
                      (student.firstName && student.lastName
                        ? `${student.firstName} ${student.lastName}`
                        : "")}
                  </th>
                  <td className="px-6 py-4">
                    {student?.userUniqueId || "No Available"}
                  </td>
                  <td className="px-6 py-4">{student.role}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">
                    {student.enrolledCourses.length}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <Link to="" className="text-red-500 dark:text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={26}
                        height={26}
                        onClick={() => handleOpenDeleteModal(student._id)}
                      >
                        <path
                          fill="currentColor"
                          d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"
                        />
                      </svg>
                    </Link>

                    <Link to="" className="text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 48 48"
                        onClick={() => handleOpenDetailEdit(student._id)}
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth={4}
                        >
                          <path
                            strokeLinecap="round"
                            d="M42 26v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14"
                          />
                          <path d="M14 26.72V34h7.317L42 13.308 34.695 6z" />
                        </g>
                      </svg>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {editDetailsModal && (
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

            <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-8 sm:pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2
                          className="text-base font-semibold text-gray-900"
                          id="modal-title"
                        >
                          Edit Profile
                        </h2>
                      </div>
                      <div className="" onClick={handleCloseDetailEdit}>
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
                        Make Changes to profile here. clich save when you are
                        done
                      </p>
                    </div>
                  </div>
                  <div className="px-8 gap-y-5 gap-x-12 mt-3 grid grid-cols-6">
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="role"
                        className="block text-md font-medium text-primary"
                      >
                        Role
                      </label>
                      <div className="mt-2 col-span-3">
                        <select
                          id="role"
                          name="role"
                          value={formdata.role}
                          onChange={handleInputChange}
                          className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        >
                          <option value="">Select Role</option>
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="specialization"
                        className="block text-md font-medium text-primary"
                      >
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        name="specialization"
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        value={formdata.specialization}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="salary"
                        className="block text-md font-medium text-primary"
                      >
                        Salary
                      </label>
                      <input
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        value={formdata.salary}
                        onChange={handleInputChange}
                        type="text"
                        name="salary"
                        id="salary"
                      />
                    </div>{" "}
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="dateOfJoining"
                        className="block text-md font-medium text-primary"
                      >
                        Date Of Joining
                      </label>
                      <input
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        value={formdata.dateOfJoining}
                        onChange={handleInputChange}
                        type="date"
                        name="dateOfJoining"
                        id="dateOfJoining"
                      />
                    </div>
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="experience"
                        className="block text-md font-medium text-primary"
                      >
                        Experience
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        value={formdata.experience}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>{" "}
                    <div className="col-span-3 items-center gap-4">
                      <label
                        htmlFor="experience"
                        className="block text-md font-medium text-primary"
                      >
                        His Good Words
                      </label>
                      <textarea
                        id="goodWords"
                        name="goodWords"
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                        value={formdata.goodWords}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="message for Student"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={handleUpdateAdminProfile}
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

        {openDeleteModal && (
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
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg
                          className="size-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl font-semibold text-gray-900"
                          id="modal-title"
                        >
                          Delete User account
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your account? All of
                            your data will be permanently removed. This action
                            cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleUserDelete}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseDeleteModal}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {openUserDetailsModel && selectedUser && (
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
                  <div className="">
                    <div className="flex items-center justify-between bg-gradient-to-l from-slate-400 to-slate-700">
                      <button
                        onClick={handleCloseUserDetailModel}
                        className="absolute top-1 right-1 hover:text-red-500 transition"
                        aria-label="Close"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={32}
                          height={32}
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.41 1.42L10.59 12l-4.88 4.88a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.41L13.41 12l4.88-4.88a1 1 0 0 0 .01-1.41z" />
                        </svg>
                      </button>

                      <div className="flex items-center justify-between space-x-10 ml-5 py-3">
                        {selectedUser?.photoUrl ? (
                          <img
                            className="h-24 w-24 md:w-28 md:h-28 rounded-full border border-gray-800 object-cover mx-auto"
                            src={selectedUser.photoUrl || firstLettor}
                            alt=""
                          />
                        ) : (
                          <div className="h-24 w-24 md:w-28 md:h-28 rounded-full p-1 border border-gray-800 flex items-center justify-center mx-auto bg-gray-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={96}
                              height={96}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                              />
                            </svg>
                          </div>
                        )}

                        <span className="text-start ">
                          <h1 className="font-bold text-2xl text-white">
                            {selectedUser.name ||
                              `${selectedUser?.firstName} ${selectedUser?.lastName}`}
                          </h1>
                          <p className="font-semibold uppercase">
                            {selectedUser?.role}
                          </p>
                          <p>
                            {selectedUser?.permanentAddress ||
                              "ganeshpuram tikamgargh madhyapradesh"}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col py-5 px-12 text-start">
                      <div className="mt-6 text-start">
                        <div className="text-base text-primary font-semibold">
                          UserId :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.userUniqueId}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Email :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.email}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Mobile :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.phoneNumber}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Gender :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.gender}
                          </span>
                        </div>

                        <div className="text-base text-primary font-semibold">
                          DateOfBirth :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.dateOfBirth}
                          </span>
                        </div>

                        <div className="text-base text-primary font-semibold">
                          Degree/Class :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.class_DegreeName}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          College/School :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.school_CollegeName}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          Board/University :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.board_UniversityName}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          EnrollCourses :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.enrolledCourses.length}
                          </span>
                        </div>
                        <div className="text-base text-primary font-semibold">
                          CreatedDate :{" "}
                          <span className="text-base text-gray-700 font-normal">
                            {selectedUser?.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

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
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className="col-span-1 sm:col-span-5">
                      {selectedUser?.photoUrl ? (
                        <img
                          className="w-full h-52 mx-auto"
                          src={selectedUser.photoUrl || firstLettor}
                          alt=""
                        />
                      ) : (
                        <div className="w-full flex items-center justify-center mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={192}
                            height={192}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="bg-[#444] border-b border-gray-600 py-2 pl-8">
                        <h1 className="font-semibold text-2xl text-[#ccc]">
                          {selectedUser.name ||
                            `${selectedUser?.firstName} ${selectedUser?.lastName}`}
                        </h1>
                        <p className="font-medium text-lg uppercase">
                          {selectedUser.role}
                        </p>
                      </div>
                      <div className="bg-[#444] border-b border-gray-600 py-2 pl-8 space-y-2">
                        <span className="flex items-center space-x-3 text-[#ccc]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path d="m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                              <path
                                fill="currentColor"
                                d="M16.552 22.133c-1.44-.053-5.521-.617-9.795-4.89-4.273-4.274-4.836-8.354-4.89-9.795-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.6 1.166 2.704 2.93 3.652 4.317a1.504 1.504 0 0 1-.256 1.986l-1.951 1.449a.48.48 0 0 0-.142.616c.442.803 1.228 1.999 2.128 2.899s2.153 1.738 3.012 2.23a.483.483 0 0 0 .644-.162l1.27-1.933a1.503 1.503 0 0 1 2.056-.332c1.407.974 3.049 2.059 4.251 3.598a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"
                              />
                            </g>
                          </svg>
                          <p className="text-md">
                            +91-{selectedUser?.phoneNumber}
                          </p>
                        </span>
                        <span className="flex items-center space-x-3 text-[#ccc]">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2 8-5H4zM4 8V6v12z"
                            />
                          </svg>
                          <p>{selectedUser?.email}</p>
                        </span>
                      </div>
                      <div className="bg-[#444]">
                        <span className="py-5 flex items-center pl-8 gap-x-3">
                          <Link className="border border-black p-1.5 hover:text-[#ccc] hover:border-[#ccc]">
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
                          <Link className="border border-black p-1.5 hover:text-[#ccc] hover:border-[#ccc]">
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
                            className="border border-black p-1.5 hover:text-[#ccc] hover:border-[#ccc]"
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
                          <Link className="border border-black p-1.5 hover:text-[#ccc] hover:border-[#ccc]">
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
                    <div className="col-span-1 sm:col-span-7 bg-[#f1f0f0]">
                      <div>
                        <ul className="pl-5 py-3">
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              Location
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.permanentAddress ||
                                "Jagdish Nagar Nagpur"}
                            </span>
                          </li>

                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              UserUniqueId
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.userUniqueId || "No Available"}
                            </span>
                          </li>

                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              Gender
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.gender}
                            </span>
                          </li>
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              DOB
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.dateOfBirth}
                            </span>
                          </li>

                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              Degree/Class
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.class_DegreeName}
                            </span>
                          </li>
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              College/School
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.school_CollegeName}
                            </span>
                          </li>
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              Board/University
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.board_UniversityName}
                            </span>
                          </li>
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              EnrollCourses
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.enrolledCourses.length}
                            </span>
                          </li>
                          <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              CreatedDate
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.createdAt}
                            </span>
                          </li>
                          {/* <li className="space-x-5 ">
                            <span className="text-[#717171] font-semibold text-lg">
                              His Good Words
                            </span>
                            <span className="text-[#c1c1c1] font-medium">
                              {selectedUser?.goodWords ||
                                "Keep learning Keep growing"}
                            </span>
                          </li> */}
                        </ul>
                        {/* <div>
                          <h2>Biography</h2>
                          <p>
                            An experienced and passionate educator dedicated to
                            student growth and success. Skilled in creating
                            engaging, supportive, and innovative learning
                            environments. Holds a strong academic background
                            with a commitment to lifelong learning. Believes in
                            the motto: "Keep learning, keep growing."
                          </p>
                        </div> */}
                      </div>
                      <button
                        onClick={handleCloseUserDetailModel}
                        className="absolute top-1 right-1 hover:text-red-500 transition"
                        aria-label="Close"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={32}
                          height={32}
                          fill=""
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.41 1.42L10.59 12l-4.88 4.88a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.41L13.41 12l4.88-4.88a1 1 0 0 0 .01-1.41z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;

// {
//   openUserDetailsModel && selectedUser && (
//     <div
//       className="relative z-10"
//       aria-labelledby="modal-title"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         className="fixed inset-0 bg-gray-500/75 transition-opacity"
//         aria-hidden="true"
//       ></div>

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//           <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//             <div className="">
//               <div className="flex items-center justify-between bg-gradient-to-l from-slate-400 to-slate-700">
//                 <button
//                   onClick={handleCloseUserDetailModel}
//                   className="absolute top-1 right-1 hover:text-red-500 transition"
//                   aria-label="Close"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={32}
//                     height={32}
//                     fill=""
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.41 1.42L10.59 12l-4.88 4.88a1 1 0 1 0 1.41 1.41L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.41L13.41 12l4.88-4.88a1 1 0 0 0 .01-1.41z" />
//                   </svg>
//                 </button>

//                 <div className="flex items-center justify-between space-x-10 ml-5 py-3">
//                   {selectedUser?.photoUrl ? (
//                     <img
//                       className="h-24 w-24 md:w-28 md:h-28 rounded-full border border-gray-800 object-cover mx-auto"
//                       src={selectedUser.photoUrl || firstLettor}
//                       alt=""
//                     />
//                   ) : (
//                     <div className="h-24 w-24 md:w-28 md:h-28 rounded-full p-1 border border-gray-800 flex items-center justify-center mx-auto bg-gray-200">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={96}
//                         height={96}
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           fill="currentColor"
//                           d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
//                         />
//                       </svg>
//                     </div>
//                   )}

//                   <span className="text-start ">
//                     <h1 className="font-bold text-2xl text-white">
//                       {selectedUser.name ||
//                         `${selectedUser?.firstName} ${selectedUser?.lastName}`}
//                     </h1>
//                     <p className="font-semibold uppercase">
//                       {selectedUser?.role}
//                     </p>
//                     <p>
//                       {selectedUser?.permanentAddress ||
//                         "ganeshpuram tikamgargh madhyapradesh"}
//                     </p>
//                   </span>
//                 </div>
//               </div>
//               <div className="flex flex-col py-5 px-12 text-start">
//                 <div className="mt-6 text-start">
//                   <div className="text-base text-primary font-semibold">
//                     UserId :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.userUniqueId}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     Email :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.email}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     Mobile :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.phoneNumber}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     Gender :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.gender}
//                     </span>
//                   </div>

//                   <div className="text-base text-primary font-semibold">
//                     DateOfBirth :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.dateOfBirth}
//                     </span>
//                   </div>

//                   <div className="text-base text-primary font-semibold">
//                     Degree/Class :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.class_DegreeName}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     College/School :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.school_CollegeName}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     Board/University :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.board_UniversityName}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     EnrollCourses :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.enrolledCourses.length}
//                     </span>
//                   </div>
//                   <div className="text-base text-primary font-semibold">
//                     CreatedDate :{" "}
//                     <span className="text-base text-gray-700 font-normal">
//                       {selectedUser?.createdAt}
//                     </span>
//                   </div>
//                   {/* <div className="text-base text-primary font-semibold">
//                           His good Words :{" "}
//                           <span className="text-base text-gray-700 font-normal">
//                             {selectedUser?.goodWords}
//                           </span>
//                         </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
