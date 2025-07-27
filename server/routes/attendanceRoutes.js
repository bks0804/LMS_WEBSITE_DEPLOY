const express = require("express");
const router = express.Router();
const {
  createIncloseAttendance,
  getIncloseAttendanceDetails,
  markSelfAttendance,
  getAllMarkedInclosedAttendanceUser,
} = require("../controllers/attendanceController");

const isAuthenticated = require("../middleware/isAuthenticated");

// POST /api/attendance/create
router.post("/create", isAuthenticated, createIncloseAttendance);
router.get(
  "/getexstedattendancedetail",
  isAuthenticated,
  getIncloseAttendanceDetails
);
router.post("/markstudentattendance", isAuthenticated, markSelfAttendance);
router.post(
  "/markedattendanceuser",
  isAuthenticated,
  getAllMarkedInclosedAttendanceUser
);

module.exports = router;
