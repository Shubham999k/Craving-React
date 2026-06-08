import { Link } from "react-router-dom";
import logo from "../assets/images/craveing logo.png";

function Navbar() {
    return (
        <nav className="bg-[#c74a09] py-1">

            <div className="container-fluid px-5">

                <div className="flex items-center justify-between">

                    <Link to="/">

                        <img
                            src={logo}
                            alt="Cravings"
                            className="h-14 w-auto"
                        />

                    </Link>

                    <div className="flex items-center gap-3">

                        <Link
                            to="/login"
                            className="text-white font-semibold px-3 py-1 rounded transition-all duration-300 hover:outline hover:outline-1 hover:outline-white"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-white text-[#c74a09] font-semibold px-3 py-1 rounded transition-all duration-300 hover:bg-transparent hover:text-white hover:outline hover:outline-1 hover:outline-white"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;