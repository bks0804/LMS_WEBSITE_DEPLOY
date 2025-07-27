import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    if (searchQuery.trim() !== "") {
      e.preventDefault();
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="retaive bg-gradient-to-r from-primary to-blue-500 text-center pt-10 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 mb-8">
          Discover, learn and Upskills with our wide range of courses
        </p>
        <form
          className="mx-5 flex items-center justify-center  rounded-full shadow-lg overflow-hidden mb-6 p-0.5 md:mx-auto max-w-xl bg-white"
          onSubmit={searchHandler}
        >
          <input
            className="flow-grow w-full border-none focus-visible:ring-0 focus:outline-none px-6 py-3 bg-white rounded-l-full shadow-lg max-w-xl mx-auto"
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-r-full"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => navigate(`/course/search?query`)}
          className="font-semibold text-primary bg-white hover:bg-[#131622] hover:text-white rounded-full px-5 py-2"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
