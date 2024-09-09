"use client";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import React, { useEffect, useState } from "react";
import { ExamSubject } from "../../../../interface/index";
import { getAllExamSubjects } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Page() {
  const [id, setId] = useState<number | null>(null);
  const [listExamSubject, setListExamSubject] = useState<ExamSubject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const route = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("id");
    if (data) {
      setId(JSON.parse(data));
    }
  }, []);

  const fetchData = async () => {
    try {
      const examSubjects = await getAllExamSubjects();
      setListExamSubject(examSubjects);
    } catch (error) {
      console.error("Error fetching exam subjects:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredExamSubjects = listExamSubject
    .filter((subject) => subject.courseId === id)
    .filter((subject) =>
      subject.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  // Phan trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubjects = filteredExamSubjects.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredExamSubjects.length / itemsPerPage);

  const comeToExam = (id: number) => {
    localStorage.setItem("idExam", JSON.stringify(id));
    route.push("/user/homeUser/courseDetail/subjectDetail");
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">BÀI THI HOT:</h2>
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
          {paginatedSubjects.map((subject: ExamSubject) => (
            <div
              onClick={() => comeToExam(subject.id)}
              key={subject.id}
              className="bg-teal-500 text-white p-6 rounded-lg shadow-md cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{subject.title}</h3>
              <p className="text-sm">{subject.description}</p>
              <div className="mt-4 text-sm">
                {Math.floor(Math.random() * 100)} bài đề
              </div>
            </div>
          ))}
        </section>
        <section className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="mr-2">Prev</span>
            <i className="fas fa-chevron-left"></i>
          </button>

          <span className="text-gray-800 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <i className="fas fa-chevron-right"></i>
            <span className="ml-2">Next</span>
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
