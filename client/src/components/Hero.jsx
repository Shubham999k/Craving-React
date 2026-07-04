import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { restaurants } from "../data/restaurants";
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

function Hero({ searchQuery, setSearchQuery }) {
    const images = [bg1, bg2, bg3, bg4];
    const navigate = useNavigate();

    return (
        <section className="relative h-[85vh] z-30 select-none">

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
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
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

            {/* Custom Theme Pagination Dots style */}
            <style>{`
                .swiper-pagination {
                    z-index: 20 !important;
                }
                .swiper-pagination-bullet-active {
                    background: #c74a09 !important;
                    opacity: 1 !important;
                }
                .swiper-pagination-bullet {
                    background: #ffffff;
                    opacity: 0.6;
                    cursor: pointer !important;
                }
            `}</style>

            {/* Custom Navigation Buttons (Size 7, Gray bg, Very Small Icons) */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-500/40 hover:bg-slate-500/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 select-none">
                <i className="bi bi-chevron-left text-[15px] font-black"></i>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-500/40 hover:bg-slate-500/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 select-none">
                <i className="bi bi-chevron-right text-[15px] font-black"></i>
            </button>

            {/* Overlay */}

            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 pointer-events-none">

                <div className="-translate-y-20 px-4 text-center text-white pointer-events-auto">

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

                    {/* Search Bar & Auto-Suggestions */}
                    <div className="mx-auto relative w-full max-w-4xl z-50">
                        <div className="flex h-14 w-full items-center rounded-xl bg-white dark:bg-slate-900 px-5 shadow-2xl border border-slate-100 dark:border-slate-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6 text-gray-500 dark:text-slate-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Search restaurants or cuisines..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ml-4 w-full text-lg text-black dark:text-slate-100 outline-none placeholder:text-[#f1a67e] dark:placeholder:text-slate-500 bg-transparent"
                            />
                        </div>

                        {/* Search Auto-Suggestions */}
                        {searchQuery.trim().length > 0 && (
                            <div className="absolute left-0 right-0 top-[60px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-h-[190px] overflow-y-auto z-50 text-left pointer-events-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                                {(() => {
                                    const filtered = restaurants.filter(r => 
                                        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                                    );
                                    
                                    if (filtered.length === 0) {
                                        return (
                                            <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                                No restaurants match "{searchQuery}"
                                            </div>
                                        );
                                    }

                                    return filtered.map(r => (
                                        <div 
                                            key={r.id}
                                            onClick={() => {
                                                setSearchQuery("");
                                                navigate(`/restaurant/${r.id}`);
                                            }}
                                            className="flex gap-4 items-center p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition"
                                        >
                                            <img 
                                                src={r.image} 
                                                alt={r.name} 
                                                className="w-11 h-11 rounded-lg object-cover border border-slate-100 dark:border-slate-800" 
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 truncate">{r.name}</h4>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5 truncate">{r.tags.join(" • ")}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded text-[10px] font-black">
                                                ★ {r.rating}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </section>
    );
}
export default Hero;