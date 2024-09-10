"use client";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import {
  addUserAnswer,
  getAllExams,
  getAllQuestion,
  getAllUserAnswer,
} from "@/services/auth.service";
import { ExamSubject, Question, UserAnswer } from "@/app/interface";
import { useRouter } from "next/navigation";

export default function Page() {
  const [id, setId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [score, setScore] = useState<number | null>(null);
  const route = useRouter();
  const [listAnswer, setListAnswer] = useState<UserAnswer[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [check, setCheck] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("idQuestion");
    const data2 = localStorage.getItem("id");
    const email = localStorage.getItem("status");
    if (data && data2 && email) {
      setId(JSON.parse(data));
      setUserId(JSON.parse(data2));
      setCheck(JSON.parse(email));
    }
  }, []);

  useEffect(() => {
    const getListUserAnswer = async () => {
      const response = await getAllUserAnswer();
      setListAnswer(response);
    };
    getListUserAnswer();
  }, []);

  const fetchExamsAndQuestions = async () => {
    try {
      const allQuestions = await getAllQuestion();
      setQuestions(allQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExamsAndQuestions();
  }, []);

  const filteredQuestions = questions.filter(
    (question) => question.examId === id
  );

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    let incorrect: number[] = [];

    filteredQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) {
        calculatedScore += 1;
      } else {
        incorrect.push(question.id);
      }
    });

    setScore(calculatedScore);
    setIncorrectAnswers(incorrect);

    await addUserAnswer({
      id: listAnswer.length + 1,
      useId: userId,
      exampId: id,
      score: calculatedScore,
    });

    clearInterval(countRef.current as number);

    setTimeout(() => {
      route.push("/user/homeUser");
    }, 5000);
  };

  const [timer, setTimer] = useState(30);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    countRef.current = window.setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countRef.current as number);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (countRef.current !== null) {
        clearInterval(countRef.current);
      }
    };
  }, []);

  return (
    <div>
      {check !== "" ? (
        <div>
          <Header />
          <div className="app">
            <h3
              style={{ textAlign: "center" }}
              className="text-2xl font-bold mb-6 text-center text-gray-800"
            >
              Countdown Timer
            </h3>
            <div className="stopwatch-card bg-blue-100 border border-blue-300 rounded-lg shadow-md p-6 mx-auto max-w-sm">
              <p className="text-3xl font-bold text-blue-700">
                {timer} seconds remaining
              </p>
            </div>
          </div>

          <main className="container mx-auto px-4 py-8">
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Câu Hỏi:</h2>
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className={`mb-6 p-4 border rounded shadow ${
                    incorrectAnswers.includes(question.id)
                      ? "border-red-500"
                      : score !== null
                      ? "border-green-500"
                      : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {question.question}
                  </h3>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        id={`question-${question.id}-option-${index}`}
                        className="mr-2"
                        onChange={() => handleAnswerChange(question.id, option)}
                        disabled={score !== null}
                      />
                      <label
                        htmlFor={`question-${question.id}-option-${index}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md"
                disabled={score !== null}
              >
                Nộp Bài
              </button>
            </div>

            {score !== null && (
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold">
                  Điểm của bạn: {score}/{filteredQuestions.length}
                </h3>
              </div>
            )}
          </main>
          <Footer />
        </div>
      ) : (
        "Bạn cần đăng nhâp"
      )}
    </div>
  );
}
