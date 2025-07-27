import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";
import LiveLectureTab from "./LiveLectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [lectureMode, setLectureMode] = useState("Recorded");

  const handleLectureModeChange = (e) => {
    setLectureMode(e.target.value);
  };
  return (
    <div className="flex-1 mt-20 ml-64">
      <div className="flex items-center justify-between gap-2 p-12">
        <div className="flex items-center gap-2 p-12">
          {" "}
          <Link
            to={`/admin/editcourse/${courseId}/createlecture`}
            className="cursor-pointer border rounded-full p-1.5 bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414z"
                />
              </g>
            </svg>
          </Link>
          <h1 className="font-bold text-lg">Update Your Lecture</h1>
        </div>

        <div className="flex space-x-5">
          {/* <button
            type="button"
            onClick={handleLectureModeOn}
            className="inline-flex w-full justify-center rounded-md text-red-600 border border-red-600 px-4 py-1.5 text-md font-semibold shadow-xs sm:ml-3 sm:w-auto"
          >
            Live Lecture
          </button>
          <button
            type="button"
            onClick={handleLectureModeOff}
            className="mt-3 inline-flex w-full justify-center  rounded-md bg-white px-4 py-1.5 text-md font-semibold text-g ring-1 shadow-xs ring-gray-900 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Recorded
          </button> */}

          <label className="flex items-center text-nowrap font-bold">
            Lecture Type :
          </label>

          <select
            name="autoRecording"
            value={lectureMode}
            onChange={handleLectureModeChange}
            className="w-full border py-2 pl-3 pr-12 rounded"
          >
            <option value="Recorded">Recorded</option>
            <option value="Live">Live Lecture</option>
          </select>
        </div>
      </div>
      <div className="px-12">
        {lectureMode === "Live" ? <LiveLectureTab lectureMode={lectureMode} /> : <LectureTab lectureMode={lectureMode} />}
      </div>
    </div>
  );
};

export default EditLecture;
