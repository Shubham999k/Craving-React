import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../data/restaurants";

function FeaturedRestaurants() {
    return (
        <section className="inset-0 bg-linear-to-b from-orange-800/80 to-white/20 py-20 ">

            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-12">

                    <h2 className="text-4xl font-bold t">
                        Featured Restaurants
                    </h2>

                    <p className="mt-2">
                        6 restaurants available
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

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

export default FeaturedRestaurants;