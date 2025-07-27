const { required } = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
  },
});

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: {
      type: [commentSchema],
    },

    thumbnail: {
      type: String,
    },
    author: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
