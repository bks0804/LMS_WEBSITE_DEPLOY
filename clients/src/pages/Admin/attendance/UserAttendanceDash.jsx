import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UserAttendanceDash = () => {
  const [markedAttendance, setMarkedAttendance] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle = "", lectureTitle = "" } = location.state || {};
  const [formData, setFormData] = useState({
    courseTitle: courseTitle,
    lectureTitle: lectureTitle,
    date: "",
    startTime: "",
    closeTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { courseTitle, lectureTitle, date, startTime, closeTime } =
        formData;

      if (!courseTitle || !lectureTitle || !date || !startTime || !closeTime) {
        alert("Please fill in all fields.");
        return;
      }

      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${closeTime}`);
      if (start >= end) {
        alert("Start time must be earlier than close time.");
        return;
      }

      const attendanceData = {
        courseTitle,
        lectureTitle,
        date,
        startTime,
        closeTime,
      };
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `/api/attendance/create`,
        attendanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance created successfully!");
    } catch (error) {
      console.error("Error creating attendance:", error);
      alert("Failed to create attendance. Please try again.");
    }
  };

  const { courseId, lectureId } = useParams();
  const getMarkedAttendanceUserHandle = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${
          import.meta.env.VITE_VITE_FRONTEND_SERVER_API
        }/api/attendance/markedattendanceuser`,
        { courseTitle, lectureTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMarkedAttendance(res.data.markedAttendance);
    } catch (err) {
      console.error(
        "Error fetching marked attendance user details:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    getMarkedAttendanceUserHandle();
  }, []);

  return (
    <div className="z-30 px-24 mx-auto sm:mr-5 sm:mb-5 p-6 bg-white sm:shadow-[0_3px_10px_rgba(0,0,0,0.3)] rounded-xl ml-0 sm:ml-44 lg:ml-64 mt-32 sm:mt-24">
      <h2 className="text-3xl font-bold mb-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 32 32"
          onClick={() => navigate("/admin/attendance")}
          className="cursor-pointer"
        >
          <path
            fill="currentColor"
            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16 9.913 5 16 5m-.72 4.594L9.595 15.28l-.72.72.72.72 5.687 5.686L16.72 21l-4-4H23v-2H12.72l4-4z"
          />
        </svg>
        Create Inclose Attendance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="courseTitle" className="block mb-1 font-medium">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            id="courseTitle"
            placeholder="Course Title"
            value={formData.courseTitle}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="lectureTitle" className="block mb-1 font-medium">
            Lecture Title
          </label>
          <input
            type="text"
            name="lectureTitle"
            id="lectureTitle"
            placeholder="Lecture Title"
            value={formData.lectureTitle}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="startTime" className="block mb-1 font-medium">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="closeTime" className="block mb-1 font-medium">
            Close Time
          </label>
          <input
            type="time"
            name="closeTime"
            id="closeTime"
            value={formData.closeTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create Attendance
        </button>
      </form>

      {markedAttendance && (
        <div className="relative overflow-x-auto mt-24">
          <h1 className="mb-3 pl-5 text-xl font-bold">
            Inclose Attendance Dash
          </h1>
          <div className="rounded-md p-4 mb-4 shadow-[0_3px_10px_rgba(0,0,0,0.3)] bg-white space-y-2 mx-2 sm:mx-5">
            <h2 className="text-lg font-semibold">
              Course: {markedAttendance?.courseTitle}
            </h2>
            <h3 className="text-md font-medium ">
              Lecture:{" "}
              <span className="text-gray-500">
                {markedAttendance?.lectureTitle}
              </span>
            </h3>
            <h4 className="text-md font-medium">
              created by :{" "}
              <span className="text-gray-500">
                {markedAttendance?.creatorId.name ||
                  markedAttendance?.creatorId.firstName}{" "}
                {markedAttendance?.creatorId.lastName}
              </span>
            </h4>
            <p className="text-md text-gray-500 font-medium">
              Open from {markedAttendance?.startTime} to{" "}
              {markedAttendance?.closeTime}
            </p>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  UserName
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {markedAttendance?.studentAttendance?.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user?.studentId?.name || user.studentId?.firstName}{" "}
                      {user.studentId?.lastName}
                    </td>
                    <td className="px-6 py-4">{user?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserAttendanceDash;
