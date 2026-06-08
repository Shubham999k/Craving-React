import { Link } from "react-router-dom";

import foodTable from "../assets/images/foodTable.webp";
import Navbar from "../components/Navbar";

function Login() {
    return (
        <>
            <section className="custom-section position-relative">

                <img
                    src={foodTable}
                    className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 z-n1"
                    alt="background"
                />

                <div className="login-overlay"></div>

                <div className="container h-100 d-flex align-items-center position-relative">

                    <div className="row w-100">

                        <div className="col-lg-5 col-md-7 col-sm-9 col-12">

                            <div className="login-card px-5 py-4 rounded-3 bg-light">

                                <h2 className="fw-bold text-center mb-1">
                                    Welcome Back
                                </h2>

                                <p className="text-center text-muted mb-3">
                                    Login to your Cravings account
                                </p>

                                <label className="form-label fw-bold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control mb-3 py-2"
                                    placeholder="Enter your email"
                                />

                                <label className="form-label fw-bold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control mb-3 py-2"
                                    placeholder="Enter your password"
                                />

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <div>
                                        <input type="checkbox" /> Remember
                                    </div>

                                    <Link
                                        to="/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot password?
                                    </Link>

                                </div>

                                <button className="btn-register-login w-100 py-3 fw-bold">
                                    Login
                                </button>

                                <div className="d-flex align-items-center my-3">

                                    <hr className="flex-grow-1" />

                                    <span className="mx-2 text-muted">
                                        Don't have an account?
                                    </span>

                                    <hr className="flex-grow-1" />

                                </div>

                                <p className="text-center mb-0">

                                    <Link
                                        to="/register"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Create an account
                                    </Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default Login;