import { useEffect, useState } from "react";
import axios from "axios";
export default function ScheduleMeetingForm() {
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingId, setMeetingId] = useState("");

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
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

  const handleMeetingCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "FRONTEND_SERVER_API/create-meeting",
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

  const fetchMeeting = async (e) => {
    if (e && e.preventDefault) e.preventDefault(); // Only if triggered from a form

    if (!meetingId) return;

    try {
      const res = await axios.get(`FRONTEND_SERVER_API/meeting/${meetingId}`);
      // setMeeting(res.data);
    } catch (error) {
      console.error("Failed to fetch meeting", error);
      alert("Error fetching meeting details.");
    }
  };

  useEffect(() => {
    if (meetingId) {
      fetchMeeting();
    }
  }, [handleMeetingCreate]);

  return (
    <>
      <form
        className="max-w-4xl mx-auto p-4 space-y-4"
        onSubmit={handleMeetingCreate}
      >
        <h2 className="text-xl font-bold">Schedule a Zoom Meeting</h2>
        <div>
          <label htmlFor="">Title</label>{" "}
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="">Description</label>{" "}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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
        <div className="max-w-4xl mx-auto p-4 space-y-4">
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
    </>
  );
}
