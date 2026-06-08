import bg1 from "../assets/images/bgImage1-BgVBBcls.jpg";
import bg2 from "../assets/images/bgImage2-CSvQeVNX.jpg";
import bg3 from "../assets/images/bgImage3-BTY6Sz_K.jpg";
import bg4 from "../assets/images/bgImage4-L1QELaMd.jpg";

function Hero() {
    return (
        <section className="hero-section">

            <div
                id="heroCarousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="2500"
            >

                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img
                            src={bg1}
                            className="d-block w-100 hero-img"
                            alt="Food"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg2}
                            className="d-block w-100 hero-img"
                            alt="Food"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg3}
                            className="d-block w-100 hero-img"
                            alt="Food"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src={bg4}
                            className="d-block w-100 hero-img"
                            alt="Food"
                        />
                    </div>

                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>

            </div>

            {/* Fixed Overlay Content */}

            <div className="hero-overlay">

                <div className="hero-content">

                    <h1 className="hero-title">
                        Your Favorite Food,
                        <br />
                        Delivered Fast
                    </h1>

                    <p className="hero-description">
                        Order from thousands of restaurants and get it delivered
                    </p>

                    <div className="d-flex justify-content-center gap-3 flex-wrap my-4">

                        <button className="btn hero-signup-btn">
                            Sign Up
                        </button>

                        <button className="btn btn-light hero-order-btn">
                            Order Now
                        </button>

                    </div>

                    <div className="hero-search">

                        <i className="bi bi-search text-muted"></i>

                        <input
                            type="text"
                            placeholder="Search restaurants or dishes"
                            className="form-control border-0 shadow-none"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;