const Course = require("../models/courseModel");
const CourseProgress = require("../models/courseProgressModel");
const Lecture = require("../models/lectureModel");
const Rating = require("../models/ratingModal");

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({ message: "Course not Found" });
    }

    // step-2
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    // console.log(error);
  }
};

const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exist,updates its status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // add a new lecture progress
      courseProgress.lectureProgress.push({ lectureId, viewed: true });
    }

    // if all lecture is complete
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === lectureProgressLength)
      courseProgress.completed = true;

    await courseProgress.save();

    return res
      .status(200)
      .json({ message: "Lecture Progress Updated Successfully" });
  } catch (error) {
    // console.log(error);
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({ message: "CourseProgress not found" });
    }

    courseProgress.lectureProgress?.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();

    return res.status(200).json({ message: "course marked as compleled." });
  } catch (error) {
    // console.log(error);
  }
};

const markAsInCompleted = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({ message: "CourseProgress not found" });
    }

    courseProgress.lectureProgress?.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;
    await courseProgress.save();

    return res.status(200).json({ message: "course marked as Incompleled." });
  } catch (error) {
    // console.log(error);
  }
};

const rating = async (req, res) => {
  const { lectureId, rating } = req.body;
  const { courseId } = req.params;
  const userId = req.id;
  try {
    const existingRating = await Rating.findOne({
      courseId,
      lectureId,
      userId,
    });

    if (existingRating) {
      return res.status(409).json({
        success: false,
        message: "Rating already exists",
        rating: existingRating,
      });
    }

    const newRating = new Rating({ courseId, userId, lectureId, rating });
    await newRating.save();

    // Save created ratingId into lecture
    // const lecture = await Lecture.findById(lectureId);

    // const saveRatingIdinLecure = lecture.ratings(newRating._id);
    // await saveRatingIdinLecure.save();

    await Lecture.findByIdAndUpdate(
      lectureId,
      { $push: { ratings: newRating._id } },
      { new: true }
    );

    res.json({ success: true, message: "Rating submitted!" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getExistRating = async (req, res) => {
  const { lectureId } = req.body;
  const { courseId } = req.params;
  const userId = req.id;
  try {
    const existingRating = await Rating.find({
      lectureId,
      courseId,
      userId,
    });

    if (existingRating) {
      return res.status(200).json({
        success: true,
        message: "Existing rating found",
        rating: existingRating,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Rating not found" });
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const updateExistRating = async (req, res) => {
  const { lectureId, rating } = req.body;
  const { courseId } = req.params;
  const userId = req.id; // Assuming this is set by auth middleware

  try {
    const updateRating = await Rating.findOneAndUpdate(
      { lectureId, courseId, userId },
      { rating },
      { new: true } // return updated doc
    );

    if (updateRating) {
      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        rating: updateRating.rating,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Rating not found to update" });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const getAverageRatingsByCourseAndUser = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.id;
  // console.log(courseId, userId);
  try {
    const lectureRatings = await Rating.aggregate([
      {
        $match: { courseId, userId },
      },
      {
        $group: {
          _id: "$lectureId",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Average ratings retrieved successfully",
      lectures: lectureRatings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

module.exports = {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsInCompleted,
  rating,
  getExistRating,
  getAverageRatingsByCourseAndUser,
  updateExistRating,
};
