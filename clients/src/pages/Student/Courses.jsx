import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Course from "./Course";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getPublishedCourse = async () => {
    try {
      const res = await axios.get(
        "FRONTEND_SERVER_API/api/course/published-courses"
      );
      setCourses(res.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    }
  };
  useEffect(() => {
    getPublishedCourse();
  }, []);

  return (
    <div className="my-20">
      {!isHomePage && (
        <div>
          <HeroSection />
          <h1 className="text-4xl font-bold text-primary text-center mt-12">
            Our Available Courses
          </h1>
        </div>
      )}
      <div className="max-w-7xl mx-auto justify-center gap-6 px-3 sm:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0 ? (
          courses?.map((course, index) => (
            <Course key={course._id} course={course} />
          ))
        ) : (
          <p className="text-center text-gray-500">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
