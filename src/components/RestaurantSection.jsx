import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../data/restaurants";

function RestaurantSection() {
    return (
        <section className="bg-linear-to-b from-orange-800/80 to-white py-20">

            <div className="mx-auto max-w-7xl px-4">

                {/* Heading */}

                <div className="mb-10 text-center">

                    <h2 className="mb-3 text-4xl font-bold text-white lg:text-5xl">
                        Featured Restaurants
                    </h2>

                    <p className="text-lg text-orange-100">
                        Discover the best restaurants near you
                    </p>

                </div>

                {/* Restaurant Cards */}

                <div className="grid gap-8 md:grid-cols-2 lg:mx-20 lg:grid-cols-3">

                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}

export default RestaurantSection;