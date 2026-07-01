import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";
import {Toaster} from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [validateError, setValidateError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            setValidateError("Please fill all fields");
            return;
        }

        setValidateError("");

        const payload = {
            email: loginData.email.toLowerCase().trim(),
            password: loginData.password,
        };

        try {
            const response = await api.post("/auth/login", payload);
            const user = response?.data?.data;

            localStorage.setItem("token", response?.data?.token || "demo-token");
            localStorage.setItem("user", JSON.stringify(user || {
                name: "Demo User",
                email: payload.email,
                phone: "+1 (555) 019-2834",
                profilePicture: ""
            }));

            toast.success(response?.data?.message || "Login successful");
            window.dispatchEvent(new Event("auth-change"));
            navigate("/user/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    return (
        <section
            className="relative flex h-[90vh] items-center px-6 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Login Card */}
            <div className="relative left-16 z-10 w-full md:w-[60%] lg:w-[30%]">
                <div className="rounded-xl bg-white p-6 shadow-2xl">
                    {/* Heading */}
                    <h1 className="mb-2 text-center text-3xl font-bold text-[#c74a09]">
                        Welcome Back
                    </h1>

                    <p className="mb-6 text-center text-gray-500">
                        Login to your Cravings account
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="mb-2 block font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        {/* Validation Error */}
                        {validateError && (
                            <p className="mb-3 text-sm text-red-500">
                                {validateError}
                            </p>
                        )}

                        {/* Remember + Forgot */}
                        <div className="mb-5 flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-orange-600"
                                />
                                <span>Remember me</span>
                            </label>

                            <Link
                                to="/forgot-password"
                                className="font-medium text-orange-600 transition hover:text-orange-700"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="mb-5 w-full rounded-md bg-[#c74a09] py-3 font-semibold text-white transition hover:bg-[#b34006]"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mb-5 flex items-center gap-3">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-sm text-gray-500">
                            Don't have an account?
                        </span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <Link
                            to="/register"
                            className="font-semibold text-orange-600 transition hover:text-orange-700"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;