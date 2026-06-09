import { Link } from "react-router-dom";
import bgImage from "../assets/images/foodTable.webp";

function Login() {
    return (
        <section
            className="relative flex h-screen items-center px-6 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Login Card */}
            <div className="relative left-16 z-10 w-full lg:w-[30%]">
                <div className="rounded-xl bg-white p-6 shadow-2xl">

                    {/* Heading */}
                    <h1 className="mb-2 text-center text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mb-6 text-center text-gray-500">
                        Login to your Cravings account
                    </p>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                        />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="mb-5 flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-orange-600"
                            />
                            <span>Remember me</span>
                        </label>

                        <Link
                            to="/forgot-password"
                            className="font-medium text-orange-600 transition hover:text-orange-700"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Login Button */}
                    <button className="mb-5 w-full rounded-md bg-[#c74a09] py-3 font-semibold text-white transition hover:bg-[#b34006]">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="mb-5 flex items-center gap-3">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-sm text-gray-500">
                            Don't have an account?
                        </span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <Link
                            to="/register"
                            className="font-semibold text-orange-600 transition hover:text-orange-700"
                        >
                            Create an account
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Login;