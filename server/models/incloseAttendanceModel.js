// models/Attendance.js
const mongoose = require("mongoose");

const StudentAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present",
  },
});

const IncloseAttendanceSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    lectureTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String, // format: 'YYYY-MM-DD'
      required: true,
    },
    startTime: {
      type: String, // format: 'HH:mm'
      required: true,
    },
    closeTime: {
      type: String, // format: 'HH:mm'
      required: true,
    },
    studentAttendance: [StudentAttendanceSchema],
  },
  { timestamps: true }
);

const IncloseAttendance = mongoose.model(
  "IncloseAttendance",
  IncloseAttendanceSchema
);
module.exports = IncloseAttendance;
