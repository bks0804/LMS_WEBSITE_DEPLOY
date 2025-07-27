import React, { useEffect, useState } from "react";
import RichTextEditor from "../../../components/ui/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseTab = () => {
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    Title: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const navigate = useNavigate();
  const { courseId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `FRONTEND_SERVER_API/api/course/${courseId}/getcourse/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const courseData = response.data;
        setData(courseData);

        setInput({
          Title: courseData.courseTitle || "",
          subTitle: courseData.subTitle || "",
          description: courseData.description || "",
          category: courseData.category || "",
          courseLevel: courseData.courseLevel || "",
          coursePrice: courseData.coursePrice || "",
          courseThumbnail: courseData.courseThumbnail || "",
        });

        if (courseData.courseThumbnail) {
          setPreviewThumbnail(courseData.courseThumbnail);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [courseId, token]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prevInput) => ({ ...prevInput, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    if (
      !input.Title ||
      !input.subTitle ||
      !input.description ||
      !input.category ||
      !input.courseLevel ||
      !input.coursePrice ||
      !input.courseThumbnail
    ) {
      alert("Please fill in all fields before updating the course.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("Title", input.Title);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    try {
      const response = await axios.put(
        `FRONTEND_SERVER_API/api/course/${courseId}/updatecourse/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Course updated successfully!");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update the course. Please try again.");
    }
  };

  const publishStatusHandler = async () => {
    try {
      const response = await axios.put(
        `FRONTEND_SERVER_API/api/course/${courseId}/publish`,
        { isPublished: !data.isPublished },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData((prev) => ({
        ...prev,
        isPublished: response.data.course.isPublished,
      }));
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  const removeCourseHandler = async () => {
    try {
      const response = await axios.delete(
        `FRONTEND_SERVER_API/api/course/${courseId}/course-remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Course deleted successfully!");
        navigate("/admin/courses");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete course");
    }
  };
  return (
    <div className="border rounded-xl p-8">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-lg font-bold">Basic Course Information</h1>
          <p className="text-sm">Make changes to your course here.</p>
        </div>
        <div className="space-x-3">
          <button
            onClick={publishStatusHandler}
            disabled={(data.lectures || []).length === 0}
            className={`px-4 py-2 rounded ${
              (data.lectures || []).length === 0
                ? "bg-gray-400 cursor-not-allowed font-semibold"
                : "border hover:bg-gray-100 font-semibold"
            }`}
          >
            {data.isPublished ? "UnPublish" : "Publish"}
          </button>
          <button
            onClick={removeCourseHandler}
            className="bg-black text-white font-semibold px-3 py-2 rounded-md"
          >
            Remove Course
          </button>
        </div>
      </div>

      <div className="space-y-7 mt-5">
        <div className="space-x-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="Title"
            value={input.Title}
            onChange={changeEventHandler}
            className="border px-2 py-1.5 rounded-md w-full"
          />
        </div>

        <div className="space-x-2">
          <label htmlFor="subTitle">SubTitle</label>
          <input
            id="subTitle"
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            className="border px-2 py-1.5 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex gap-10">
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={input.category}
              onChange={changeEventHandler}
              className="border px-4 py-2 rounded-md w-full"
            >
              <option value="">Choose a category</option>
              <option value="Next Js">Next Js</option>
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
          <div>
            <label htmlFor="courseLevel">Course Level</label>
            <select
              id="courseLevel"
              name="courseLevel"
              value={input.courseLevel}
              onChange={changeEventHandler}
              className="border px-4 py-2 rounded-md w-full"
            >
              <option value="">Choose a level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="coursePrice">Price (INR)</label>
            <input
              id="coursePrice"
              type="text"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              className="border px-2 py-1.5 rounded-md w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="courseThumbnail">Course Thumbnail</label>
          <input
            id="courseThumbnail"
            type="file"
            accept="image/*"
            onChange={selectThumbnail}
            className="border px-2 py-1.5 rounded-md w-full"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              alt="course thumbnail"
              className="w-64 my-3 pt-5"
            />
          )}
        </div>

        <div className="space-x-3">
          <button
            className="border-2 border-red-600 px-5 py-1.5 font-semibold text-lg text-red-600 rounded-md"
            onClick={() => navigate("/admin/courses")}
          >
            Cancel
          </button>
          <button
            onClick={updateCourseHandler}
            className="border-2 border-green-600 text-green-600 px-7 py-1.5 rounded-md font-semibold text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTab;
