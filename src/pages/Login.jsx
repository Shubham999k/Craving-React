import { Link } from "react-router-dom";
import bgImage from "../assets/images/foodTable.webp";

function Login() {
    return (
        <section
            className="login-section"
            style={{
                backgroundImage: `url(${bgImage})`
            }}
        >
            <div className="container-fluid h-100">

                <div className="row h-100 align-items-center">

                    <div className="col-lg-5 col-md-7 col-sm-10">

                        <div className="login-card">

                            <h1 className="login-title">
                                Welcome Back
                            </h1>

                            <p className="login-subtitle">
                                Login to your Cravings account
                            </p>

                            <div className="mb-4">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    placeholder="Enter your email"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control custom-input"
                                    placeholder="Enter your password"
                                />

                            </div>

                            <div className="d-flex justify-content-between mb-4">

                                <div>
                                    <input type="checkbox" />
                                    <span className="ms-2">
                                        Remember me
                                    </span>
                                </div>

                                <Link
                                    to="/forgot-password"
                                    className="forgot-link"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <button className="login-btn-custom">
                                Login
                            </button>

                            <div className="login-divider">
                                <hr />
                                <span>Don't have an account?</span>
                                <hr />
                            </div>

                            <div className="text-center">

                                <Link
                                    to="/register"
                                    className="create-account-link"
                                >
                                    Create an account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Login;