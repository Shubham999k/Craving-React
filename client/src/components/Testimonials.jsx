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
            name: "Raj Kumar Rao",
        },
    ];

    return (
        <section className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4">

                {/* Heading */}
                <div className="mb-14 text-center">

                    <h2 className="mb-3 text-4xl font-bold text-gray-900 dark:text-slate-100">
                        What Our Customers Say
                    </h2>

                    <p className="text-lg text-gray-500 dark:text-slate-400">
                        Real feedback from real food lovers
                    </p>

                </div>

                {/* Cards */}
                <div className="grid gap-8 lg:mx-20 md:grid-cols-2 lg:grid-cols-3">

                    {testimonials.map((item, index) => (

                        <div
                            key={index}
                            className="rounded-lg border border-orange-100 dark:border-orange-950 bg-[#FFF8F1] dark:bg-slate-900 p-7 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-orange-500/10"
                        >

                            {/* Stars */}
                            <div className="mb-1 text-2xl text-yellow-400">
                                {item.stars}
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-100">
                                {item.title}
                            </h3>

                            {/* Review */}
                            <p className="mb-2 leading-7 text-gray-650 dark:text-slate-350">
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

                                    <h4 className="font-semibold text-gray-900 dark:text-slate-200">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500 dark:text-slate-400">
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