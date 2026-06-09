import { Link } from "react-router-dom";
import footerLogo from "../assets/images/circleLogo-DpCri5UD.png";

function Footer() {
    const footerLink =
        "text-gray-300 transition-colors duration-200 hover:text-orange-600";

    const bottomLink =
        "text-sm text-gray-400 transition-colors duration-200 hover:text-orange-600";

    return (
        <footer className="bg-[#1f1f1f] py-8 text-white">
            <div className="mx-auto max-w-7xl px-4">

                {/* Top Text */}
                <p className="mb-10 text-center text-sm font-light text-gray-300">
                    --- Your favorite food delivery platform connecting customers
                    with restaurants and riders. ---
                </p>

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

                    {/* Logo */}
                    <div>
                        <img
                            src={footerLogo}
                            alt="Cravings Logo"
                            className="mb-3 h-24 w-auto"
                        />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h5>

                        <div className="flex flex-col gap-2">
                            <Link to="/" className={footerLink}>
                                Home
                            </Link>

                            <Link to="/about" className={footerLink}>
                                About
                            </Link>

                            <Link to="/order" className={footerLink}>
                                Order Now
                            </Link>
                        </div>
                    </div>

                    {/* Restaurants */}
                    <div>
                        <h5 className="mb-4 text-lg font-semibold">
                            For Restaurants
                        </h5>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/restaurant"
                                className={footerLink}
                            >
                                Partner With Us
                            </Link>

                            <Link
                                to="/restaurants-dashboard"
                                className={footerLink}
                            >
                                Restaurant Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Riders */}
                    <div>
                        <h5 className="mb-4 text-lg font-semibold">
                            For Riders
                        </h5>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/rider"
                                className={footerLink}
                            >
                                Become a Rider
                            </Link>

                            <Link
                                to="/riders-dashboard"
                                className={footerLink}
                            >
                                Rider Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Feedback & Support */}
                    <div>
                        <h5 className="mb-4 text-lg font-semibold">
                            Feedback & Support
                        </h5>

                        <div className="flex flex-col gap-2">
                            <Link
                                to="/feedback"
                                className={footerLink}
                            >
                                Submit Feedback
                            </Link>

                            <Link
                                to="/help-center"
                                className={footerLink}
                            >
                                Help Center
                            </Link>

                            <Link
                                to="/contact-us"
                                className={footerLink}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-8 border-t border-gray-700"></div>

                {/* Bottom Footer */}
                <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">

                    <p className="text-sm text-gray-400">
                        © 2026 Cravings. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/privacy-policy"
                            className={bottomLink}
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms-services"
                            className={bottomLink}
                        >
                            Terms of Service
                        </Link>

                        <Link
                            to="/site-map"
                            className={bottomLink}
                        >
                            Site Map
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer; 