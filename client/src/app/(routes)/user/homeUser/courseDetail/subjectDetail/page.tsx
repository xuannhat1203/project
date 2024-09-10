"use client";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import React, { useEffect, useState } from "react";
import { getAllExams } from "@/services/auth.service";
import { Exam, ExamSubject } from "@/app/interface";
import { useRouter } from "next/navigation";

export default function Page() {
  const [id, setId] = useState<number | null>(null);
  const [listExam, setListExam] = useState<Exam[]>([]);
  const route = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("idExam");
    if (data) {
      setId(JSON.parse(data));
    }
  }, []);

  const fetchData = async () => {
    try {
      const examSubjects = await getAllExams();
      setListExam(examSubjects);
    } catch (error) {
      console.error("Error fetching exam subjects:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToQuestion = (id: number) => {
    localStorage.setItem("idQuestion", JSON.stringify(id));
    route.push("/user/homeUser/courseDetail/subjectDetail/listQuestions");
  };
  const filteredExamSubjects = listExam
    .filter((exam) => exam.examSubjectId === id)
    .filter((exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">ĐỀ THI HOT:</h2>
          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <select className="border rounded px-3 py-2">
              <option>Chọn lớp</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn môn</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn bộ sách</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn chương</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn bài</option>
            </select>
            <button className="bg-teal-500 text-white px-4 py-2 rounded">
              <i className="fas fa-search mr-2" />
            </button>
          </div>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredExamSubjects.map((exam) => (
            <div
              onClick={() => goToQuestion(exam.id)}
              key={exam.id}
              className="bg-teal-500 text-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
              <p className="text-sm">{exam.description}</p>
              <div className="mt-4 text-sm">4 câu hỏi</div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
