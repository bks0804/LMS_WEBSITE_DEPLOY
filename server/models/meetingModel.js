const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  timeZone: {
    type: String,
    default: "Asia/Kolkata",
  },
  password: {
    type: String,
  },
  hostVideo: {
    type: Boolean,
    default: true,
  },
  participantVideo: {
    type: Boolean,
    default: false,
  },
  joinBeforeHost: {
    type: Boolean,
    default: false,
  },
  autoRecording: {
    type: String,
    enum: ["none", "local", "cloud"],
    default: "none",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = mongoose.model("meeting", meetingSchema);
module.exports = Meeting;
