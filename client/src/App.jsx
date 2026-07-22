import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import UserDashboard from "./pages/dashboard/UserDashboard";
import RestaurantDetails from "./pages/RestaurantDetails";
import OrderPage from "./pages/OrderPage";
import About from "./pages/About";
import PartnerWithUs from "./pages/PartnerWithUs";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import BecomeRider from "./pages/BecomeRider";
import RiderDashboard from "./pages/RiderDashboard";
import Feedback from "./pages/Feedback";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsServices from "./pages/TermsServices";
import SiteMap from "./pages/SiteMap";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

function App() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/user/dashboard") || 
                        location.pathname.startsWith("/restaurants-dashboard") || 
                        location.pathname.startsWith("/riders-dashboard") ||
                        location.pathname.startsWith("/admin-dashboard");

    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= 1) // limit to 1 active toast
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    // Initialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const scrollContainerRef = React.useRef(null);

    // Scroll to top on route change
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Toaster />
            <Navbar />

            <div ref={scrollContainerRef} className={`flex-1 overflow-y-auto ${location.pathname === "/" ? "scrollbar-none" : ""}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/restaurant" element={<PartnerWithUs />} />
                    <Route path="/restaurants-dashboard" element={<RestaurantDashboard />} />
                    <Route path="/rider" element={<BecomeRider />} />
                    <Route path="/riders-dashboard" element={<RiderDashboard />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-services" element={<TermsServices />} />
                    <Route path="/site-map" element={<SiteMap />} />
                </Routes>

                {!isDashboard && <Footer />}
            </div>
        </div>
    );
}

export default App;