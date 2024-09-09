"use client";
import { addUser, getAllUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const route = useRouter();
  const [data, setData] = useState<any>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const fetchData = async () => {
    try {
      const result = await getAllUser();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    const { name, email, password, confirmPassword } = formData;

    if (!name) newErrors.name = "Full Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await addUser({
          id: data.length + 1,
          username: name,
          email: email,
          passWord: password,
          role: 1,
          profilePicture:
            "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
          status: 0,
        });
        route.push("/auth/login");
      } catch (error) {
        console.error("Error registering new user:", error);
      }
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
                alt="register form"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center mb-3 pb-1">
                    <i
                      className="fas fa-cubes fa-2x me-3"
                      style={{ color: "#ff6219" }}
                    ></i>
                    <span className="h1 fw-bold mb-0">Register</span>
                  </div>

                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Create your account
                  </h5>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Full Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-black text-white py-2 px-4 rounded-lg w-full text-lg"
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-gray-600 mt-2">
                    Already have an account?{" "}
                    <a
                      onClick={() => route.push("/auth/login")}
                      href="#!"
                      className="text-indigo-600"
                    >
                      Login here
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
