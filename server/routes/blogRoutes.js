const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createBlog,
  getCreatedBlogs,
  editBlog,
  getBlogById,
  getPublishedBlog,
  togglePublishBlog,
  removeBlog,
  addBlogComment,
  getBlogCommentByblogId,
  //   getPublishedBlog,
  //   togglePublishBlog,
} = require("../controllers/blogController");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/blogcreate", isAuthenticated, createBlog);
router.get("/getcreatedblog", isAuthenticated, getCreatedBlogs);
router.put(
  "/:blogId/updateblog",
  isAuthenticated,
  upload.single("blogThumbnail"),
  editBlog
);
router.get("/:blogId/getblog", isAuthenticated, getBlogById);
router.get("/published-blogs", getPublishedBlog);
router.put("/:blogId/publish", isAuthenticated, togglePublishBlog);
router.delete("/:blogId/blog-remove", isAuthenticated, removeBlog);
router.post("/:blogId/comment", isAuthenticated, addBlogComment);
router.get("/:blogId/getallcomment", isAuthenticated, getBlogCommentByblogId);

module.exports = router;
