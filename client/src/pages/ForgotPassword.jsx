import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post("/auth/forgot-password", { email });
            toast.success(response?.data?.message || "OTP sent to your email!");
            
            // Navigate to reset password page and pass the email
            navigate("/reset-password", { state: { email } });
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            className="relative flex h-[90vh] items-center px-6 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative left-16 z-10 w-full md:w-[60%] lg:w-[30%]">
                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 p-6 shadow-2xl text-slate-800 dark:text-slate-100">
                    <h1 className="mb-2 text-center text-3xl font-bold text-[#c74a09]">
                        Forgot Password
                    </h1>
                    
                    <p className="mb-6 text-center text-gray-500 dark:text-slate-400">
                        Enter your email to receive a 6-digit OTP to reset your password.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950/20"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mb-5 w-full rounded-md bg-[#c74a09] py-3 font-semibold text-white transition hover:bg-[#b34006] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="font-semibold text-orange-600 transition hover:text-orange-700"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
