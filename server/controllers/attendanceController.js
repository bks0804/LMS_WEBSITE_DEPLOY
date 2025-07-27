const IncloseAttendance = require("../models/incloseAttendanceModel");
const User = require("../models/userModel");
const createIncloseAttendance = async (req, res) => {
  try {
    const creatorId = req.id;
    // console.log(creatorId);
    const { courseTitle, lectureTitle, date, startTime, closeTime } = req.body;

    if (!courseTitle || !lectureTitle || !date || !startTime || !closeTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const attendance = await IncloseAttendance.create({
      creatorId,
      courseTitle,
      lectureTitle,
      date,
      startTime,
      closeTime,
    });
    res.status(201).json({ message: "Attendance created", attendance });
  } catch (err) {
    console.error("Error creating attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getIncloseAttendanceDetails = async (req, res) => {
  try {
    const ExistedAttendance = await IncloseAttendance.find().populate(
      "creatorId"
    );
    res.status(200).json(ExistedAttendance);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

const markSelfAttendance = async (req, res) => {
  try {
    const studentId = req.id; // from JWT
    const { attendanceId } = req.body;
    const attendance = await IncloseAttendance.findById(attendanceId);
    if (!attendance)
      return res.status(404).json({ message: "Session not found" });

    const alreadyMarked = attendance.studentAttendance.find(
      (entry) => entry.studentId.toString() === studentId
    );

    if (alreadyMarked) {
      return res.status(400).json({ message: "You already marked attendance" });
    }

    attendance.studentAttendance.push({ studentId, status: "Present" });
    await attendance.save();

    // Re-fetch to get populated data
    const updatedAttendance = await IncloseAttendance.findById(
      attendanceId
    ).populate("studentAttendance.studentId", "firstName lastName email role"); // populate selected fields

    res.json({
      message: "Attendance marked successfully",
      data: updatedAttendance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllMarkedInclosedAttendanceUser = async (req, res) => {
  try {
    const userId = req.id;
    const { courseTitle, lectureTitle } = req.body;
    const user = await User.findById(userId);

    if (user.role === "superadmin") {
      const markedAttendance = await IncloseAttendance.findOne({
        courseTitle,
        lectureTitle,
      }).populate(
        "studentAttendance.studentId creatorId",
        "name firstName lastName email role"
      );

      if (!markedAttendance) {
        return res.status(404).json({
          success: false,
          message: "Error finding marked attendance",
        });
      }

      return res.status(200).json({
        success: true,
        markedAttendance,
      });
    }

    return res.status(403).json({
      success: false,
      message: "User is not authorized for this action",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createIncloseAttendance,
  getIncloseAttendanceDetails,
  markSelfAttendance,
  getAllMarkedInclosedAttendanceUser,
};
