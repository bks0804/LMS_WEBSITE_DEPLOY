import React from "react";
import { Link, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div className="flex-1 mt-32 p-12 ml-64">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add details information about the course
        </h1>
        <Link to={`/admin/editcourse/${courseId}/createlecture`}>
          <button className="hover:underline hover:text-blue-600 px-3 py-2 rounded-md">
            Go to lecture Page
          </button>
        </Link>
      </div>

      <CourseTab />
    </div>
  );
};

export default EditCourse;
