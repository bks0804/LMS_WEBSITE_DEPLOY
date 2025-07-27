import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import BuyCourseButton from "./BuyCourseButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const CourseDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const [purchased, setPurchased] = useState(null);
  const params = useParams();
  const { courseId } = params;

  const navigate = useNavigate();

  const getCourseDetailswithStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.get(
        `FRONTEND_SERVER_API/api/payment/course/${courseId}/detail-with-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCourseData(response?.data);
      setPurchased(response?.data.purchased);
    } catch (error) {
      console.error(
        "Error fetching course details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getCourseDetailswithStatus();
  }, []);

  const handleContineuCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5 my-20">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {courseData?.course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">
            {" "}
            {courseData?.course?.subTitle}
          </p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {courseData?.course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path
                  fill="currentColor"
                  d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
                />
              </svg>
            </span>
            <p>Last updated {courseData?.course?.createdAt.split("")[0]}</p>
          </div>
          <p>
            Students enrolled: {courseData?.course?.enrolledStudents.length}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-md lg:text-base text-gray-500"
            dangerouslySetInnerHTML={{
              __html: courseData?.course?.description,
            }}
          />
          <div className="border p-8 space-y-3 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <div className="pb-4 space-y-2">
              <h1 className=" md:text-2xl font-bold">Course Content</h1>
              <h2 className="font-semibold text-gray-500">
                No. Of Lectures : {courseData?.course?.lectures?.length}
              </h2>
            </div>
            <div className="space-y-3">
              {courseData?.course?.lectures?.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="border border-gray-500 rounded-full p-1">
                    {" "}
                    <span>
                      {lecture.isPreviewFree ? (
                        <>
                          <span>
                            <svg
                              xmlns="http:www.w3.org/2000/svg"
                              width={24}
                              height={24}
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                d="M19 10.268c1.333.77 1.333 2.694 0 3.464l-9 5.196c-1.333.77-3-.192-3-1.732V6.804c0-1.54 1.667-2.502 3-1.732z"
                              />
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <svg
                              xmlns="http:www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M6.616 21q-.672 0-1.144-.472T5 19.385v-8.77q0-.67.472-1.143Q5.944 9 6.616 9H8V7q0-1.671 1.165-2.835Q10.329 3 12 3t2.836 1.165T16 7v2h1.385q.67 0 1.143.472.472.472.472 1.144v8.769q0 .67-.472 1.143-.472.472-1.143.472zm0-1h10.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T17.385 10H6.615q-.269 0-.442.173T6 10.616v8.769q0 .269.173.442t.443.173M12 16.5q.633 0 1.066-.434.434-.433.434-1.066t-.434-1.066T12 13.5t-1.066.434Q10.5 14.367 10.5 15t.434 1.066q.433.434 1.066.434M9 9h6V7q0-1.25-.875-2.125T12 4t-2.125.875T9 7zM6 20V10z"
                              />
                            </svg>
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-lg font-semibold">
                    {lecture?.lectureTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 shadow-[0_2px_10px_rgba(0,0,0,0.3)] rounded-sm ">
          <div className="">
            <div className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={courseData?.course?.lectures[0]?.videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="text-lg font-semibold">
                {courseData?.course?.lectures[0]?.lectureTitle}
              </h1>
              <div className="border border-gray-400 my-2"></div>
              <h1 className="text-lg md:text-xl font-semibold">
                ₹ {courseData?.course.coursePrice}
              </h1>
            </div>
            <div className="flex justify-center p-4">
              {purchased ? (
                <button
                  onClick={handleContineuCourse}
                  className="w-full py-2 rounded-md bg-gray-400 font-semibold"
                >
                  Continue Course
                </button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
