import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart } from "recharts";
import UserAttendanceInCourses from "./UserAttendanceInCourses";

const CourseList = () => {
  const [getCourses, setGetCourses] = useState([]);
  const [openLectures, setOpenLectures] = useState(null);
  const [openLectureAttendance, setOpenLectureAttendance] = useState(null);
  const navigate = useNavigate();

  const getAllCoursesHandle = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/course/published-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGetCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCoursesHandle();
  }, []);

  const handleToggleLectureList = (courseId) => {
    setOpenLectures((prevId) => (prevId === courseId ? null : courseId));
    setOpenLectureAttendance(null); // Reset selected lecture on course toggle
  };

  // const handleToggleLectureAttendance = (lectureId) => {
  //   setOpenLectureAttendance((prevId) =>
  //     prevId === lectureId ? null : lectureId
  //   );
  // };

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Course Title</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {getCourses.length > 0 ? (
              getCourses.map((item) => (
                <React.Fragment key={item._id}>
                  {/* Course Row */}
                  <tr
                    className="bg-white border-t cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => handleToggleLectureList(item._id)}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.courseTitle}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${
                          item.isPublished
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                  </tr>

                  {/* Lecture List */}
                  {openLectures === item._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={2} className="px-6 pb-4 pt-2">
                        <ul className="text-gray-700 space-y-2">
                          {item.lectures?.length > 0 ? (
                            item.lectures.map((lecture, index) => (
                              <li key={lecture._id}>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/admin/${item._id}/${lecture._id}/attendancedash`,
                                      {
                                        state: {
                                          courseTitle: item.courseTitle,
                                          lectureTitle: lecture.lectureTitle,
                                        },
                                      }
                                    )
                                  }
                                  className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded font-medium"
                                >
                                  {index + 1}. {lecture.lectureTitle}
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>No lectures available</li>
                          )}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
