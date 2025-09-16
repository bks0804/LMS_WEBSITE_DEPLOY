const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userUniqueId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "superadmin", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
    },
    school_CollegeName: {
      type: String,
    },
    board_UniversityName: {
      type: String,
    },
    class_DegreeName: {
      type: String,
    },
    yearOfStudy: {
      type: String,
    },
    specialization: {
      type: String,
    },
    salary: {
      type: String,
    },
    dateOfJoining: {
      type: String,
    },
    experience: {
      type: String,
    },
    goodWords: {
      type: String,
    },
    userCourseUniqueId: {
      type: String,
    },
    ratingsOfTeacher: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
      },
    ],
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
