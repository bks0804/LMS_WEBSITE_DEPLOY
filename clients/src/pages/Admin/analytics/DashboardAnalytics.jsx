import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const DashboardAnalytics = () => {
  const [course, setCourse] = useState(null);

  const getPurchasedetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const res = await axios.get(
        "FRONTEND_SERVER_API/api/payment/purchasedcourse",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourse(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    }
  };
  useEffect(() => {
    getPurchasedetails();
  }, []);

  const courseData = course?.purchasedCourse?.map((course) => ({
    name: course.courseId?.courseTitle,
    price: course.courseId?.coursePrice,
  }));

  const totalRevenue = course?.purchasedCourse?.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = course?.purchasedCourse?.length;

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-24 md:ml-64 p-5 sm:p-8">
      <div className="rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.3)] p-5 space-y-5 transition-shadow duration-300">
        <h1 className="text-2xl font-bold">Total Sales</h1>

        <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
      </div>

      <div className="rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)] p-5 space-y-5 transition-shadow duration-300">
        <h1 className="text-2xl font-bold">Total Revenue</h1>

        <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
      </div>

      <div className="rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.3)] col-span-2 p-5 space-y-5 transition-shadow duration-300">
        <h1 className="text-2xl font-bold">Course Prices</h1>

        <div className="text-xl font-bold text-blue-600">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={45}
                textAnchor="mid"
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={2}
                dot={{ stroke: "#4a90e2", strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
