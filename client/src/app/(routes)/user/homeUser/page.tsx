"use client";
import { ExamSubject } from "@/app/interface";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import { getAllCourses, getAllExamSubjects } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
}

const colors = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
];

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [listExam, setListExam] = useState<ExamSubject[]>([]);
  const fetchData = async () => {
    try {
      const result = await getAllCourses();
      const getExam = await getAllExamSubjects();
      setListExam(getExam);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load courses.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chooseCourse = (id: number) => {
    localStorage.setItem("id", JSON.stringify(id));
    router.push("/user/homeUser/courseDetail");
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">BÀI THI HOT:</h2>
          <div className="flex space-x-4">
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
          {error && (
            <div className="text-red-600 mb-4">
              <p>{error}</p>
            </div>
          )}
          {data.length > 0 ? (
            data.map((course) => {
              const randomColorClass =
                colors[Math.floor(Math.random() * colors.length)];
              const find = listExam.filter(
                (exam: any) => exam.courseId === course.id
              );
              return (
                <div
                  onClick={() => chooseCourse(course.id)}
                  key={course.id}
                  className={`${randomColorClass} text-white p-6 rounded-lg shadow-md cursor-pointer`}
                >
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm">{course.description}</p>
                  <div className="mt-4 text-sm">{find.length} bài đề</div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">No courses available.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
