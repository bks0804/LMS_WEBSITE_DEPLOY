import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const BlogDetails = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [blogDetails, setBlogDetails] = useState({});
  const [commentMessage, setCommentMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [getComments, getSetComments] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { blogId } = params;

  useEffect(() => {
    const getBlogDetailsById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `FRONTEND_SERVER_API/api/blog/${blogId}/getblog`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const blogData = response.data;
        setBlogDetails(blogData);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    getBlogDetailsById();
  }, [blogId]);

  const getPublishedBlogsHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `FRONTEND_SERVER_API/api/blog/published-blogs`,
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

  const handleGetAllComment = async (e) => {
    // e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `FRONTEND_SERVER_API/api/blog/${blogId}/getallcomment`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getSetComments(response.data.comments);
      // setCommentMessage(""); // clear input
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  useEffect(() => {
    getPublishedBlogsHandler();
    handleGetAllComment();
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `FRONTEND_SERVER_API/api/blog/${blogId}/comment`,
        {
          message: commentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.comments); // update comments list
      // setCommentMessage(""); // clear input
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const Categaries = [
    { name: "Fronted" },
    { name: "Backend" },
    { name: "Photography" },
    { name: "Technology" },
    { name: "Language" },
    { name: "Science" },
    { name: "Accounting" },
  ];

  const posts = [1, 2, 3, 4];
  return (
    <div className="max-w-7xl mx-auto mb-10 sm:mt-20 px-3 sm:px-12 md:px-28 lg:px-0 mt-24 sm:py-12 md:py-16 lg:py-20  grid grid-cols-1 lg:grid-cols-12 space-y-12 lg:space-x-10">
      <div className="col-span-1 lg:col-span-8 bg-gray-50 rounded-md">
        <img
          src={blogDetails.thumbnail || "/blog/blog-img.webp"}
          className="w-full"
          alt=""
        />
        <h1 className="text-3xl font-bold mt-3 px-3 sm:px-6 md:px-12">
          {blogDetails.blogTitle}
        </h1>

        <div className="sm:flex items-center gap-8 md:gap-12 lg:gap-14 text-nowrap py-8 px-3 sm:px-6 md:px-12 pl-5 sm:pl-0 space-y-3 sm:space-y-0">
          <span className="flex items-center gap-2 text-[#8A8A8A] text-base font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <path
                fill="#0c2e60"
                d="M22 2.25h-3.25V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25H2a2 2 0 0 0-2 1.999v17.75a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4.249a2 2 0 0 0-2-1.999M22.5 22a.5.5 0 0 1-.499.5H2a.5.5 0 0 1-.5-.5V4.25a.5.5 0 0 1 .5-.499h3.25v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751H22a.5.5 0 0 1 .499.499z"
              />
              <path
                fill="currentColor"
                d="M5.25 9h3v2.25h-3zm0 3.75h3V15h-3zm0 3.75h3v2.25h-3zm5.25 0h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3zm5.25 7.5h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3z"
              />
            </svg>
            {new Date(blogDetails.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2 text-[#8A8A8A] text-base font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <path
                fill="#0c2e60"
                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388 3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
              />
            </svg>
            {blogDetails.author}
          </span>
          <span className="flex items-center gap-2 text-[#8A8A8A] text-base font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <path
                fill="#0c2e60"
                d="M5.5 9A1.5 1.5 0 0 0 7 7.5 1.5 1.5 0 0 0 5.5 6 1.5 1.5 0 0 0 4 7.5 1.5 1.5 0 0 0 5.5 9m11.91 2.58c.36.36.59.86.59 1.42 0 .55-.22 1.05-.59 1.41l-5 5a1.996 1.996 0 0 1-2.83 0l-6.99-6.99C2.22 12.05 2 11.55 2 11V6c0-1.11.89-2 2-2h5c.55 0 1.05.22 1.41.58zm-3.87-5.87 1-1 6.87 6.87c.37.36.59.87.59 1.42s-.22 1.05-.58 1.41l-5.38 5.38-1-1L20.75 13z"
              />
            </svg>
            {blogDetails.category}
          </span>
        </div>

        <p className="text-[#505050] text-lg px-3 sm:px-6 md:px-12">
          {blogDetails.description}
        </p>

        <div className="border-2 border-gray-500 mt-12"></div>

        <div className="px-5 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold mt-5">Comments</h2>

          {getComments?.map((comment, index) => {
            return (
              <div className="flex items-center gap-8 md:gap-16 lg:gap-20 mt-4 sm:mt-8 md:mt-16">
                <img
                  src={comment.userId.photoUrl || "./teacher/team-1.png"}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover aspect-square"
                  alt=""
                />
                <div className="border-b">
                  <div className="flex items-center justify-between gap-20">
                    <h3 className="text-xl font-bold">
                      {comment.userId.firstName}
                    </h3>
                    <span className="text-[#888686] font-medium">
                      {new Date(comment.commentedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <p className="py-5 text-[#505050] font-medium">
                    {comment.message}
                  </p>
                  {/* <Link to="" className="text-lg font-medium">
                    Reply
                  </Link> */}
                </div>
              </div>
            );
          })}

          {/* <div className="ml-10 md:ml-16 lg:ml-20 flex items-center gap-8 md:gap-16 lg:gap-20 mt-4 sm:mt-8 md:mt-16 border-t-[1.5px] border-gray-500 py-3">
            <img
              src="./teacher/team-1.png"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover aspect-square"
              alt=""
            />
            <div>
              <div className="flex items-center gap-20">
                <h3 className="text-xl font-bold">Court Henry</h3>
                <span className="text-[#505050] font-medium">
                  January 16, 2024
                </span>
              </div>
              <p className="py-2 text-[#505050] font-medium">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which.
              </p>
              <Link to="" className="text-lg font-medium">
                Reply
              </Link>
            </div>
          </div> */}

          <div className="border-t-[1.5px] border-gray-500 py-5 mt-8">
            <h4 className="text-3xl font-bold text-primary">Leave a Comment</h4>

            <form onSubmit={handleSubmitComment}>
              <div className="space-y-12 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6 mt-2">
                    <div className="mt-2">
                      <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="5"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        maxLength={100}
                        placeholder="Write your comment..."
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              {/* {error && <p className="text-red-600 text-start mb-4">{error}</p>} */}
              <button
                type="submit"
                className="flex justify-center rounded-md bg-secondary px-6 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-[#4080e1fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4 space-y-6">
        <div className="bg-gray-50 rounded-md p-3 md:p-5 lg:p-8">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="w-full block rounded-md bg-white px-5 py-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-[#a1a1a1] placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="absolute end-2 bottom-0.5 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 rounded-md p-8">
          <h1 className="text-2xl text-primary font-bold">Categaries</h1>
          {Categaries?.map((Categary, index) => {
            return (
              <>
                <h2
                  key={index}
                  className="px-1 py-1 text-[#505050] font-medium hover:text-secondary hover:transition-all hover:duration-400 hover:delay-100 hover:ease-in-out"
                >
                  {Categary.name}
                </h2>
              </>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-md p-8 space-y-5">
          <h1 className="text-2xl text-primary font-bold">Popular Posts</h1>
          {publishedBlogs?.map((blog, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={blog.thumbnail}
                  className="md:w-28 h-24 rounded-xl"
                  alt=""
                />
                <div className="space-y-1">
                  <Link
                    to={`/${blog._id}/blog-details`}
                    className="text-lg font-semibold text-wrap hover:text-primary"
                  >
                    {blog.blogTitle}
                  </Link>

                  <p className="text-[#505050]">
                    {new Date(blog.createdAt).toLocaleDateString("en-Gb", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
