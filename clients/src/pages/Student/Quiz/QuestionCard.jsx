import { useEffect, useState } from "react";
import questions from "../../../_moke/question";

const optionLabels = ["A", "B", "C", "D", "E"];

function QuestionCard({
  question,
  options,
  onSelect,
  handlePrevious,
  handleNext,
  current,
  handleSubmit,
}) {
  const totalTime = questions?.length * 30;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isPaused, setIsPaused] = useState(false);
  // Track selected option for this question
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}m ${seconds}s`;
  };

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleOptionClick = (opt) => {
    if (timeLeft > 0) {
      setSelectedOption(opt);
      onSelect(opt);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-12 border py-3">
        <div className="flex items-center space-x-3">
          <img
            className="w-16 h-10 md:w-20 md:h-12"
            src="./logo.png"
            alt="logo"
          />
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-start">
            Static science
          </span>
          <span className="ml-0 md:ml-12 text-center text-red-600 font-bold text-md md:text-lg pr-5">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
        <div className="space-x-3 flex items-center">
          <span
            className="border-2 border-gray-500 p-1 md:p-1.5 rounded-full"
            onClick={() => setIsPaused(!isPaused)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              {isPaused ? (
                <path
                  fill="currentColor"
                  d="M18.54 9 8.88 3.46a3.42 3.42 0 0 0-5.13 3v11.12A3.42 3.42 0 0 0 7.17 21a3.43 3.43 0 0 0 1.71-.46L18.54 15a3.42 3.42 0 0 0 0-5.92Zm-1 4.19-9.66 5.62a1.44 1.44 0 0 1-1.42 0 1.42 1.42 0 0 1-.71-1.23V6.42a1.42 1.42 0 0 1 .71-1.23A1.5 1.5 0 0 1 7.17 5a1.54 1.54 0 0 1 .71.19l9.66 5.58a1.42 1.42 0 0 1 0 2.46Z"
                />
              ) : (
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7c0-1.414 0-2.121.44-2.56C4.878 4 5.585 4 7 4s2.121 0 2.56.44C10 4.878 10 5.585 10 7v10c0 1.414 0 2.121-.44 2.56C9.122 20 8.415 20 7 20s-2.121 0-2.56-.44C4 19.122 4 18.415 4 17zm10 0c0-1.414 0-2.121.44-2.56C14.878 4 15.585 4 17 4s2.121 0 2.56.44C20 4.878 20 5.585 20 7v10c0 1.414 0 2.121-.44 2.56-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44C14 19.122 14 18.415 14 17z"
                  color="currentColor"
                />
              )}
            </svg>
          </span>
          {/* <button
            className="bg-yellow-500 text-white font-medium text-xl px-4 py-2 rounded-md ml-4"
            type="button"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? "Resume" : "Pause"}
          </button> */}
          <button
            className="bg-green-400 text-white text-lg font-medium md:text-xl px-2 py-1 md:px-4 md:py-2 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded mt-5">
        <h2 className="text-2xl font-bold">
          Q{current + 1} : {question}
        </h2>
        <div className="mt-20 sm:pl-8 md:pl-12 mb-24 max-w-md space-y-2">
          {options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className={`w-full text-xl flex items-start px-6 py-2 rounded 
                ${
                  selectedOption === opt
                    ? "bg-blue-600 text-white"
                    : "bg-gray-400 text-black"
                }
                hover:bg-blue-600 hover:text-white`}
              disabled={timeLeft === 0}
            >
              <span className="mr-12">{optionLabels[idx]}</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="w-full mt-12 flex items-center">
          <button
            className="py-2 bg-gray-600 w-1/2 text-2xl flex items-center justify-center"
            type="button"
            onClick={handlePrevious}
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
            >
              <path
                fill="#ffffff"
                d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z"
              />
            </svg>
            Previous
          </button>
          <button
            className="py-2 bg-gray-600 ml-0.5 w-1/2 text-2xl flex items-center justify-center"
            type="button"
            onClick={handleNext}
          >
            Save & Next
            <svg
              className="ml-3"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
            >
              <path
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-7-7 7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
