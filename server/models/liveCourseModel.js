const mongoose = require("mongoose");

const liveCourseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    courseLevel: {
      type: String,
    },
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId },
    teacherId: { type: mongoose.Schema.Types.ObjectId },

    meetingLink: {
      type: String,
    },
    meetingId: { type: String },
    passcode: { type: String },
    scheduledDate: { type: Date },
    duration: { type: Number },
    isCompleted: { type: Boolean },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LiveCourse = mongoose.model("Course", liveCourseSchema);
module.exports = LiveCourse;
