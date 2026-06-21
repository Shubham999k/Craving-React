import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    Pagination,
    Navigation,
    EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import bg1 from "../assets/images/bgImage1-BgVBBcls.jpg";
import bg2 from "../assets/images/bgImage2-CSvQeVNX.jpg";
import bg3 from "../assets/images/bgImage3-BTY6Sz_K.jpg";
import bg4 from "../assets/images/bgImage4-L1QELaMd.jpg";

function Hero() {
    const images = [bg1, bg2, bg3, bg4];

    return (
        <section className="relative h-[85vh] overflow-hidden">

            <Swiper
                modules={[
                    EffectFade,
                    Autoplay,
                    Pagination,
                    Navigation,
                ]}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation
                loop
                speed={1200}
                className="h-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="h-[85vh] w-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay */}

            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">

                <div className="-translate-y-8 px-4 text-center text-white">

                    <h1 className="mb-4 text-3xl font-bold leading-tight lg:text-5xl">
                        Your Favorite Food,
                        <br />
                        Delivered Fast
                    </h1>

                    <p className="mb-8 text-lg text-gray-100 lg:text-2xl">
                        Order from thousands of restaurants and get it delivered
                        to your doorstep
                    </p>

                    <div className="mb-8 flex flex-wrap justify-center gap-4">

                        <Link
                            to="/register"
                            className="rounded-lg bg-[#c74a09] px-10 py-4 text-lg font-semibold transition duration-300 hover:bg-[#b34006]"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/order"
                            className="rounded-lg bg-white px-10 py-4 text-lg font-semibold text-black transition duration-300 hover:bg-gray-100"
                        >
                            Order Now 
                        </Link>

                    </div>

                    {/* Search Bar */}

                    <div className="mx-auto flex h-14 w-full max-w-4xl items-center rounded-xl bg-white px-5 shadow-2xl">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search restaurants or dishes..."
                            className="ml-4 w-full text-lg text-black outline-none placeholder:text-[#f1a67e]"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;