import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "./Rating/Rating";
import { useRef } from "react";
const CourseProgress = () => {
  const [getExistedRating, setGetExistedRating] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [meetingId, setMeetingId] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [updateRatingModel, setUpdateRatingModel] = useState(false);
  const [openAttendanceModel, setOpenAttendanceModel] = useState(false);

  const [rating, setRating] = useState(0);
  const params = useParams();
  const { courseId } = params;

  const triggered = useRef(false);

  const getCourseProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.get(`/api/course-progress/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCourseData(response?.data?.data);
    } catch (error) {
      console.error(
        "Error fetching course details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseProgress();
    }
  }, [courseId]);

  const isLectureCompleted = (lectureId) => {
    return courseData?.progress?.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };

  const handleLectureProgress = async (lectureId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      await axios.post(
        `/api/course-progress/${courseId}/lecture/${lectureId}/view`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update UI in real-time without refreshing
      setCourseData((prevData) => ({
        ...prevData,
        progress: [...(prevData?.progress || []), { lectureId, viewed: true }],
      }));

      // setViewedLectures((prev) => new Set(prev).add(lectureId));
    } catch (error) {
      console.error(
        "Error updating lecture progress:",
        error.response?.data || error.message
      );
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const initialLecture =
    currentLecture ||
    (courseData?.courseDetails?.lectures &&
      courseData?.courseDetails?.lectures[0]);

  const handleIsCompletedButton = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        `/api/course-progress/${courseId}/completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update state immediately to reflect changes
      setCourseData((prevData) => ({
        ...prevData,
        completed: true,
      }));
    } catch (error) {
      console.error(
        "Error updating to Completed:",
        error.response?.data || error.message
      );
    }
  };
  const handleIsInCompletedButton = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.post(
        `/api/course-progress/${courseId}/incompleted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update state immediately to reflect changes
      setCourseData((prevData) => ({
        ...prevData,
        completed: false,
      }));
    } catch (error) {
      console.error(
        "Error updating to Incompleted:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseProgress();
    }
  }, [courseId, courseData?.completed]);

  const handleLectureEnd = () => {
    if (!getExistedRating || getExistedRating?.length === 0) {
      setShowRatingModal(true);
    }
  };

  // update existed rating

  const handleUpdateExistedRating = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      if (!rating) {
        console.error("Rating is missing or invalid!");
        return;
      }

      const lectureId =
        currentLecture?._id || courseData?.courseDetails?.lectures?.[0]?._id;

      if (!lectureId) {
        console.error("Lecture ID not found!");
        return;
      }

      const res = await axios.put(
        `/api/course-progress/${courseId}/updateexistrating`,
        { rating, lectureId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRating(res.data.rating);
      setUpdateRatingModel(false);
      await getExistRating();
    } catch (error) {
      console.error(
        "Error updating existing rating:",
        error.response?.data || error.message
      );
    }
  };

  const getExistRating = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.post(
        `/api/course-progress/${courseId}/getexistrating`,
        {
          lectureId:
            currentLecture?._id ||
            courseData?.courseDetails?.lectures?.[0]?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGetExistedRating(res.data.rating);
      setRating(0);
    } catch (error) {
      console.error(
        "Error to get existed rating:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (currentLecture?._id) {
      getExistRating();
    }
  }, [currentLecture?._id]);

  const fetchMeeting = async () => {
    if (!meetingId) {
      console.error("Meeting ID is missing");
      return;
    }

    try {
      const res = await axios.get(`/meeting/${meetingId}`);
      setMeeting(res.data);
    } catch (error) {
      console.error("Failed to fetch meeting", error);
      alert("Error fetching meeting details.");
    }
  };

  useEffect(() => {
    if (meetingId) {
      fetchMeeting();
    }
  }, [meetingId]);

  const handleSubmitRating = async () => {
    try {
      if (!rating) {
        alert("Please select a rating.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.post(
        `/api/course-progress/${courseId}/rate-lecture`,
        {
          lectureId:
            currentLecture?._id ||
            courseData?.courseDetails?.lectures?.[0]?._id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowRatingModal(false);
      // setGetExistedRating(res.data);
      alert("Thank you for your rating!");
      setRating(0);
      await getExistedRating();
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response?.data || error.message
      );
    }
  };

  /////////////////////////
  // const showAttendanceModel = (req, res) => {
  //   setOpenAttendanceModel(true);
  // };

  const handleMarkAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const lectureId =
        currentLecture?._id || courseData?.courseDetails?.lectures?.[0]?._id;

      if (!courseId || !lectureId) {
        alert("Missing course or lecture information");
        return;
      }

      const res = await axios.post(
        `/api/user/attendance/mark`,
        {
          status: "Present",
          courseId,
          lectureId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Attendance marked successfully!");
      setOpenAttendanceModel(false);
    } catch (err) {
      console.error("Error marking attendance:", err);
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto p-4">
      {/* display course name */}
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">
          {courseData?.courseDetails?.courseTitle}
        </h1>
        <button
          onClick={
            courseData?.completed
              ? handleIsInCompletedButton
              : handleIsCompletedButton
          }
          className="bg-black text-white px-5 py-2 rounded-md"
        >
          {courseData?.completed ? "Mark as Incompleted" : "Completed"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* video section */}
        <div className="flex-1 md:w-1/3 h-fit rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(
                  currentLecture?._id || initialLecture?._id
                )
              }
              onEnded={handleLectureEnd}
              // onTimeUpdate={handleTimeUpdate}
            />
          </div>

          <div className="mt-2 flex items-center justify-between pl-3">
            <h3 className="text-lg font-medium">
              {`Lecture ${
                courseData?.courseDetails?.lectures?.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture?._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture?.lectureTitle
              }`}
            </h3>

            {getExistedRating?.map((item, index) => {
              return (
                // <span>rating : {item.rating}</span>
                <>
                  <span className="flex items-center">
                    <h1 className="pr-2 font-semibold">Rating : </h1>

                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill={index < item?.rating ? "#f90" : "#b7b0b0"}
                          d="M12.954 1.7a1 1 0 0 0-1.908-.001l-2.184 6.92-6.861-.005a1 1 0 0 0-.566 1.826l5.498 3.762-2.067 6.545A1 1 0 0 0 6.4 21.86l5.6-4.006 5.594 4.007a1 1 0 0 0 1.536-1.114l-2.067-6.545 5.502-3.762a1 1 0 0 0-.566-1.826l-6.866.005z"
                        />
                      </svg>
                    ))}

                    <button
                      onClick={() => setUpdateRatingModel(true)}
                      className="pl-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path
                          fill="none"
                          stroke="#323030"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                      </svg>
                    </button>
                  </span>
                </>
              );
            })}
          </div>
        </div>

        {showRatingModal && (
          <Rating
            rating={rating}
            setRating={setRating}
            handleSubmitRating={handleSubmitRating}
            setShowRatingModal={setShowRatingModal}
            showRatingModal={showRatingModal}
          />
        )}

        {updateRatingModel && (
          <Rating
            rating={rating}
            setRating={setRating}
            handleUpdateExistedRating={handleUpdateExistedRating}
            setUpdateRatingModel={setUpdateRatingModel}
            updateRatingModel={updateRatingModel}
          />
        )}

        {updateRatingModel && (
          <Rating
            rating={rating}
            setRating={setRating}
            handleUpdateExistedRating={handleUpdateExistedRating}
            setUpdateRatingModel={setUpdateRatingModel}
            updateRatingModel={updateRatingModel}
          />
        )}

        {openAttendanceModel && (
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
                  <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 p-0.5 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={48}
                          height={48}
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            color="red"
                          >
                            <path d="M18.99 19H19m-.01 0c-.622.617-1.75.464-2.542.464-.972 0-1.44.19-2.133.883C13.725 20.937 12.934 22 12 22s-1.725-1.063-2.315-1.653c-.694-.693-1.162-.883-2.133-.883-.791 0-1.92.154-2.543-.464-.627-.622-.473-1.756-.473-2.552 0-1.007-.22-1.47-.937-2.186C2.533 13.196 2 12.662 2 12s.533-1.196 1.6-2.262c.64-.64.936-1.274.936-2.186 0-.791-.154-1.92.464-2.543.622-.627 1.756-.473 2.552-.473.912 0 1.546-.297 2.186-.937C10.804 2.533 11.338 2 12 2s1.196.533 2.262 1.6c.64.64 1.274.936 2.186.936.791 0 1.92-.154 2.543.464.627.622.473 1.756.473 2.552 0 1.007.22 1.47.937 2.186C21.467 10.804 22 11.338 22 12s-.533 1.196-1.6 2.262c-.716.717-.936 1.18-.936 2.186 0 .796.154 1.93-.473 2.552" />
                            <path d="M9 12.893s1.2.652 1.8 1.607c0 0 1.8-3.75 4.2-5" />
                          </g>
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl font-medium text-gray-900"
                          id="modal-title"
                        >
                          Please add today's attendance
                        </h3>
                        <div className="mt-2">
                          <p className="py-2 text-sm text-gray-500">
                            Are you sure you want to mark your attendance for
                            today? This action cannot be changed later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 pb-5 sm:flex sm:justify-end sm:px-8">
                    <button
                      onClick={handleMarkAttendance}
                      className="text-green-600 border border-green-500 hover:border-green-500 hover:text-green-500  font-semibold py-1.5 px-2.5 rounded"
                    >
                      Mark Attendance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200  md:pl-4 pt-4 md:pt-0 ">
          <h2 className="font-bold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto ">
            {courseData?.courseDetails?.lectures?.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => {
                  setMeetingId(lecture.meetingId);
                  handleSelectLecture(lecture);
                }}
                // onClick={() => {
                //   handleSelectLecture(lecture);
                // }}
                className={`mb-3 hover:cursor-pointer rounded-md transition transform shadow-md border ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-300"
                    : "dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center ">
                    {isLectureCompleted(lecture._id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="text-green-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        >
                          <path d="m7 12.5 3 3 7-7" />
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className={
                          lecture.lectureType === "Live"
                            ? "text-red-600"
                            : "text-black"
                        }
                      >
                        <path
                          fill="currentColor"
                          d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
                        />
                        <path
                          fill="currentColor"
                          d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5"
                        />
                      </svg>
                    )}
                    <div className="ml-3 text-lg font-medium flex items-center justify-between">
                      <h3>{lecture.lectureTitle}</h3>
                      {lecture._id === currentLecture?._id &&
                        meeting?.joinUrl && (
                          <a
                            href={meeting.joinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-1 block pl-12"
                          >
                            Watch Lecture
                          </a>
                        )}
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <button className="text-green-600 bg-green-200 px-3 rounded-md ">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

{
  /* <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200  md:pl-4 pt-4 md:pt-0 ">
          <h2 className="font-bold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto ">
            {courseData?.courseDetails?.lectures?.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => {
                  setMeetingId(lecture.meetingId);
                  handleSelectLecture(lecture);
                  setMeeting(meeting.joinUrl);
                }}
                // onClick={() => {
                //   handleSelectLecture(lecture);
                // }}
                className={`mb-3 hover:cursor-pointer rounded-md transition transform shadow-md border ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-300"
                    : "dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center ">
                    {isLectureCompleted(lecture._id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="text-green-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        >
                          <path d="m7 12.5 3 3 7-7" />
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className={
                          lecture.lectureType === "Live"
                            ? "text-red-600"
                            : "text-black"
                        }
                      >
                        <path
                          fill="currentColor"
                          d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
                        />
                        <path
                          fill="currentColor"
                          d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5"
                        />
                      </svg>
                    )}
                    <div className="ml-3 text-lg font-medium flex items-center justify-between">
                      <h3>{lecture.lectureTitle}</h3>
                      {meeting?.joinUrl && (
                        <div className="max-w-4xl mx-auto ml-12">
                          <a
                            href={meeting.joinUrl}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            watch lecture
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <button className="text-green-600 bg-green-200 px-3 rounded-md ">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */
}
