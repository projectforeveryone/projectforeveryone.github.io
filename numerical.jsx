import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "If a car travels 60 km in 1.5 hours, what is its average speed?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    answer: 1,
  },
  {
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    answer: 2,
  },
  {
    question:
      "If a product originally costs $50 and is discounted by 20%, what is the new price?",
    options: ["$30", "$35", "$40", "$45"],
    answer: 2,
  },
  {
    question: "Solve: 8 × (5 + 2) - 10",
    options: ["36", "46", "56", "66"],
    answer: 0,
  },
  {
    question: "If 3x = 12, what is the value of x?",
    options: ["2", "3", "4", "5"],
    answer: 2,
  },
];

const NumericalReasoningTest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleAnswer = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((q, i) => q.answer === answers[i]);
    setScore(correctAnswers.length);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-red-500 to-orange-400 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Numerical Reasoning Test
      </h1>
      {questions.map((q, i) => (
        <Card key={i} className="mb-4">
          <CardContent>
            <p className="font-semibold mb-2">{q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option, optionIndex) => (
                <Button
                  key={optionIndex}
                  variant={answers[i] === optionIndex ? "default" : "outline"}
                  onClick={() => handleAnswer(i, optionIndex)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button className="mt-4" onClick={calculateScore}>
        Submit
      </Button>
      {score !== null && (
        <p className="mt-4 text-xl text-white">
          Your score: {score} out of {questions.length}
        </p>
      )}
    </div>
  );
};

export default NumericalReasoningTest;
