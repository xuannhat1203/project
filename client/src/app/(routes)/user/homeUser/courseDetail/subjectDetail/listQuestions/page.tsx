"use client";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import React, { useEffect, useState } from "react";
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
  const [listExam, setListExam] = useState<ExamSubject[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [score, setScore] = useState<number | null>(null);
  const route = useRouter();
  const [listAnswer, setListAnswer] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("idQuestion");
    const data2 = localStorage.getItem("id");
    if (data && data2) {
      setId(JSON.parse(data));
      setUserId(JSON.parse(data2));
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
      const examSubjects = await getAllExams();
      const allQuestions = await getAllQuestion();
      setListExam(examSubjects);
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
    filteredQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);

    await addUserAnswer({
      id: listAnswer.length + 1,
      useId: userId,
      exampId: id,
      score: calculatedScore,
    });

    setTimeout(() => {
      route.push("/user/homeUser");
    }, 5000);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Câu Hỏi:</h2>
          {filteredQuestions.map((question) => (
            <div key={question.id} className="mb-6 p-4 border rounded shadow">
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
                  />
                  <label htmlFor={`question-${question.id}-option-${index}`}>
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
  );
}
