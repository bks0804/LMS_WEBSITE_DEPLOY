// routes/zoom.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const base64 = require("base-64");
const dotenv = require("dotenv");
dotenv.config();

const zoomAccountId = process.env.ZOOM_ACCOUNT_ID;
const zoomClientId = process.env.ZOOM_API_KEY;
const zoomClientSecret = process.env.ZOOM_API_SECRET;

const getAuthHeaders = () => {
  return {
    Authorization: `Basic ${base64.encode(
      `${zoomClientId}:${zoomClientSecret}`
    )}`,
    "Content-Type": "application/json",
  };
};

router.post("/create-meeting", async (req, res) => {
  try {
    const tokenRes = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      }
    );

    const { access_token } = await tokenRes.json();

    const meetingRes = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "Zoom Meeting",
        type: 2,
        duration: 60,
        start_time: new Date().toISOString(),
        timezone: "Asia/Kolkata",
        password: "12345",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
        },
      }),
    });

    const meetingData = await meetingRes.json();
    res.json(meetingData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Zoom meeting creation failed" });
  }
});

exports.module = router;
