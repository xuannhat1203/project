import React from "react";

export default function Header() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="text-gray-600 text-sm">Thứ sáu, 06/09/2024</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-600 text-sm hover:text-gray-800">
                Đăng ký
              </a>
              <a href="#" className="text-gray-600 text-sm hover:text-gray-800">
                Đăng nhập
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-3xl font-bold">
              <span className="text-teal-500">vietBook</span>
              <span className="text-orange-500">thiOnline</span>
            </a>
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn muốn tìm gì?"
                className="w-64 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Search"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500"
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <nav className="bg-orange-500">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-6 text-white py-2">
              <li>
                <a href="#" className="hover:underline">
                  Thi Online
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Thư Viện
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
