import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/craveing logo.png";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
            toast.success("Light mode enabled ☀️");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
            toast.success("Dark mode enabled 🌙");
        }
    };

    // Sync state with localStorage
    useEffect(() => {
        const checkUser = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            if (token && userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();

        // Listen for custom login/logout storage changes or page transitions
        window.addEventListener("storage", checkUser);
        
        // Listen to custom navigation changes or custom event
        window.addEventListener("auth-change", checkUser);

        return () => {
            window.removeEventListener("storage", checkUser);
            window.removeEventListener("auth-change", checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/login");
        window.dispatchEvent(new Event("auth-change"));
    };

    return (
        <nav className="bg-[#c74a09] py-2 sticky top-0 z-50 shadow-md">
            <div className="container-fluid px-5">
                <div className="flex items-center justify-between mx-7">
                    <Link to="/" className="transition hover:scale-105 duration-200">
                        <img
                            src={logo}
                            alt="Cravings"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="text-white hover:text-orange-200 transition-all duration-300 p-2 rounded-full cursor-pointer flex items-center justify-center"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? (
                                <i className="bi bi-sun-fill text-xl"></i>
                            ) : (
                                <i className="bi bi-moon-fill text-xl"></i>
                            )}
                        </button>

                        {user ? (
                            <>
                                <Link
                                    to="/user/dashboard"
                                    className="text-white hover:text-orange-200 font-semibold px-3 py-1.5 rounded transition-all duration-300 flex items-center gap-2"
                                >
                                    <i className="bi bi-speedometer2"></i>
                                    <span>Dashboard ({user.name || "User"})</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-[#c74a09] hover:bg-orange-100 font-bold px-4 py-1.5 rounded-full transition-all duration-300 shadow hover:shadow-lg flex items-center gap-1 cursor-pointer"
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white font-medium px-4 py-1.5 rounded transition-all duration-300 hover:outline-1 hover:outline-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-[#c74a09] font-semibold px-4 py-1.5 rounded transition-all duration-300 hover:bg-transparent hover:text-white hover:outline-1 hover:outline-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;