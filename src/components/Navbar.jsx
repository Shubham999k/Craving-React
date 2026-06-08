import { Link } from "react-router-dom";
import logo from "../assets/images/craveing logo.png";

function Navbar() {
    return (
        <nav className="navbar-custom">
            <div className="container-fluid px-5 d-flex justify-content-between align-items-center">

                <Link to="/">
                    <img
                        src={logo}
                        alt="Cravings"
                        className="logo-img"
                    />
                </Link>

                <div className="d-flex align-items-center gap-2">

                    <Link
                        to="/login"
                        className="login-btn text-decoration-none"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="register-btn text-decoration-none"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;