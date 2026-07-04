import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../data/restaurants";

function FeaturedRestaurants({ searchQuery }) {
    const filteredRestaurants = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <section className="inset-0 bg-linear-to-b from-orange-700/90 to-white/20 py-10 ">

            <div className="mx-auto max-w-7xl px-4">
 
                <div className="mb-10 lg:mx-20 text-white">

                    <h2 className="text-4xl font-bold t">
                        Featured Restaurants
                    </h2>

                    <p className="mt-2">
                        {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} available
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:mx-20">

                    {filteredRestaurants.map((restaurant) => (
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