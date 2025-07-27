const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    lectureType: {
      type: String,
      enum: ["Recorded", "Live"],
    },
    videoUrl: {
      type: String,
    },
    meetingId: {
      type: String,
    },
    publicId: {
      type: String,
    },
    isPreviewFree: {
      type: String,
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
