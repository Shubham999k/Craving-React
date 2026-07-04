function Statistics() {
    const stats = [
        {
            value: "2.5M+",
            title: "Successful Deliveries",
            description: "Orders delivered with care and precision",
            color: "text-orange-600",
        },
        {
            value: "500K+",
            title: "Happy Customers",
            description: "Satisfied users enjoying delicious food",
            color: "text-pink-500",
        },
        {
            value: "5K+",
            title: "Partner Restaurants",
            description: "Restaurants serving amazing cuisine",
            color: "text-orange-600",
        },
        {
            value: "1K+",
            title: "Active Delivery Partners",
            description: "Riders ensuring quick and safe delivery",
            color: "text-pink-500",
        },
    ];

    return (
        <section className="bg-[#FFF8F1] dark:bg-slate-900/40 py-20 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4">

                {/* Heading */}
                <div className="mb-14 text-center">
                    <h2 className="mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100">
                        Cravings by the Numbers
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400">
                        See why millions trust us for their daily food delivery needs
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:mx-20">

                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-orange-500/10 text-slate-800 dark:text-slate-100"
                        >
                            <h3
                                className={`mb-3 text-5xl font-extrabold ${item.color}`}
                            >
                                {item.value}
                            </h3>

                            <h4 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                                {item.title}
                            </h4>

                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                {item.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Statistics;