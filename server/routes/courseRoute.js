const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  createCourse,
  getCreatedCourse,
  editCourse,
  getCourseById,
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishCourse,
  getPublishedCourse,
  searchCourse,
  removeCourse,
} = require("../controllers/courseController.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");

router.post("/createCourse", isAuthenticated, createCourse);
router.get("/getallcourses", isAuthenticated, getCreatedCourse);
router.get("/published-courses", getPublishedCourse);

router.put(
  "/:courseId/updatecourse",
  isAuthenticated,
  upload.single("courseThumbnail"),
  editCourse
);
router.get("/:courseId/getcourse", isAuthenticated, getCourseById);
router.post("/:courseId/createlecture", isAuthenticated, createLecture);
router.get("/:courseId/getcourselecture", isAuthenticated, getCourseLecture);
router.put(
  "/:courseId/getcourselecture/:lectureId",
  isAuthenticated,
  editLecture
);
router.delete("/getcourselecture/:lectureId", isAuthenticated, removeLecture);
router.get("/getcourselecture/:lectureId", isAuthenticated, getLectureById);

router.put("/:courseId/publish", isAuthenticated, togglePublishCourse);
router.get("/search", isAuthenticated, searchCourse);
router.delete("/:courseId/course-remove", isAuthenticated, removeCourse);


module.exports = router;
