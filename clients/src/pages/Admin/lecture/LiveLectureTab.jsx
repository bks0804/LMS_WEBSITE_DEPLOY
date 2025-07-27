import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const LiveLectureTab = ({ lectureMode }) => {
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingId, setMeetingId] = useState(null);

  const [title, setTitle] = useState(null);
  const [isFree, setIsFree] = useState(false);

  const [formData, setFormData] = useState({
    topic: title,
    startTime: "",
    duration: "",
    timeZone: "Asia/Kolkata",
    password: "",
    hostVideo: true,
    participantVideo: false,
    joinBeforeHost: false,
    autoRecording: "none",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;

  const getLectureHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/course/getcourselecture/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const lecture = response.data.lecture || response.data;

      setTitle(lecture.lectureTitle);
      setFormData((prev) => ({
        ...prev,
        topic: lecture.lectureTitle,
      }));
      setIsFree(lecture?.isPreviewFree || false);
    } catch (error) {
      // console.log("Error fetching lecture:", error);
    }
  };

  useEffect(() => {
    if (courseId && lectureId) {
      getLectureHandler();
    }
  }, [courseId, lectureId]);

  const handleMeetingCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/create-meeting",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMeetingLink(res.data.zoomMeetingData);
      setMeetingId(res.data.zoomMeetingData.id);
      alert("Meeting created successfully!");
    } catch (err) {
      console.error(
        "Meeting creation failed:",
        err.response?.data || err.message
      );
      alert("Failed to create meeting. Please try again.");
    }
  };

  const updateLectureHandler = async () => {
    const data = {
      lectureTitle: title,
      lectureType: lectureMode,
      meetingId,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await axios
        .put(
          `http://localhost:8000/api/course/${courseId}/getcourselecture/${lectureId}`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {});
      navigate(-1);
    } catch (error) {
      console.error("Error updating lecture:", error);
    }
  };
  return (
    <>
      <form
        className="max-w-4xl mx-auto p-4 space-y-5"
        onSubmit={handleMeetingCreate}
      >
        <h2 className="text-xl font-bold">Schedule a Zoom Meeting</h2>
        <div>
          <label htmlFor="">Title</label>{" "}
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="">Start Time</label>{" "}
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="">Duration</label>{" "}
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="">Time-Zone</label>{" "}
          <input
            type="text"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hostVideo"
              checked={formData.hostVideo}
              onChange={handleChange}
            />
            Host Video
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="participantVideo"
              checked={formData.participantVideo}
              onChange={handleChange}
            />
            Participant Video
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="joinBeforeHost"
            checked={formData.joinBeforeHost}
            onChange={handleChange}
          />
          Join Before Host
        </label>

        <select
          name="autoRecording"
          value={formData.autoRecording}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="none">Don't Record</option>
          <option value="local">Local Recording</option>
          <option value="cloud">Cloud Recording</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Meeting
        </button>
      </form>

      {meetingLink && (
        <div className="max-w-7xl mx-auto p-4 space-y-4">
          <p>Meeting Topic: {meetingLink.topic}</p>
          <p className="mb-2 font-semibold">Join URL:</p>
          <a
            href={meetingLink.join_url}
            target="_blank"
            className="text-blue-500 underline text-nowrap"
          >
            {meetingLink.join_url}
          </a>
        </div>
      )}
      <div>
        <label className="inline-flex items-center cursor-pointer ml-16 mt-12">
          <input
            type="checkbox"
            value=""
            checked={isFree}
            onChange={() => setIsFree(!isFree)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <label className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            is this video FREE?
          </label>
        </label>
      </div>
      <div className="my-5 ml-16">
        <button
          className="bg-black text-white px-5 py-2 rounded-md"
          // disabled={btnDisable}
          onClick={updateLectureHandler}
        >
          Update Lecture
        </button>
      </div>
    </>
  );
};

export default LiveLectureTab;
