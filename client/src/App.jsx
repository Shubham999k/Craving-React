import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import UserDashboard from "./pages/dashboard/UserDashboard";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

function App() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/user/dashboard");

    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= 1) // limit to 1 active toast
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    return (
        <>
            <Toaster />
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />
            </Routes>

            {!isDashboard && <Footer />}
        </>
    );
}

export default App;