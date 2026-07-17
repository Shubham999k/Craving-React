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
    const slides = [
        {
            image: bg1,
            title: "Your Favorite Food,<br />Delivered Fast",
            subtitle: "Order from thousands of restaurants and get it delivered to your doorstep"
        },
        {
            image: bg2,
            title: "Craving Something<br />Spicy & Hot?",
            subtitle: "Discover the best local dishes to satisfy your taste buds"
        },
        {
            image: bg3,
            title: "Healthy Choices<br />Everyday",
            subtitle: "Fresh salads, smoothies, and vegan options delivered to you"
        },
        {
            image: bg4,
            title: "Late Night<br />Cravings?",
            subtitle: "We deliver hot and fresh food until 2 AM"
        }
    ];

    const navigate = useNavigate();

    return (
        <section className="relative h-[85vh] z-30 select-none">
            <Swiper
                modules={[
                    Autoplay,
                    Pagination,
                    Navigation,
                ]}
                autoplay={{
                    delay: 4500,
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
                speed={800}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <img
                                src={slide.image}
                                alt={`Slide ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 -translate-y-8">
                                <h1 
                                    className="mb-4 text-3xl font-bold leading-tight lg:text-6xl text-white drop-shadow-lg"
                                    dangerouslySetInnerHTML={{ __html: slide.title }}
                                />
                                <p className="mb-8 text-lg text-gray-100 lg:text-2xl max-w-2xl drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                <div className="mb-8 flex flex-wrap justify-center gap-4">
                                    <Link
                                        to="/register"
                                        className="rounded-lg bg-[#c74a09] px-8 py-3 lg:px-10 lg:py-4 text-base lg:text-lg font-semibold text-white transition duration-300 hover:bg-[#b34006] hover:scale-105"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/order"
                                        className="rounded-lg bg-white px-8 py-3 lg:px-10 lg:py-4 text-base lg:text-lg font-semibold text-black transition duration-300 hover:bg-gray-100 hover:scale-105"
                                    >
                                        Order Now 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Theme Pagination Dots style */}
            <style>{`
                .swiper-pagination {
                    z-index: 20 !important;
                    bottom: 20px !important;
                }
                .swiper-pagination-bullet-active {
                    background: #c74a09 !important;
                    opacity: 1 !important;
                    width: 24px !important;
                    border-radius: 8px !important;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet {
                    background: #ffffff;
                    opacity: 0.6;
                    cursor: pointer !important;
                    transition: all 0.3s ease;
                }
            `}</style>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/30 hover:bg-[#c74a09] text-white flex items-center justify-center cursor-pointer transition-all duration-300 select-none backdrop-blur-sm border border-white/20 hover:scale-110 shadow-lg">
                <i className="bi bi-chevron-left text-lg lg:text-xl font-black"></i>
            </button>
            <button className="swiper-button-next-custom absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/30 hover:bg-[#c74a09] text-white flex items-center justify-center cursor-pointer transition-all duration-300 select-none backdrop-blur-sm border border-white/20 hover:scale-110 shadow-lg">
                <i className="bi bi-chevron-right text-lg lg:text-xl font-black"></i>
            </button>

            {/* Fixed Search Bar at the bottom of the hero */}
            <div className="absolute bottom-[30%] lg:bottom-[35%] left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40">
                <div className="mx-auto relative w-full pointer-events-auto">
                    <div className="flex h-14 lg:h-16 w-full items-center rounded-xl bg-white/95 backdrop-blur-md dark:bg-slate-900/95 px-5 shadow-2xl border border-white/20 dark:border-slate-800 transition-all hover:shadow-[#c74a09]/20">
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
                            className="ml-4 w-full text-lg lg:text-xl text-black dark:text-slate-100 outline-none placeholder:text-[#f1a67e] dark:placeholder:text-slate-500 bg-transparent"
                        />
                    </div>

                    {/* Search Auto-Suggestions */}
                    {searchQuery.trim().length > 0 && (
                        <div className="absolute left-0 right-0 top-[70px] lg:top-[80px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-h-[250px] overflow-y-auto z-50 text-left pointer-events-auto divide-y divide-slate-100 dark:divide-slate-800/60 animate-in fade-in slide-in-from-top-4 duration-300">
                            {(() => {
                                const filtered = restaurants.filter(r => 
                                    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                                );
                                
                                if (filtered.length === 0) {
                                    return (
                                        <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
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
                                        className="flex gap-4 items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                                    >
                                        <img 
                                            src={r.image} 
                                            alt={r.name} 
                                            className="w-14 h-14 rounded-lg object-cover border border-slate-100 dark:border-slate-800" 
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100 truncate">{r.name}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 truncate">{r.tags.join(" • ")}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-md text-xs font-black">
                                            ★ {r.rating}
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
export default Hero;