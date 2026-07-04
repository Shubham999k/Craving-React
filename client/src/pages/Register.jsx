import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";

function Register() {
    const [registerData, setRegisterData] = useState({
        role: "Customer",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [validateError, setValidateError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !registerData.fullName ||
            !registerData.email ||
            !registerData.phone ||
            !registerData.password ||
            !registerData.confirmPassword
        ) {
            setValidateError("Please fill all fields");
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setValidateError("Passwords do not match");
            return;
        }

        if (!registerData.termsAccepted) {
            setValidateError("Please accept Terms & Conditions");
            return;
        }

        setValidateError("");

        const payload = {
            role: registerData.role,
            fullName: registerData.fullName.trim(),
            email: registerData.email.toLowerCase().trim(),
            phone: registerData.phone.trim(),
            password: registerData.password,
            dob: new Date(),
            gender: "Not specified",
        };

        try {
            const response = await api.post("/auth/register", payload);

            toast.success(response?.data?.message || "Registration successful");
            setRegisterData((prev) => ({
                ...prev,
                fullName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                termsAccepted: false,
            }));
        } catch (error) {
            console.error(error);
            setValidateError(
                error?.response?.data?.message || "Registration failed. Please try again."
            );
            toast.error(
                error?.response?.data?.message || "Registration failed. Please try again."
            );
        }

        console.log("Register Data:", payload);
    };

    return (
        <section
            className="relative flex h-[90vh] items-center justify-end overflow-hidden bg-cover bg-center px-6"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Register Card */}
            <div className="relative z-10 w-full lg:w-[30%]">
                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 px-5 py-8 shadow-2xl text-slate-800 dark:text-slate-100">
                    <h2 className="mb-1 text-center text-2xl font-bold text-[#c74a09]">
                        Create Account
                    </h2>

                    <p className="mb-4 text-center text-sm text-gray-500 dark:text-slate-400">
                        Join us as a Customer, Restaurant, or Rider
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Role Selection */}
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Register as:
                        </label>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {["Customer", "Restaurant", "Rider"].map(
                                (role) => {
                                    const isSelected = registerData.role === role;
                                    return (
                                        <div
                                            key={role}
                                            onClick={() => setRegisterData(prev => ({ ...prev, role }))}
                                            className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer select-none ${
                                                isSelected
                                                    ? "bg-orange-500/10 border-[#c74a09] text-[#c74a09] dark:text-orange-400 font-extrabold"
                                                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-55/50 dark:hover:bg-slate-750"
                                            }`}
                                        >
                                            <span className="text-[11px] font-bold tracking-tight">{role}</span>
                                            <div className={`w-4.5 h-4.5 shrink-0 rounded border flex items-center justify-center transition-all ${
                                                isSelected 
                                                    ? "bg-[#c74a09] border-white text-white" 
                                                    : "border-slate-300 dark:border-slate-600 bg-transparent"
                                            }`}>
                                                {isSelected && <i className="bi bi-check-lg" style={{ fontSize: '14px', WebkitTextStroke: '0.8px' }}></i>}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* Full Name */}
                        <input
                            type="text"
                            name="fullName"
                            value={registerData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Phone */}
                        <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Confirm Password */}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Validation Error */}
                        {validateError && (
                            <p className="mb-3 text-sm text-red-500">
                                {validateError}
                            </p>
                        )}

                        {/* Terms */}
                        <div className="mb-3 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={registerData.termsAccepted}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                                    registerData.termsAccepted 
                                        ? "bg-[#c74a09] border-white text-white animate-scaleUp" 
                                        : "border-gray-300 dark:border-slate-700 bg-transparent"
                                }`}>
                                    {registerData.termsAccepted && <i className="bi bi-check-lg" style={{ fontSize: '14px', WebkitTextStroke: '0.8px' }}></i>}
                                </div>
                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        onClick={(e) => e.stopPropagation()}
                                        className="font-medium text-orange-600 hover:underline"
                                    >
                                        terms & conditions
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="mb-3 w-full rounded-md bg-[#c74a09] py-2.5 font-semibold text-white transition hover:bg-[#b34006]"
                        >
                            Register
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm">
                        <span className="text-gray-500 dark:text-slate-400">
                            Already registered?
                        </span>{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-orange-600 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Register;