import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!email) {
            toast.error("Please request an OTP first");
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        // Allow only the last entered digit
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move focus to next input if there's a value
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move focus to previous input on backspace if current is empty
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const otpString = otp.join("");

        if (otpString.length !== 6 || !password || !confirmPassword) {
            toast.error("Please fill all fields completely");
            return;
        }
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post(`/auth/reset-password`, { email, otp: otpString, password });
            toast.success(response?.data?.message || "Password reset successfully");
            
            // Redirect to login after a short delay
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to reset password. OTP may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) return null; // Prevent rendering if redirecting

    return (
        <section
            className="relative flex h-[90vh] items-center px-6 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative left-16 z-10 w-full md:w-[60%] lg:w-[30%]">
                <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 p-6 shadow-2xl text-slate-800 dark:text-slate-100">
                    <h1 className="mb-2 text-center text-3xl font-bold text-[#c74a09]">
                        Set New Password
                    </h1>
                    
                    <p className="mb-6 text-center text-gray-500 dark:text-slate-400">
                        Enter the 6-digit OTP sent to <span className="font-semibold text-orange-600">{email}</span> and your new password.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
                                OTP Code
                            </label>
                            <div className="flex justify-between gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-2xl font-bold rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950/20"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950/20"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950/20"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mb-5 w-full rounded-md bg-[#c74a09] py-3 font-semibold text-white transition hover:bg-[#b34006] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link
                            to="/forgot-password"
                            className="font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                        >
                            Back to send OTP
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResetPassword;
