import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const PurchasedCourseProtectedRoute = ({ children }) => {
  const [data, setData] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) return;

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

        // console.log("Course Details:", response.data);
        setData(response.data);
      } catch (error) {
        console.error(
          "Error fetching course details:",
          error.response?.data || error.message
        );
      }
    };

    getCourseDetailswithStatus();
  }, [courseId]);

  if (!courseId) return <Navigate to="/courses" />;

  if (data === null) return <p>Loading...</p>;

  return data?.purchased === false ? (
    <Navigate to={`/course-details/${courseId}`} />
  ) : (
    children
  );
};
