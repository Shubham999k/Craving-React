import { Link } from "react-router-dom";
import bgImage from "../assets/images/foodTable.webp";

function Register() {
    return (
        <section
            className="relative flex h-[90vh] items-center justify-end overflow-hidden bg-cover bg-center px-6"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Register Card */}
            <div className="relative z-10 w-full lg:w-[30%]">
                <div className="rounded-xl bg-white px-5 py-8 shadow-2xl">

                    {/* Heading */}
                    <h2 className="mb-1 text-center text-2xl font-bold">
                        Create Account
                    </h2>

                    <p className="mb-4 text-center text-sm text-gray-500">
                        Join us as a Customer, Restaurant, or Rider
                    </p>

                    {/* Role Selection */}
                    <label className="mb-2 block text-sm font-medium">
                        Register as:
                    </label>

                    <div className="mb-3 flex flex-wrap gap-4 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                defaultChecked
                                className="accent-orange-600"
                            />
                            Customer
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                className="accent-orange-600"
                            />
                            Restaurant
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="role"
                                className="accent-orange-600"
                            />
                            Rider
                        </label>
                    </div>

                    {/* Full Name */}
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                    />

                    {/* Phone */}
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                    />

                    {/* Confirm Password */}
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="mb-3 w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
                    />

                    {/* Terms */}
                    <div className="mb-3 flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            className="accent-orange-600"
                        />

                        <span>
                            I agree to the{" "}
                            <a
                                href="#"
                                className="font-medium text-orange-600 hover:underline"
                            >
                                terms & conditions
                            </a>
                        </span>
                    </div>

                    {/* Register Button */}
                    <button className="mb-3 w-full rounded-md bg-[#c74a09] py-2.5 font-semibold text-white transition hover:bg-[#b34006]">
                        Register
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm">
                        <span className="text-gray-500">
                            Already registered?
                        </span>{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-orange-600 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>

                </div>
            </div>
        </section>
    );
}

export default Register;