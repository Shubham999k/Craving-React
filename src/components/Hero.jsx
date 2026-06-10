import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bg1 from "../assets/images/bgImage1-BgVBBcls.jpg";
import bg2 from "../assets/images/bgImage2-CSvQeVNX.jpg";
import bg3 from "../assets/images/bgImage3-BTY6Sz_K.jpg";
import bg4 from "../assets/images/bgImage4-L1QELaMd.jpg";

function Hero() {
    const images = [bg1, bg2, bg3, bg4];

    return (
        <section className="relative h-[620px]">

            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                className="h-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="h-[620px] w-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">

                <div className="max-w-5xl px-4 text-center text-white">

                    <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                        Your Favorite Food
                        <br />
                        Delivered Fast
                    </h1>

                    <p className="mb-8 text-lg md:text-xl">
                        Order from thousands of restaurants and get it delivered
                        to your doorstep
                    </p>

                    <div className="mb-8 flex flex-wrap justify-center gap-4">

                        <Link
                            to="/register"
                            className="rounded-lg bg-[#c74a09] px-8 py-3 font-semibold transition hover:bg-[#b64307]"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/order"
                            className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-100"
                        >
                            Order Now
                        </Link>

                    </div>

                    <div className="mx-auto flex max-w-3xl items-center rounded-lg bg-white px-4 py-3">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search restaurants or dishes"
                            className="ml-3 w-full border-none text-black outline-none"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;