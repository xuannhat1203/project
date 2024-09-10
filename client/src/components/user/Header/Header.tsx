"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Header() {
  const [email, setEmail] = useState<string>("");
  const route = useRouter();
  const date = dayjs().format("dddd, MMMM D-YYYY");
  useEffect(() => {
    const data = localStorage.getItem("status");
    if (data) {
      setEmail(JSON.parse(data));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("status");
    route.push("/auth/login");
  };
  const goToLogin = () => {
    route.push("/auth/login");
  };
  const goToRegister = () => {
    route.push("/auth/register");
  };
  const goToMainPage = () => {
    route.push("/user/homeUser");
  };
  const goToMyInfor = () => {
    route.push("/user/userDetail");
  };
  const carouselItems = [
    {
      imgPath:
        "https://www.hoasen.edu.vn/tuyensinh/wp-content/uploads/sites/7/2024/01/Banner-4nganh.png",
    },
    {
      imgPath:
        "https://hcmuni.fpt.edu.vn/Data/Sites/1/media/1-2021-huynh-anh/TS%202023/cover-fb-(1).png",
    },
    {
      imgPath:
        "https://bmtu.edu.vn/CMS/Content/Tuyen%20sinh%202021/Chinh%20quy/z2346690037861_4703cf3fd43186eb29b16e8de5e16d39.jpg",
    },
    {
      imgPath:
        "https://ttu.edu.vn/wp-content/uploads/2023/02/banner-web-tuyen-sinh-01-2-1.jpg",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="text-gray-600 text-sm">{date}</div>
            {email === "" ? (
              <div className="space-x-4">
                <a
                  onClick={goToRegister}
                  href="#"
                  className="text-gray-600 text-sm hover:text-gray-800"
                >
                  Đăng ký
                </a>
                <a
                  onClick={goToLogin}
                  href="#"
                  className="text-gray-600 text-sm hover:text-gray-800"
                >
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
            ) : (
              <div>
                <button onClick={goToMyInfor}> Xin Chào {email}</button>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a onClick={goToMainPage} href="#" className="text-3xl font-bold">
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
        <nav
          onClick={handleLogout}
          className="bg-orange-500 w-72 py-4 shadow-md rounded-md"
        >
          <div className="container mx-auto px-4 flex justify-center">
            <h1 className="text-white font-semibold text-lg">Đăng xuất</h1>
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-4 my-8">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="flex justify-center">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  className="rounded-lg shadow-xl transition-transform duration-500 transform hover:scale-105 object-contain w-full h-full"
                  src={item.imgPath}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
