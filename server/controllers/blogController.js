const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const createBlog = async (req, res) => {
  const userId = req.id;
  const { blogTitle, category } = req.body;

  if (!blogTitle || !category) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields!",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user || !["admin", "superadmin"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create a blog.",
      });
    }

    const blog = await Blog.create({ blogTitle, category });

    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getCreatedBlogs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const userRole = user.role;

    let blogs;

    if (userRole === "superadmin") {
      blogs = await Blog.find();
    } else {
      blogs = await Blog.find(userId);
    }

    if (!blogs || blogs?.length === 0) {
      return res.status(404).json({
        blogs: [],
        message: "No blogs found!",
      });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const editBlog = async (req, res) => {
  try {
    const blogId = req.body.blogId;
    const userId = req.id;
    const { blogTitle, category, description, shortDescription } = req.body;
    // console.log(blogTitle, category, description, createAt);

    // user details
    const user = await User.findById(userId);
    const author = user?.firstName;
    // console.log(author )

    if (
      !blogTitle ||
      !category ||
      !shortDescription ||
      !description ||
      // !createdAt ||
      !author
    ) {
      return res.status(404).json({
        message: "Please fill all required field",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { buffer, originalname } = req.file;

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "blogThumbnail",
            resource_type: "image",
            public_id: originalname.split(".")[0],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    // Upload the file
    const result = await uploadStream();
    const blogThumbnail = result.secure_url;

    if (!blogThumbnail) {
      return res.status(404).json({ message: "course thumbnail is required" });
    }

    const updateData = {
      blogTitle,
      category,
      shortDescription,
      description,
      // createdAt,
      thumbnail: blogThumbnail,
      author,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(400).json({ message: "updated course error" });
    }

    return res.status(200).json({
      updatedBlog,
      message: "Blog updated Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get blog by id" });
  }
};

// publish / Unpublish course
const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { isPublished } = req.body;

    // console.log(blogId, isPublished);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "blog not found!" });
    }

    blog.isPublished = Boolean(isPublished);
    await blog.save();

    return res.status(200).json({
      message: `blog is ${blog.isPublished ? "Published" : "Unpublished"}`,
      blog,
    });
  } catch (error) {
    console.error("Error updating publish status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });

    if (!blogs) {
      return res.status(404).json({ message: "blogs are not found!" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get published blogs" });
  }
};

const removeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    // console.log(blogId);
    const blog = await Blog.findByIdAndDelete(blogId);
    // console.log(blog);

    if (!blog) {
      return res.status(404).json({ message: "blog not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Remove Successfully",
    });
  } catch (error) {
    console.error("Error removing blog:", error);
    res.status(500).json({ message: "Failed to remove blog" });
  }
};

const addBlogComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.id;
    const { message } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    const userName = user.firstName;

    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    blog.comments.push({ userId, userName, message });
    await blog.save();

    res.status(200).json({ msg: "Comment added", comments: blog.comments });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getBlogCommentByblogId = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "firstName lastName photoUrl",
      },
    });

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.status(200).json({
      msg: "Comments fetched successfully",
      comments: blog.comments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  createBlog,
  getCreatedBlogs,
  editBlog,
  getBlogById,
  togglePublishBlog,
  getPublishedBlog,
  removeBlog,
  addBlogComment,
  getBlogCommentByblogId,
};
