"use client";
import { getAccAdmin, getAllUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  passWord: string;
  email: string;
  role: number;
  profilePicture: string;
  status: number;
}

export default function Page() {
  const [data, setData] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [acc, setAcc] = useState<{ email: string; passWord: string } | null>(
    null
  );

  const fetchData = async () => {
    try {
      const [users, account] = await Promise.all([getAllUser(), getAccAdmin()]);
      setData(users);
      setAcc(account);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    }
  };
  console.log(acc);

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = () => {
    if (!acc) {
      setError("Dữ liệu chưa được tải.");
      return;
    }
    if (email === acc.email && password === acc.passWord) {
      router.push("/admin/HomeAdmin");
      return;
    }

    const user = data.find((user) => user.email === email);
    if (!user) {
      setError("Sai email. Vui lòng thử lại!");
      return;
    }

    if (user.status === 1) {
      setError("Tài khoản bị chặn. Vui lòng liên hệ với quản trị viên!");
      return;
    }

    if (user.passWord === password) {
      router.push("/user/homeUser");
    } else {
      setError("Sai mật khẩu. Vui lòng thử lại!");
    }
  };

  return (
    <div className="h-screen bg-[#9A616D]">
      <div className="container mx-auto py-5 h-full flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg flex overflow-hidden">
            <div className="hidden md:block md:w-1/2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="p-6 lg:p-8">
                <form>
                  <div className="flex items-center mb-6">
                    <i className="fas fa-cubes text-3xl mr-3 text-[#ff6219]"></i>
                    <span className="text-4xl font-bold">Login</span>
                  </div>

                  <h5 className="text-xl font-normal mb-6 pb-3 tracking-wide">
                    Sign into your account
                  </h5>

                  <div className="relative mb-6">
                    <input
                      type="email"
                      id="email"
                      className="form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="password"
                      id="password"
                      className="form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="mb-4 text-red-600">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <button
                      type="button"
                      className="bg-black text-white py-2 px-4 rounded-lg w-full text-lg"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  <a href="#!" className="text-sm text-gray-600">
                    Forgot password?
                  </a>
                  <p className="text-gray-600 mt-2">
                    Don't have an account?{" "}
                    <a
                      onClick={() => router.push("/auth/register")}
                      href="#!"
                      className="text-indigo-600"
                    >
                      Register here
                    </a>
                  </p>
                  <div className="mt-4">
                    <a href="#!" className="text-sm text-gray-600 mr-4">
                      Terms of use.
                    </a>
                    <a href="#!" className="text-sm text-gray-600">
                      Privacy policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
