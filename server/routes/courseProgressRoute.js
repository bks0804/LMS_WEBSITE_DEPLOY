const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated.js");
const {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsInCompleted,
  rating,
  getExistRating,
  getAverageRatingsByCourseAndUser,
  updateExistRating,
} = require("../controllers/courseProgressController.js");

router.get("/:courseId", isAuthenticated, getCourseProgress);
router.post(
  "/:courseId/lecture/:lectureId/view",
  isAuthenticated,
  updateLectureProgress
);
router.post("/:courseId/completed", isAuthenticated, markAsCompleted);
router.post("/:courseId/incompleted", isAuthenticated, markAsInCompleted);
router.post("/:courseId/rate-lecture", isAuthenticated, rating);
router.get(
  "/:courseId/getrating",
  isAuthenticated,
  getAverageRatingsByCourseAndUser
);
router.post("/:courseId/getexistrating", isAuthenticated, getExistRating);
router.put("/:courseId/updateexistrating", isAuthenticated, updateExistRating);


module.exports = router;
