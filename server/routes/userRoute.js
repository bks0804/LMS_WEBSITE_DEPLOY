// const express = require("express");
// const router = express.Router();
// const upload = require("../utils/multer");
// const {
//   register,
//   login,
//   getUserProfile,
//   updateProfile,
// } = require("../controllers/userController");
// const isAuthenticated = require("../middleware/isAuthenticated");
// router.post("/register", register);
// router.post("/login", login);
// router.get("/profile", isAuthenticated, getUserProfile);
// router.put(
//   "/profile/update",
//   isAuthenticated,
//   upload.single("profilePhoto"),
//   updateProfile
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
// const streamifier = require("streamifier");
// const cloudinary = require("../utils/cloudinary");
const {
  register,
  login,
  getUserProfile,
  updateProfile,
  getAllAdmin,
  getAllStudent,
  updateStudentToAdmin,
  userDelete,
  addTeacherRating,
  userAttendance,
  getAttendanceDetailToAdmin,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  signupValidation,
  signinValidation,
} = require("../middleware/inputValidation");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", signupValidation, register);
router.post("/login", signinValidation, login);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/getalladmin", getAllAdmin);
router.get("/getallstudent", getAllStudent);
router.put(
  "/:userId/updateStudentToAdmin",
  isAuthenticated,
  updateStudentToAdmin
);

router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfile
);
router.put("/addteacherrating", isAuthenticated, addTeacherRating);

router.delete("/:userId", isAuthenticated, userDelete);
router.post("/attendance/mark", isAuthenticated, userAttendance);
router.get(
  "/:courseId/:lectureId/getuserslectureattendance",
  isAuthenticated,
  getAttendanceDetailToAdmin
);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:id/:token", resetPassword);
module.exports = router;
