import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [getallLectures, setGetAllLectures] = useState([]);
  const navigate = useNavigate();
  const isLoading = false;
  const params = useParams();
  const courseId = params.courseId;

  const createLectureHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios
        .post(
          `/api/course/${courseId}/createlecture`,

          { lectureTitle },

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setGetAllLectures({
            lectures: [...getallLectures.lectures, res.data.lecture],
          });
        });
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllLecturesHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `/api/course/${courseId}/getcourselecture`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGetAllLectures(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (courseId) {
      getAllLecturesHandler();
    }
  }, [courseId]);

  return (
    <div className="mt-40 justify-center ml-64 w-max-7xl px-24">
      <div>
        <h1 className="text-black text-lg font-bold">
          Let's add a new Lecture and details about the Course
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>

      <div className="space-y-7 mt-12">
        {/* Course Title Input */}
        <div className="w-full text-start">
          <label htmlFor="courseTitle">Title</label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Your Course Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="border-[1.5px] border-gray-300 px-2.5 py-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Course Category Select
        <div className="text-start">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a category</option>
            <option value="Next js">Next.js</option>
            <option value="Data Science">Data Science</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Python">Python</option>
          </select>
        </div> */}

        {/* Action Buttons */}
        <div className="space-x-3 flex items-start">
          <button
            onClick={() => navigate(`/admin/editcourse/${courseId}`)}
            className="border  text-black bg-slate-200 px-5 py-2 rounded-md"
          >
            Back to Course
          </button>
          <button
            onClick={createLectureHandler}
            className="bg-black text-white px-5 py-2 rounded-md flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            ) : (
              "Create Lecture"
            )}
          </button>
        </div>

        <div className="mt-12">
          {getallLectures?.length === 0 ? (
            <>
              <p>No lecture is available</p>
            </>
          ) : (
            getallLectures.lectures?.map((lecture, index) => {
              return (
                <>
                  <div key={index}>
                    <Lecture
                      lecture={lecture}
                      courseId={courseId}
                      index={index}
                    />
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
