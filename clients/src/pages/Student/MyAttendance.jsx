import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const MyAttendance = () => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validAttendances, setValidAttendances] = useState([]);

  const handleMarkAttendance = async (lectureTitle) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "FRONTEND_SERVER_API/api/user/attendance/mark",
        { status: "Present" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Attendance marked successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  const handleGetAttendanceDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "FRONTEND_SERVER_API/api/attendance/getexstedattendancedetail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAttendanceDetails(res.data);
    } catch (err) {
      console.error(
        "Error fetching attendance details:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAttendanceDetails();
  }, []);

  // Update valid attendances based on time
  const updateValidAttendances = () => {
    const now = dayjs();
    const today = now.format("YYYY-MM-DD");
    const currentTime = now.format("HH:mm");

    const filtered = attendanceDetails.filter((item) => {
      return (
        item.date === today &&
        currentTime >= item.startTime &&
        currentTime < item.closeTime
      );
    });

    setValidAttendances(filtered);
  };

  useEffect(() => {
    handleGetAttendanceDetails();
  }, []);

  useEffect(() => {
    updateValidAttendances(); // run initially

    const interval = setInterval(() => {
      updateValidAttendances(); // update every 1 minute
    }, 1000);

    return () => clearInterval(interval);
  }, [attendanceDetails]);

  const markStudentIncloseAttendanceHandle = async (attendanceId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "FRONTEND_SERVER_API/api/attendance/markstudentattendance",
        {
          attendanceId,
          status: "Present",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error(
        "Error fetching attendance details:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="flex items-center justify-around mt-24 py-24">
      <div>
        <h1 className="py-3 text-lg font-medium">
          Please add today's attendance
        </h1>

        <button
          onClick={handleMarkAttendance}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Mark Attendance
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : validAttendances.length > 0 ? (
          validAttendances?.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-8 mb-4 bg-white space-y-2 shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
            >
              <h2 className="text-lg font-bold">Course: {item.courseTitle}</h2>
              <h3 className="text-md font-medium">
                Lecture:{" "}
                <span className="text-gray-500">{item.lectureTitle}</span>
              </h3>
              <h4 className="text-md font-medium">
                Created By:{" "}
                <span className="text-gray-500">
                  {item?.creatorId?.name || item?.creatorId?.firstName}{" "}
                  {item?.creatorId?.lastName}
                </span>
              </h4>
              <p className="text-md text-gray-500 font-medium">
                Open from {item.startTime} to {item.closeTime}
              </p>

              <button
                onClick={() => markStudentIncloseAttendanceHandle(item._id)}
                className="border border-green-500 text-green-500 font-semibold py-1 px-2.5 rounded"
              >
                Mark Attendance
              </button>
            </div>
          ))
        ) : (
          <p className="text-red-500 font-semibold">
            No active inclose attendance right now.
          </p>
        )}
      </div>
      {/* <div className="p-5 shadow-lg rounded-md border">
        <h1 className="text-lg font-semibold mb-2">Inclose Attendance</h1>
        {attendanceDetails?.map((attendance, index) => {
          return (
            <div key={index} className="space-y-2 ">
              <h2 className="font-medium">
                Course Name:{" "}
                <span className="font-normal text-gray-500">
                  {attendance?.courseTitle || "N/A"}
                </span>
              </h2>
              <h3 className="font-medium">
                Lecture Name:{" "}
                <span className="font-normal text-gray-500">
                  {attendance?.lectureTitle || "N/A"}
                </span>
              </h3>

              <div>
                Starting Time : {attendance?.startTime || "N/A"} -- Closing Time
                : {attendance?.closeTime || "N/A"}
              </div>
              <button
                onClick={handleMarkAttendance}
                className="text-green-500 border border-green-500 font-semibold py-1.5 px-3 rounded-md"
              >
                Mark Attendance
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default MyAttendance;
