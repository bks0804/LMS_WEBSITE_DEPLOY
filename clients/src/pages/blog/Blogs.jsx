import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Blogs = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const navigate = useNavigate();
  const blogData = [1, 2, 3];

  const getPublishedBlogsHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8000/api/blog/published-blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data?.blogs) {
        setPublishedBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Error get blogs", error);
    }
  };
  useEffect(() => {
    getPublishedBlogsHandler();
  }, []);

  return (
    <div className="py-24 mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 lg:px-5">
      {publishedBlogs.map((blog, index) => {
        return (
          <div
            key={index}
            className="border-2 border-gray-300 border-dashed p-5"
          >
            <img
              src={blog.thumbnail || "./courseImg/hq720.jpg"}
              className=""
              alt=""
            />
            <div className="relative -top-3 left-0 flex justify-between font-medium text-sm px-3 text-[#2C2C2CB3]">
              <span className="border py-0.5 px-2 rounded-md bg-white">
                {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center border py-0.5 px-2 rounded-md bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15}>
                  <path
                    fill="currentColor"
                    d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0 2.375 2.375 0 0 1 4.75 0"
                  />
                </svg>
                {blog.category}
              </span>
            </div>

            <div className="flex justify-between text-sm font-medium text-[#2C2C2CB3] pb-3">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                    fill="currentColor"
                    d="M14.5 8.25c-3.268 0-6 2.419-6 5.5s2.732 5.5 6 5.5a6.5 6.5 0 0 0 2.192-.378l2.616 1.09a.5.5 0 0 0 .674-.594l-.644-2.363A5.18 5.18 0 0 0 20.5 13.75c0-3.081-2.732-5.5-6-5.5"
                  />
                  <path
                    fill="currentColor"
                    d="M4 9.5c0 1.186.454 2.276 1.214 3.133l-.499 1.828c-.069.253-.103.38-.07.46.03.07.09.122.163.142.084.024.205-.027.447-.128l2.044-.851q.105.042.215.08a6 6 0 0 1-.014-.414c0-3.692 3.221-6.457 6.913-6.5C13.508 5.62 11.648 4.5 9.5 4.5 6.462 4.5 4 6.739 4 9.5"
                  />
                </svg>
                Comments (02)
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                    fill="currentColor"
                    d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388 3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                  />
                </svg>
                {blog.author}
              </span>
            </div>

            <Link
              to={`/${blog._id}/blog-details`}
              className="text-primary text-xl font-bold hover:text-secondary hover:ease-in-out hover:duration-400 hover:delay-100"
            >
              {blog.blogTitle}
            </Link>

            <p className="text-[#2C2C2CB3] text-base py-3">
              {blog.shortDescription}
            </p>

            <button
              type="button"
              onClick={() => navigate(`/${blogId}/blogdetails`)}
              className="text-xl hover:text-secondary text-primary font-semibold relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:h-[2px] after:w-full hover:after:w-0 hover:after:transition-all hover:after:ease-in-out hover:after:duration-500 after:bg-secondary"
            >
              Read More
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
