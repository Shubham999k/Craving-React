import bg1 from "../assets/images/bgImage1-BgVBBcls.jpg";
import bg2 from "../assets/images/bgImage2-CSvQeVNX.jpg";
import bg3 from "../assets/images/bgImage3-BTY6Sz_K.jpg";
import bg4 from "../assets/images/bgImage4-L1QELaMd.jpg";

function Hero() {
    return (
        <section className="relative">

            <div
                id="heroCarousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >

                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img
                            src={bg1}
                            alt=""
                            className="w-full h-[620px] object-cover"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg2}
                            alt=""
                            className="w-full h-[620px] object-cover"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg3}
                            alt=""
                            className="w-full h-[620px] object-cover"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg4}
                            alt=""
                            className="w-full h-[620px] object-cover"
                        />
                    </div>

                </div>

            </div>

            <div className="absolute inset-0 bg-black/35 flex items-center justify-center z-10">

                <div className="text-center text-white -translate-y-12 max-w-5xl px-4">

                    <h1 className="text-5xl font-bold leading-tight mb-5">
                        Your Favorite Food,
                        <br />
                        Delivered Fast
                    </h1>

                    <p className="text-xl mb-8">
                        Order from thousands of restaurants and get it delivered
                        to your doorstep
                    </p>

                    <div className="flex justify-center gap-4 mb-8">

                        <button className="bg-[#c74a09] hover:bg-[#b64307] px-8 py-3 rounded-md font-semibold">
                            Sign Up
                        </button>

                        <button className="bg-white text-black px-8 py-3 rounded-md font-semibold">
                            Order Now
                        </button>

                    </div>

                    <div className="bg-white rounded-lg h-12 max-w-4xl mx-auto flex items-center px-4">

                        <i className="bi bi-search text-gray-500"></i>

                        <input
                            type="text"
                            placeholder="Search restaurants or dishes..."
                            className="w-full ml-3 outline-none text-black"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;