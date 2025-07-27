import React, { useEffect, useState } from "react";
import RichTextEditor from "../../components/ui/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [data, setData] = useState({});
  const [input, setInput] = useState({
    blogTitle: "",
    description: "",
    category: "",
    shortDescription: "",
    blogThumbnail: null,
  });

  const navigate = useNavigate();
  const { blogId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `FRONTEND_SERVER_API/api/blog/${blogId}/getblog`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const blogData = response.data;
        setData(blogData);
        setInput({
          blogTitle: blogData.blogTitle || "",
          description: blogData.description || "",
          category: blogData.category || "",
          // createdAt: blogData.createdAt?.slice(0, 10) || "", // for date input
          blogThumbnail: blogData.blogThumbnail || null,
        });

        if (blogData.blogThumbnail) {
          setPreviewThumbnail(blogData.blogThumbnail);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [blogId, token]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prevInput) => ({ ...prevInput, blogThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateblogHandler = async () => {
    if (
      !input.blogTitle ||
      !input.description ||
      !input.shortDescription ||
      !input.category ||
      // !input.createdAt ||
      !input.blogThumbnail
    ) {
      alert("Please fill in all fields before updating the blog.");
      return;
    }

    const formData = new FormData();
    formData.append("blogId", blogId);
    formData.append("blogTitle", input.blogTitle);
    formData.append("description", input.description);
    formData.append("shortDescription", input.shortDescription);
    formData.append("category", input.category);
    // formData.append("createdAt", input.createdAt);
    formData.append("blogThumbnail", input.blogThumbnail);

    try {
      const response = await axios.put(
        `FRONTEND_SERVER_API/api/blog/${blogId}/updateblog/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Blog updated successfully!");
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update the blog. Please try again.");
    }
  };

  const publishStatusHandler = async () => {
    try {
      const response = await axios.put(
        `FRONTEND_SERVER_API/api/blog/${blogId}/publish`,
        { isPublished: !data.isPublished },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData((prev) => ({
        ...prev,
        isPublished: response.data.blog.isPublished,
      }));
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  const removeBlogHandler = async () => {
    try {
      const response = await axios.delete(
        `FRONTEND_SERVER_API/api/blog/${blogId}/blog-remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Blog deleted successfully!");
        navigate("/admin/blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="border rounded-xl p-8 sm:ml-48 lg:ml-64 mt-20">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-lg font-bold">Basic Blog Information</h1>
          <p className="text-sm">Make to create your blog here.</p>
        </div>
        <div className="space-x-3">
          <button
            onClick={publishStatusHandler}
            className={`px-4 py-2 rounded border hover:bg-gray-100 font-semibold`}
          >
            {data.isPublished ? "UnPublish" : "Publish"}
          </button>
          <button
            onClick={removeBlogHandler}
            className="bg-black text-white font-semibold px-3 py-2 rounded-md"
          >
            Remove blog
          </button>
        </div>
      </div>

      <div className="space-y-7 mt-5">
        <div className="space-x-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="blogTitle"
            value={input.blogTitle}
            onChange={changeEventHandler}
            className="border px-2 py-1.5 rounded-md w-full"
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="shortDescription">Short Description</label>
          <input
            id="shortDescription"
            type="text"
            name="shortDescription"
            value={input.shortDescription}
            onChange={changeEventHandler}
            className="border px-2 py-1.5 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex gap-10">
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={input.category}
              onChange={changeEventHandler}
              className="border px-4 py-2 rounded-md w-full"
            >
              <option value="">Choose a category</option>
              <option value="Next Js">Next Js</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Docker">Docker</option>
              <option value="Data Science">Data Science</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="MERN Stack Development">
                MERN Stack Development
              </option>
              <option value="Full Stack Development">
                Full Stack Development
              </option>
              <option value="Python">Python</option>
            </select>
          </div>

          {/* <div>
            <label htmlFor="createdAt">CreatedAt</label>
            <input
              id="createdAt"
              type="date"
              name="createdAt"
              value={input.createdAt}
              onChange={changeEventHandler}
              className="border px-2 py-1.5 rounded-md w-full"
            />
          </div> */}
        </div>

        <div>
          <label htmlFor="blogThumbnail">Blog Thumbnail</label>
          <input
            id="blogThumbnail"
            type="file"
            accept="image/*"
            onChange={selectThumbnail}
            className="border px-2 py-1.5 rounded-md w-full"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              alt="blog thumbnail"
              className="w-64 my-3 pt-5"
            />
          )}
        </div>

        <div className="space-x-3">
          <button
            className="border-2 border-red-600 px-5 py-1.5 font-semibold text-lg text-red-600 rounded-md"
            onClick={() => navigate("/admin/blogs")}
          >
            Cancel
          </button>
          <button
            onClick={updateblogHandler}
            className="border-2 border-green-600 text-green-600 px-7 py-1.5 rounded-md font-semibold text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
