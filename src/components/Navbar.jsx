import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid px-5">

                <Link
                    to="/"
                    className="navbar-brand text-white fw-bold"
                >
                    Cravings
                </Link>

                <div className="ms-auto d-flex gap-3">

                    <Link
                        to="/login"
                        className="btn login-btn"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="btn register-btn"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;