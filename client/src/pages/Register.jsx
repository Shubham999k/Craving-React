import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";

const styles = {
    section: "relative flex h-[90vh] items-center justify-end overflow-hidden bg-cover bg-center px-6",
    overlay: "absolute inset-0 bg-black/40",
    cardWrapper: "relative z-10 w-full lg:w-[30%]",
    card: "rounded-xl bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 px-5 py-8 shadow-2xl text-slate-800 dark:text-slate-100",
    heading: "mb-1 text-center text-2xl font-bold text-[#c74a09]",
    subHeading: "mb-4 text-center text-sm text-gray-500 dark:text-slate-400",
    form: {
        roleLabel: "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300",
        roleGrid: "grid grid-cols-3 gap-2 mb-4",
        roleCardBase: "flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer select-none",
        roleCardActive: "bg-orange-500/10 border-[#c74a09] text-[#c74a09] dark:text-orange-400 font-extrabold",
        roleCardInactive: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-700/50",
        roleText: "text-[11px] font-bold tracking-tight",
        roleCheckboxBase: "w-4.5 h-4.5 shrink-0 rounded border flex items-center justify-center transition-all",
        roleCheckboxActive: "bg-[#c74a09] border-white text-white",
        roleCheckboxInactive: "border-slate-300 dark:border-slate-600 bg-transparent",
        input: "mb-2 w-full rounded-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 outline-none focus:border-orange-500",
        error: "mb-3 text-sm text-red-500",
        termsWrapper: "mb-3 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300",
        termsLabel: "flex items-center gap-2 cursor-pointer select-none",
        checkboxWrapperBase: "w-4.5 h-4.5 rounded border flex items-center justify-center transition-all",
        checkboxActive: "bg-[#c74a09] border-white text-white animate-scaleUp",
        checkboxInactive: "border-gray-300 dark:border-slate-700 bg-transparent",
        termsLink: "font-medium text-orange-600 hover:underline",
        submitBtn: "mb-3 w-full rounded-md bg-[#c74a09] py-2.5 font-semibold text-white transition hover:bg-[#b34006]"
    },
    login: {
        wrapper: "text-center text-sm",
        text: "text-gray-500 dark:text-slate-400",
        link: "font-semibold text-orange-600 hover:underline"
    }
};

function Register() {
    const navigate = useNavigate();
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
            
            // Auto-login locally so the dashboard displays their name
            localStorage.setItem("user", JSON.stringify({
                name: payload.fullName,
                email: payload.email,
                phone: payload.phone,
                role: payload.role
            }));
            window.dispatchEvent(new Event("auth-change"));

            // Redirect based on selected role
            if (payload.role === "Restaurant") {
                navigate("/restaurants-dashboard");
            } else if (payload.role === "Rider") {
                navigate("/riders-dashboard");
            } else {
                navigate("/user/dashboard");
            }

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
            className={styles.section}
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {/* Overlay */}
            <div className={styles.overlay}></div>

            {/* Register Card */}
            <div className={styles.cardWrapper}>
                <div className={styles.card}>
                    <h2 className={styles.heading}>
                        Create Account
                    </h2>

                    <p className={styles.subHeading}>
                        Join us as a Customer, Restaurant, or Rider
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Role Selection */}
                        <label className={styles.form.roleLabel}>
                            Register as:
                        </label>

                        <div className={styles.form.roleGrid}>
                            {["Customer", "Restaurant", "Rider"].map(
                                (role) => {
                                    const isSelected = registerData.role === role;
                                    return (
                                        <div
                                            key={role}
                                            onClick={() => setRegisterData(prev => ({ ...prev, role }))}
                                            className={`${styles.form.roleCardBase} ${
                                                isSelected
                                                    ? styles.form.roleCardActive
                                                    : styles.form.roleCardInactive
                                            }`}
                                        >
                                            <span className={styles.form.roleText}>{role}</span>
                                            <div className={`${styles.form.roleCheckboxBase} ${
                                                isSelected 
                                                    ? styles.form.roleCheckboxActive 
                                                    : styles.form.roleCheckboxInactive
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
                            className={styles.form.input}
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={styles.form.input}
                        />

                        {/* Phone */}
                        <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={styles.form.input}
                        />

                        {/* Password */}
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={styles.form.input}
                        />

                        {/* Confirm Password */}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={styles.form.input}
                        />

                        {/* Validation Error */}
                        {validateError && (
                            <p className={styles.form.error}>
                                {validateError}
                            </p>
                        )}

                        {/* Terms */}
                        <div className={styles.form.termsWrapper}>
                            <label className={styles.form.termsLabel}>
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={registerData.termsAccepted}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`${styles.form.checkboxWrapperBase} ${
                                    registerData.termsAccepted 
                                        ? styles.form.checkboxActive 
                                        : styles.form.checkboxInactive
                                }`}>
                                    {registerData.termsAccepted && <i className="bi bi-check-lg" style={{ fontSize: '14px', WebkitTextStroke: '0.8px' }}></i>}
                                </div>
                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        onClick={(e) => e.stopPropagation()}
                                        className={styles.form.termsLink}
                                    >
                                        terms & conditions
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className={styles.form.submitBtn}
                        >
                            Register
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className={styles.login.wrapper}>
                        <span className={styles.login.text}>
                            Already registered?
                        </span>{" "}
                        <Link
                            to="/login"
                            className={styles.login.link}
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