import React, { useEffect, useState } from "react";
import Course from "../Course";
import Navbar from "../../../components/Navbar";
import axios from "axios";

const MyLearning = () => {
  const [course, setCourse] = useState();

  const getuserdetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.get("http://localhost:8000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("Fetched user:", res.data.user);
      setCourse(res.data.user);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    }
  };
  useEffect(() => {
    getuserdetails();
  }, []);

  return (
    <div className="text-lg font-medium max-w-6xl mx-auto mt-24">
      <h1 className="text-2xl font-bold text-primary ml-12">My learnings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {course?.enrolledCourses?.length === 0 ? (
          <h2>You have not enrolled course yet</h2>
        ) : (
          course?.enrolledCourses?.map((course, index) => {
            return <Course key={index} course={course} />;
          })
        )}
      </div>
    </div>
  );
};

export default MyLearning;
