import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByLevel, setSortByLevel] = useState("");

  const [courses, setCourses] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleFilterChange = (categories, price, level) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
    setSortByLevel(level);
  };

  const handleGetSearchCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      // Build query string properly
      let queryString = `?query=${encodeURIComponent(query)}`;

      // Append category if available
      if (selectedCategories?.length > 0) {
        const categoriesString = selectedCategories
          ?.map(encodeURIComponent)
          .join(",");
        queryString += `&categories=${categoriesString}`;
      }

      // Append sortByPrice if available
      if (sortByPrice) {
        queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
      }

      // Append sortByLevel if available
      if (sortByLevel) {
        queryString += `&sortByLevel=${encodeURIComponent(sortByLevel)}`;
      }
      const res = await axios.get(
        `FRONTEND_SERVER_API/api/course/search${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data.courses);
      setIsEmpty(res.data.courses?.length === 0);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    handleGetSearchCourse();
  }, [query, selectedCategories, sortByPrice, sortByLevel]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-20">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">Results for "{query}"</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 text-lg font-bold italic">
            {query}
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-20 mt-5">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isEmpty ? (
            <CourseNotFound />
          ) : (
            courses?.map((course, index) => (
              <SearchResult key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      {/* <AlertCircle className="text-red-500 h-16 w-16 mb-4" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        viewBox="0 0 24 24"
      >
        <g className="alert-outline">
          <g
            fill="#f20c0c"
            stroke="#f20c0c"
            strokeWidth={0.3}
            className="Vector"
          >
            <path
              fillRule="evenodd"
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-10 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12 14a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1"
              clipRule="evenodd"
            />
            <path d="M11 16a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
          </g>
        </g>
      </svg>
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <button className="bg-gray-300 px-4 py-2 rounded-md">
          Browse All Courses
        </button>
      </Link>
    </div>
  );
};
