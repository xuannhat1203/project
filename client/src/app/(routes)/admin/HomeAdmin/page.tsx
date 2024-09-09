"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { title } from "process";
import {
  addCourse,
  addExam,
  addExamSubject,
  addQuestion,
  addUser,
  deleteCourses,
  deleteExams,
  deleteExamSubjects,
  deleteQuestions,
  getAllCourses,
  getAllExams,
  getAllExamSubjects,
  getAllQuestion,
  getAllUser,
  getAllUserAnswer,
  updateCourses,
  updateExam,
  updateExamSubject,
  updateQuestions,
  updateStatusUser,
} from "@/services/auth.service";
import {
  Course,
  Exam,
  ExamSubject,
  Question,
  User,
  UserAnswer,
} from "@/app/interface";
const itemOfPage = 5;
export default function Page() {
  const [data, setData] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<string>("courses");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newExamSubjectTitle, setNewExamSubjectTitle] = useState("");
  const [newExamSubjectDescription, setNewExamSubjectDescription] =
    useState("");
  const [newExamSubjectCourseId, setNewExamSubjectCourseId] = useState<
    number | ""
  >("");
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamDescription, setNewExamDescription] = useState("");
  const [newExamDuration, setNewExamDuration] = useState<number | "">("");
  const [newExamExamSubjectId, setNewExamExamSubjectId] = useState<number | "">(
    ""
  );

  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionExamId, setNewQuestionExamId] = useState<number | "">("");
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([""]);
  const [newQuestionAnswer, setNewQuestionAnswer] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [statusButton2, setStatusButton2] = useState(false);
  const [statusButton3, setStatusButton3] = useState(false);
  const [statusButton4, setStatusButton4] = useState(false);
  const [statusButton5, setStatusButton5] = useState(false);
  const [id, setId] = useState(1);
  const [listUser, setListUser] = useState<User[]>([]);
  const [listExam, setListExam] = useState<Exam[]>([]);
  const [listExamSubject, setListExamSubject] = useState<ExamSubject[]>([]);
  const [listQuestion, setListQuestion] = useState<Question[]>([]);
  const [listAnswer, setListAnswer] = useState<UserAnswer[]>([]);
  const fetchData = async () => {
    try {
      const [courses, users, examSubjects, exams, questions, userAnswers] =
        await Promise.all([
          getAllCourses(),
          getAllUser(),
          getAllExamSubjects(),
          getAllExams(),
          getAllQuestion(),
          getAllUserAnswer(),
        ]);

      setData(courses);
      setListUser(users);
      setListExamSubject(examSubjects);
      setListExam(exams);
      setListQuestion(questions);
      setListAnswer(userAnswers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  if (!data) {
    return <div className="text-center p-4">Loading...</div>;
  }
  const filteredUsers = listUser.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const searchItem = () => {};
  // ADD
  const addCourses = async () => {
    try {
      await addCourse({
        title: newCourseTitle,
        description: newCourseDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addExamSubjects = async () => {
    try {
      await addExamSubject({
        title: newExamSubjectTitle,
        description: newExamSubjectDescription,
        courseId: newExamSubjectCourseId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addExams = async () => {
    try {
      await addExam({
        title: newExamTitle,
        description: newExamDescription,
        duration: newExamDuration,
        examSubjectId: newExamExamSubjectId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestions = async () => {
    try {
      await addQuestion({
        question: newQuestion,
        examId: newQuestionExamId,
        options: newQuestionOptions,
        answer: newQuestionAnswer,
      });
    } catch (error) {
      console.log("Error adding question:", error);
    }
  };

  const addUsers = async () => {
    try {
      await addUser({
        id: listUser.length + 1,
        username: userName,
        email: email,
        password: passWord,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Edit
  const handleLock = async (id: number) => {
    const find = listUser.find((user: any) => user.id === id);

    if (find) {
      const updatedStatus = find.status === 0 ? 1 : 0;
      try {
        await updateStatusUser({
          id: id,
          status: updatedStatus,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemOfPage);

  const handlePageChange = (pageNumber: any) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * itemOfPage;
    const endIndex = startIndex + itemOfPage;
    return filteredUsers.slice(startIndex, endIndex);
  };
  // Xóa
  const deleteCourse = async (id: number) => {
    try {
      const response = await deleteCourses(id);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const deleteExamSubject = async (id: number) => {
    try {
      const response = await deleteExamSubjects(id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExam = async (id: number) => {
    try {
      const response = await deleteExams(id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      const response = await deleteQuestions(id);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit

  const editCourse = async (id: number) => {
    try {
      const course = data.find((course: any) => course.id === id);
      if (course) {
        setNewCourseTitle(course.title);
        setNewCourseDescription(course.description);
        setId(course.id);
        setStatusButton(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const btnEditCourse = async () => {
    const course = data.find((course: any) => course.id === id);
    if (course) {
      try {
        await updateCourses({
          id: course.id,
          title: newCourseTitle,
          description: newCourseDescription,
          type: "course",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editExamSubject = async (id: number) => {
    const find = listExamSubject.find((course: any) => course.id === id);
    if (find) {
      setId(find.id);
      setStatusButton2(true);
      setNewExamSubjectTitle(find.title);
      setNewExamSubjectDescription(find.description);
      setNewExamSubjectCourseId(find.id);
    }
  };

  const btnEditExamSubject = async () => {
    const examSubject = listExamSubject.find((course: any) => course.id === id);
    if (examSubject) {
      try {
        await updateExamSubject({
          id: examSubject.id,
          title: newExamSubjectTitle,
          description: newExamSubjectDescription,
          courseId: newExamSubjectCourseId,
        });
      } catch (error) {
        console.error("Error updating exam subject:", error);
      }
    } else {
      console.warn(`Exam subject with id ${id} not found.`);
    }
  };

  const editExam = async (id: number) => {
    const find = listExam.find((course: any) => course.id === id);
    if (find) {
      setId(find.id);
      setStatusButton3(true);
      setNewExamTitle(find.title);
      setNewExamDescription(find.description);
      setNewExamDuration(find.duration);
    }
  };

  const btnEditExam = async () => {
    const exam = listExam.find((course: any) => course.id === id);
    if (exam) {
      try {
        await updateExam({
          id: exam.id,
          title: newExamTitle,
          description: newExamDescription,
          duration: newExamDuration,
        });
      } catch (error) {
        console.error("Error updating exam:", error);
      }
    } else {
      console.warn(`Exam with id ${id} not found.`);
    }
  };

  const editQuestion = async (id: number) => {
    const find = listQuestion.find((course: any) => course.id === id);
    if (find) {
      setId(find.id);
      setStatusButton4(true);
      setNewQuestion(find.question);
      setNewQuestionOptions(find.options);
      setNewQuestionAnswer(find.answer);
      setNewQuestionExamId(find.examId);
    }
  };

  const btnEditQuestion = async () => {
    const question = listQuestion.find((course: any) => course.id === id);
    if (question) {
      try {
        await updateQuestions({
          id: question.id,
          question: newQuestion,
          options: newQuestionOptions,
          answer: newQuestionAnswer,
          examId: newQuestionExamId,
        });
      } catch (error) {
        console.error("Error updating question:", error);
      }
    } else {
      console.warn(`Question with id ${id} not found.`);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Header />
      <div className="mb-6 flex space-x-4 border-b border-gray-300 pb-4">
        {[
          "courses",
          "examSubjects",
          "exams",
          "questions",
          "userAnswers",
          "users",
        ].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() +
              tab.slice(1).replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {activeTab === "users" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Add New Users</h3>
            <label className="block mb-1">UserName</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="UserName"
            />
            <label className="block mb-1">Email</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <label className="block mb-1">PassWord</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              placeholder="Password"
            />
            <button
              onClick={addUsers}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add User
            </button>
            <h3 className="text-xl font-semibold mt-4 mb-2">Search Users</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by username or email"
            />
            <button onClick={searchItem}>Search</button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">UserName</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">PassWord</th>
                <th colSpan={2} className="py-3 px-4 border-b text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedUsers().map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.username}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.passWord}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button onClick={() => handleLock(item.id)}>
                      {item.status === 0 ? (
                        <FontAwesomeIcon icon={faLock} />
                      ) : (
                        <FontAwesomeIcon icon={faLockOpen} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}

      {activeTab === "examSubjects" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Exam Subjects</h1>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Add New Exam Subject</h3>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newExamSubjectTitle}
              onChange={(e) => setNewExamSubjectTitle(e.target.value)}
              placeholder="Exam Subject Title"
            />
            <label className="block mb-1">Description</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newExamSubjectDescription}
              onChange={(e) => setNewExamSubjectDescription(e.target.value)}
              placeholder="Exam Subject Description"
            />
            <label className="block mb-1">Course ID</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={
                newExamSubjectCourseId === "" ? "" : newExamSubjectCourseId
              }
              onChange={(e) =>
                setNewExamSubjectCourseId(Number(e.target.value))
              }
              placeholder="Course ID"
            />
            {statusButton2 === false ? (
              <button
                onClick={addExamSubjects}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Exam Subject
              </button>
            ) : (
              <button
                onClick={btnEditExamSubject}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Exam Subject
              </button>
            )}
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Title</th>
                <th className="py-3 px-4 border-b text-left">Description</th>
                <th className="py-3 px-4 border-b text-left">Course ID</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listExamSubject.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b">{item.courseId}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button onClick={() => editExamSubject(item.id)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-600 cursor-pointer hover:text-blue-700"
                      />
                    </button>
                    <button onClick={() => deleteExamSubject(item.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-600 cursor-pointer hover:text-red-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "courses" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Courses</h1>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              {isEditing ? "Edit Course" : "Add New Course"}
            </h3>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              placeholder="Course Title"
            />
            <label className="block mb-1">Description</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newCourseDescription}
              onChange={(e) => setNewCourseDescription(e.target.value)}
              placeholder="Course Description"
            />
            {statusButton === false ? (
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={addCourses}
              >
                Add Course
              </button>
            ) : (
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={btnEditCourse}
              >
                Edit Button
              </button>
            )}
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Title</th>
                <th className="py-3 px-4 border-b text-left">Description</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button onClick={() => editCourse(item.id)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-600 cursor-pointer hover:text-blue-700"
                      />
                    </button>
                    <button onClick={() => deleteCourse(item.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-600 cursor-pointer hover:text-red-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "exams" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Exams</h1>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Add New Exam</h3>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newExamTitle}
              onChange={(e) => setNewExamTitle(e.target.value)}
              placeholder="Exam Title"
            />
            <label className="block mb-1">Description</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newExamDescription}
              onChange={(e) => setNewExamDescription(e.target.value)}
              placeholder="Exam Description"
            />
            <label className="block mb-1">Duration</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newExamDuration === "" ? "" : newExamDuration}
              onChange={(e) => setNewExamDuration(Number(e.target.value))}
              placeholder="Duration (minutes)"
            />
            {statusButton3 === false ? (
              <button
                onClick={addExams}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Exam
              </button>
            ) : (
              <button
                onClick={btnEditExam}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Exam
              </button>
            )}
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Title</th>
                <th className="py-3 px-4 border-b text-left">Description</th>
                <th className="py-3 px-4 border-b text-left">Duration</th>
                <th className="py-3 px-4 border-b text-left">
                  Exam Subject ID
                </th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listExam.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">{item.description}</td>
                  <td className="py-2 px-4 border-b">{item.duration}</td>
                  <td className="py-2 px-4 border-b">{item.examSubjectId}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button onClick={() => editExam(item.id)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-600 cursor-pointer hover:text-blue-700"
                      />
                    </button>
                    <button onClick={() => deleteExam(item.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-600 cursor-pointer hover:text-red-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "questions" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Questions</h1>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Add New Question</h3>
            <label className="block mb-1">Question</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question"
            />
            <label className="block mb-1">Exam ID</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newQuestionExamId === "" ? "" : newQuestionExamId}
              onChange={(e) => setNewQuestionExamId(Number(e.target.value))}
              placeholder="Exam ID"
            />
            <label className="block mb-1">Options</label>
            {newQuestionOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                value={option}
                onChange={(e) => {
                  const options = [...newQuestionOptions];
                  options[index] = e.target.value;
                  setNewQuestionOptions(options);
                }}
                placeholder={`Option ${index + 1}`}
              />
            ))}

            <button
              onClick={() => setNewQuestionOptions([...newQuestionOptions, ""])}
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Add Option
            </button>

            <label className="block mb-1">Answer</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newQuestionAnswer}
              onChange={(e) => setNewQuestionAnswer(e.target.value)}
              placeholder="Answer"
            />
            {statusButton4 === false ? (
              <button
                onClick={addQuestions}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Question
              </button>
            ) : (
              <button
                onClick={btnEditQuestion}
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Edit Option
              </button>
            )}
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Question</th>
                <th className="py-3 px-4 border-b text-left">Exam ID</th>
                <th className="py-3 px-4 border-b text-left">Options</th>
                <th className="py-3 px-4 border-b text-left">Answer</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listQuestion.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.question}</td>
                  <td className="py-2 px-4 border-b">{item.examId}</td>
                  <td className="py-2 px-4 border-b">
                    {item.options.map((option, index) => (
                      <div key={index}>{option}</div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">{item.answer}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button onClick={() => editQuestion(item.id)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-600 cursor-pointer hover:text-blue-700"
                      />
                    </button>
                    <button onClick={() => deleteQuestion(item.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-600 cursor-pointer hover:text-red-700"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "userAnswers" && (
        <>
          <h1 className="text-2xl font-bold mb-4">User Answers</h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">User ID</th>
                <th className="py-3 px-4 border-b text-left">Exam ID</th>
                <th className="py-3 px-4 border-b text-left">Score</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listAnswer.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.useId}</td>
                  <td className="py-2 px-4 border-b">{item.exampId}</td>
                  <td className="py-2 px-4 border-b">{item.score}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-blue-600 cursor-pointer hover:text-blue-700"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-600 cursor-pointer hover:text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
