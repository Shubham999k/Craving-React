import React, { useState } from "react";
import { Link } from "react-router-dom";
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
            alert(response?.data?.message || "Registration successful");
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
                <div className="rounded-xl bg-white px-5 py-8 shadow-2xl">
                    <h2 className="mb-1 text-center text-2xl font-bold text-[#c74a09]">
                        Create Account
                    </h2>

                    <p className="mb-4 text-center text-sm text-gray-500">
                        Join us as a Customer, Restaurant, or Rider
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Role Selection */}
                        <label className="mb-2 block text-sm font-medium">
                            Register as:
                        </label>

                        <div className="mb-3 flex flex-wrap gap-4 text-sm">
                            {["Customer", "Restaurant", "Rider"].map(
                                (role) => (
                                    <label
                                        key={role}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role}
                                            checked={
                                                registerData.role === role
                                            }
                                            onChange={handleChange}
                                            className="accent-orange-600"
                                        />
                                        {role}
                                    </label>
                                )
                            )}
                        </div>

                        {/* Full Name */}
                        <input
                            type="text"
                            name="fullName"
                            value={registerData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Phone */}
                        <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Confirm Password */}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                        />

                        {/* Validation Error */}
                        {validateError && (
                            <p className="mb-3 text-sm text-red-500">
                                {validateError}
                            </p>
                        )}

                        {/* Terms */}
                        <div className="mb-3 flex items-center gap-2 text-xs">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={registerData.termsAccepted}
                                onChange={handleChange}
                                className="accent-orange-600"
                            />

                            <span>
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="font-medium text-orange-600 hover:underline"
                                >
                                    terms & conditions
                                </a>
                            </span>
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
                        <span className="text-gray-500">
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