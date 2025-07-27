import { useState } from "react";
import questions from "../mock/question";
import QuestionCard from "./QuestionCard";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions?.length).fill(null)
  );

  const handleSelect = (selected) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[current] = selected;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (current < questions?.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate score at end
      const finalScore = selectedAnswers.reduce((acc, ans, index) => {
        return ans === questions[index].answer ? acc + 1 : acc;
      }, 0);
      setScore(finalScore);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = () => {
    const finalScore = selectedAnswers.reduce((acc, ans, index) => {
      return ans === questions[index].answer ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    setShowResult(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {showResult ? (
        <div className="bg-white shadow rounded text-center py-20">
          <h1 className="text-2xl font-bold">Quiz Completed!</h1>
          <p className="mt-4">
            Your Score: {score} / {questions?.length}
          </p>
        </div>
      ) : (
        <QuestionCard
          question={questions[current].question}
          options={questions[current].options}
          selected={selectedAnswers[current]} // <-- pass selected option
          onSelect={handleSelect}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          current={current}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Quiz;
