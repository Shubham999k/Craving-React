import { Link } from "react-router-dom";
import footerLogo from "../assets/images/circleLogo-DpCri5UD.png";

function Footer() {
    return (
        <footer className="footer-section py-4">

            <div className="container">

                <p className="text-center fw-light mb-5 footer-top-text">
                    --- Your favorite food delivery platform connecting customers
                    with restaurants and riders. ---
                </p>

                <div className="row text-md-start px-lg-4">

                    <div className="col-lg-2 col-md-12 me-lg-4">

                        <img
                            className="footer-logo img-fluid mb-3"
                            src={footerLogo}
                            alt="Cravings Logo"
                        />

                    </div>

                    <div className="col-lg-2 col-md-6 col-6">

                        <h5 className="footer-heading">
                            Quick Links
                        </h5>

                        <Link
                            to="/"
                            className="footer-link"
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className="footer-link"
                        >
                            About
                        </Link>

                        <Link
                            to="/order"
                            className="footer-link"
                        >
                            Order Now
                        </Link>

                    </div>

                    <div className="col-lg-3 col-md-6 col-6">

                        <h5 className="footer-heading">
                            For Restaurants
                        </h5>

                        <Link
                            to="/restaurant"
                            className="footer-link"
                        >
                            Partner With Us
                        </Link>

                        <Link
                            to="/restaurants-dashboard"
                            className="footer-link"
                        >
                            Restaurant Dashboard
                        </Link>

                    </div>

                    <div className="col-lg-2 col-md-6 col-6 mt-md-4 mt-lg-0">

                        <h5 className="footer-heading">
                            For Riders
                        </h5>

                        <Link
                            to="/rider"
                            className="footer-link"
                        >
                            Become a Rider
                        </Link>

                        <Link
                            to="/riders-dashboard"
                            className="footer-link"
                        >
                            Rider Dashboard
                        </Link>

                    </div>

                    <div className="col-lg-2 col-md-6 col-6 mt-md-4 mt-lg-0">

                        <h5 className="footer-heading">
                            Feedback & Support
                        </h5>

                        <Link
                            to="/feedback"
                            className="footer-link"
                        >
                            Submit Feedback
                        </Link>

                        <Link
                            to="/help-center"
                            className="footer-link"
                        >
                            Help Center
                        </Link>

                        <Link
                            to="/contact-us"
                            className="footer-link"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

                <div className="footer-border border-2 mt-4"></div>

                <div className="row align-items-center mt-4">

                    <div className="col-md-6 text-center text-md-start">

                        <p className="footer-copy mb-0">
                            © 2026 Cravings. All rights reserved.
                        </p>

                    </div>

                    <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">

                        <Link
                            to="/privacy-policy"
                            className="footer-bottom-link me-4"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms-services"
                            className="footer-bottom-link me-4"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            to="/site-map"
                            className="footer-bottom-link"
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