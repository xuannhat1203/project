"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaUsers,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
export default function Header() {
  const route = useRouter();
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-07-05_092039-removebg-preview.png?alt=media&token=99a1c0ae-d1ab-4f6c-a3d4-38fa5bae033d"
              alt="logo admin"
              className="w-28 h-14 mr-4"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              Admin Dashboard
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative"></div>
            <FaBell className="text-white text-xl" />
            <span className="text-white">Welcome, Admin</span>
            <img
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
              alt="User Avatar"
              className="rounded-full w-10 h-10"
            />
            <button
              onClick={() => route.push("/auth/login")}
              className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
