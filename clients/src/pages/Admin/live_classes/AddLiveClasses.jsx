import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLiveClasses = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const isLoading = false;

  const createliveCourseHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios
        .post(
          `${
            import.meta.env.VITE_FRONTEND_SERVER_API
          }/api/livecourse/createliveCourse`,
          {
            category,
            courseTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      alert("Course Created");
      navigate("/admin/courses");
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className="mt-40 pb-24 text-center justify-center">
      <div>
        <h1 className="text-black text-lg font-bold">
          Let's add a new Blog and details about the
        </h1>
      </div>

      <div className="space-y-4 mt-12 max-w-sm mx-auto">
        {/* Course Title Input */}
        <div className="w-full text-start">
          <label htmlFor="courseTitle">Title</label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Your Course Name"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="border-[1.5px] border-gray-300 px-2.5 py-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Course Category Select */}
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
            <option value="JavaScript">JavaScript</option>
            <option value="Docker">Docker</option>
            <option value="Data Science">Data Science</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="MERN Stack Development">
              MERN Stack Development
            </option>
            <option value="Full Stack Development">
              Full Stack Development
            </option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-x-3 flex items-start">
          <button
            onClick={() => navigate("/admin/courses")}
            className="bg-black text-white px-5 py-2 rounded-md"
          >
            Back
          </button>
          <button
            onClick={createliveCourseHandler}
            className="bg-black text-white px-5 py-2 rounded-md flex items-center justify-center"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLiveClasses;
