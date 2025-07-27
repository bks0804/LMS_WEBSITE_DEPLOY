const mongoose = require("mongoose");

const RatingOfTeacherSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const Rating = mongoose.model("Rating", RatingOfTeacherSchema);
module.exports = Rating;
