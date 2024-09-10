"use client";
import { User, UserAnswer } from "@/app/interface";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import {
  getAllUser,
  getAllUserAnswer,
  updateAccount,
} from "@/services/auth.service";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [listUser, setListUser] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);
  const [exam, setExam] = useState<UserAnswer[]>([]);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(userDetail?.username || "");
  const [newPassword, setNewPassword] = useState(userDetail?.passWord || "");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUser();
        const examData = await getAllUserAnswer();
        setListUser(users);
        setExam(examData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("status");
    if (data) {
      const parsedData = JSON.parse(data);
      const foundUser = listUser.find((user) => user.email === parsedData);
      if (foundUser) {
        setUserDetail(foundUser);
        setNewName(foundUser.username);
        setNewPassword(foundUser.passWord);
      }
      setEmail(parsedData);
    }
  }, [listUser]);

  const userExams = exam.filter((item) => item.useId === userDetail?.id);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetail) {
      const updatedUserDetail = {
        ...userDetail,
        username: newName,
        passWord: newPassword,
      };

      setUserDetail(updatedUserDetail);
      updateAccount(updatedUserDetail);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <br />
      <main className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <button
            onClick={() => setShowPersonalInfo(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out mr-4"
          >
            Hiện thông tin cá nhân
          </button>
          <button
            onClick={() => setShowPersonalInfo(false)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Hiện các bài thi đã làm
          </button>
        </div>
        {showPersonalInfo ? (
          userDetail ? (
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Thông tin cá nhân
              </h1>
              <div className="flex items-center space-x-4">
                {userDetail.profilePicture && (
                  <div className="flex-shrink-0">
                    <Image
                      src={userDetail.profilePicture}
                      alt="Profile Picture"
                      width={120}
                      height={120}
                      className="rounded-full border border-gray-300 shadow-md"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Email:</strong> {userDetail.email}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>UserName:</strong> {userDetail.username}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>PassWord:</strong> {userDetail.passWord}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditClick}
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Edit Button
              </button>
            </div>
          ) : (
            <p className="text-gray-600">No user found</p>
          )
        ) : userExams.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border-b p-4 text-left text-gray-600">Lần</th>
                <th className="border-b p-4 text-left text-gray-600">
                  Bài thi đã làm
                </th>
                <th className="border-b p-4 text-left text-gray-600">
                  Số điểm đạt được
                </th>
              </tr>
            </thead>
            <tbody>
              {userExams.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">{item.exampId}</td>
                  <td className="border-b p-4">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">Chưa làm bài thi nào</p>
        )}
      </main>
      <br />
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa thông tin</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Tên người dùng mới
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-300 ease-in-out"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
