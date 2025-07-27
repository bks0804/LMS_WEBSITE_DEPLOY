const express = require("express");
const app = express();
require("dotenv").config();
// const dotenv = require("dotenv");
const PORT = process.env.PORT;
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const usercontactUsRoutes = require("./routes/contactUsRoutes");
const mediaRoutes = require("./routes/mediaRoute");
const courseRoutes = require("./routes/courseRoute");
const paymentRoutes = require("./routes/coursePurchaseRoute");
const courseProgressRoute = require("./routes/courseProgressRoute");
const blogRoutes = require("./routes/blogRoutes");
const attendanceRoute = require("./routes/attendanceRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const zoomRoutes = require("./controllers/zoom");
// const fetch = require("node-fetch");
const axios = require("axios");
const { generateZoomAccessToken } = require("./utils/zoomToken");
// const Meeting = require("./models/meetingModel");

const path = require("path");
const _dirname = path.resolve();

// Middleware
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });

// app.use(
//   cors({
//     origin: "FRONTEND_SERVER_API",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// api

app.post("/create-meeting", async (req, res) => {
  try {
    const accessToken = await generateZoomAccessToken();
    const {
      topic,
      description,
      startTime,
      duration,
      timeZone,
      hostVideo,
      participantVideo,
      joinBeforeHost,
      autoRecording,
    } = req.body;

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2,
        startTime: new Date(startTime),
        duration: parseInt(duration),
        timeZone,
        agenda: description,
        settings: {
          host_video: hostVideo,
          participant_video: participantVideo,
          join_before_host: joinBeforeHost,
          auto_recording: autoRecording,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // const meetingDetails = await Meeting.create({
    //   topic,
    //   accessToken,
    //   description,
    //   startTime,
    //   duration,
    //   timeZone,
    //   hostVideo,
    //   participantVideo,
    //   joinBeforeHost,
    //   autoRecording,
    // });

    return res.status(200).json({
      success: true,
      // meetingDetails,
      zoomMeetingData: response.data,
    });
  } catch (error) {
    console.error("Zoom Meeting Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create meeting" });
  }
});

app.get("/meeting/:id", async (req, res) => {
  const meetingId = req.params.id;

  const accessToken = await generateZoomAccessToken();

  try {
    const response = await axios.get(
      `https://api.zoom.us/v2/meetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      meetingId: response.data.id,
      topic: response.data.topic,
      joinUrl: response.data.join_url,
      startTime: response.data.start_time,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: "Failed to fetch Zoom meeting" });
  }
});

app.use("/api/media", mediaRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/course-progress", courseProgressRoute);
app.use("/api/contactus", usercontactUsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/attendance", attendanceRoute);

// app.use("/api/zoom", zoomRoutes);

/////

app.use(express.static(path.join(_dirname, "/clients/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "clients", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on : " + PORT);
});
