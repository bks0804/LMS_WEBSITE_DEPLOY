import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/admin/editcourse/${courseId}/createlecture/${lecture._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#f7f9fa] rounded-md px-4 py-2 my-2">
      <h1 className="font-bold text-gray-800 cursor-pointer">
        Lectute - {index + 1} : {lecture.lectureTitle}
      </h1>
      <button onClick={goToUpdateLecture}>
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Lecture;
