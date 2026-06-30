import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import UserDashboard from "./pages/dashboard/UserDashboard";
import { Toaster } from "react-hot-toast";

function App() {
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

            <Footer />
        </>
    );
}

export default App;