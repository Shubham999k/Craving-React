import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/foodTable.webp";
import api from "../config/api.config.js";



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