import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BlogTable = () => {
  const [getBlogs, setGetBlogs] = useState([]);
  const navigate = useNavigate();

  const getAllBlogsHandle = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8000/api/blog/getcreatedblog",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogsHandle();
  }, []);
  return (
    <div className="p-5 md:p-8 lg:p-16 ml-0 sm:ml-48 lg:ml-64 mt-20">
      <button className="bg-gray-900 py-3 rounded-lg text-white px-3 md:px-5 mb-10 ml-12 sm:ml-0">
        <Link to="/admin/addblog">Create a new Blog</Link>
      </button>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-600 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {getBlogs.length > 0 ? (
              getBlogs.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white dark:bg-gray-800 border-t z-20"
                >
                  <th
                    scope="row"
                    className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.blogTitle}
                  </th>
                  <td className="px-6 py-4">{item.category || "NA"}</td>
                  <td className="px-6 py-4">
                    <p className="bg-green-200 text-green-700 px-4 py-1.5 rounded-lg w-min">
                      {item.isPublished ? "Published" : "Draft"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/editblog/${item._id}`)}
                      className="border px-4 py-1.5 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
