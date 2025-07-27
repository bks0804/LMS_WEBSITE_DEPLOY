import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "mongoose";
const LectureTab = ({ lectureMode }) => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setbtnDisable] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;
  const MEDIA_API = "http://localhost:8000/api/media";

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.publicId,
          });
          setbtnDisable(false);
        }
      } catch (error) {
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const updateLectureHandler = async () => {
    const data = {
      lectureTitle: title,
      lectureType: lectureMode,
      videoInfo: uploadVideoInfo,
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
        .then((res) => {
          // console.log(res.data);
        });
      navigate(-1);
    } catch (error) {
      console.error("Error updating lecture:", error);
    }
  };

  const removeLectureHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios
        .delete(
          `http://localhost:8000/api/course/getcourselecture/${lectureId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
        });
      navigate(-1);
    } catch (error) {
      console.error("Error updating lecture:", error);
    }
  };

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

      // ✅ Set the existing data into states
      setTitle(lecture.lectureTitle);
      setUploadVideoInfo(lecture?.videoInfo || null);
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

  return (
    <div className="flex flex-col border rounded-xl p-10 space-y-8">
      <div>
        <h1 className="font-bold text-lg">Edit Lecture</h1>
        <p>Make changes and click save when it done</p>
        <button
          onClick={removeLectureHandler}
          className="rounded-md bg-red-500 text-white px-3 py-2 mt-3"
        >
          Remove Lecture
        </button>
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="">
          Title
        </label>
        <input
          className="border rounded-md px-3 py-1.5"
          type="text"
          placeholder="Ex. Introduction to javascript"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">
          Video <span className="text-red-500">*</span>
        </label>
        <input
          className="w-fit border rounded-sm"
          type="file"
          accept="video/*"
          onChange={fileChangeHandler}
        />
      </div>
      <div>
        <label className="inline-flex items-center cursor-pointer">
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
      {mediaProgress && (
        <div className="py-4">
          <div className="mb-1 text-base font-medium dark:text-white">
            <p>{uploadProgress}% Uploaded</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div>
        <button
          className="bg-black text-white px-5 py-2 rounded-md"
          // disabled={btnDisable}
          onClick={updateLectureHandler}
        >
          Update Lecture
        </button>
      </div>
    </div>
  );
};

export default LectureTab;
