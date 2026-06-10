function Testimonials() {
    const testimonials = [
        {
            stars: "★★★★★",
            title: "Amazing Service!",
            review:
                "The food arrived hot and fresh. The delivery was incredibly fast. Highly impressed with Cravings' service!",
            initials: "AJ",
            name: "Arun J.",
        },

        {
            stars: "★★★★★",
            title: "Best App Ever!",
            review:
                "Easy to use interface, wide variety of restaurants, and quick delivery. I order from Cravings every week!",
            initials: "SP",
            name: "Sneha P.",
        },

        {
            stars: "★★★★★",
            title: "Excellent Choices",
            review:
                "Love the variety of restaurants available. Found my new favorite spot through Cravings.",
            initials: "RK",
            name: "Raj Kumar",
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">

                {/* Heading */}
                <div className="mb-14 text-center">

                    <h2 className="mb-3 text-4xl font-bold text-gray-900">
                        What Our Customers Say
                    </h2>

                    <p className="text-lg text-gray-500">
                        Real feedback from real food lovers
                    </p>

                </div>

                {/* Cards */}
                <div className="grid gap-8 lg:mx-20 md:grid-cols-2 lg:grid-cols-3">

                    {testimonials.map((item, index) => (

                        <div
                            key={index}
                            className="rounded-lg border border-orange-100 bg-[#FFF8F1] p-7 shadow-md transition-all duration-300 hover:shadow-lg"
                        >

                            {/* Stars */}
                            <div className="mb-1 text-2xl text-yellow-400">
                                {item.stars}
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                {item.title}
                            </h3>

                            {/* Review */}
                            <p className="mb-2 leading-7 text-gray-600">
                                {item.review}
                            </p>

                            {/* User */}
                            <div className="flex items-center">

                                <div
                                    className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white ${
                                        index % 2 === 0
                                            ? "bg-orange-600"
                                            : "bg-pink-600"
                                    }`}
                                >
                                    {item.initials}
                                </div>

                                <div>

                                    <h4 className="font-semibold text-gray-900">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        Verified Buyer
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default Testimonials;