import React, { useState } from "react";
import { Card, CardContent } from "./ui/components/card";
import { Button } from "./ui/components/button";
import quizData from "./data/quizData";


export default function QuizApp() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAnswer = (optionIndex) => {
    setSelected(optionIndex);
    if (optionIndex === quizData[currentQ].answerIndex) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900"
      } flex justify-center items-center min-h-screen p-4 transition-colors`}
    >
      <Card
        className={`w-full max-w-6xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Quiz App</h1>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-1 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
        <CardContent>
          {!finished ? (
            <div className="space-y-6">
              {/* Long question handling */}
              <h2
                className={`text-lg sm:text-xl font-bold leading-relaxed ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Q{currentQ + 1}. {quizData[currentQ].question}
              </h2>
              <div className="grid gap-3">
                {quizData[currentQ].options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full py-3 px-4 rounded-xl text-left text-lg font-semibold tracking-wide transition-all duration-300
                      ${
                        selected === idx
                          ? idx === quizData[currentQ].answerIndex
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                          : darkMode
                          ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                      }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <p
                className={`text-sm opacity-70 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Question {currentQ + 1} of {quizData.length}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Quiz Finished 🎉
              </h2>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your Score: {score} / {quizData.length}
              </p>
              <Button
                onClick={() => {
                  setCurrentQ(0);
                  setScore(0);
                  setFinished(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl mt-4"
              >
                Restart Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
