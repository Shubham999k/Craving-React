import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
    return (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-900 dark:border dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-md transition duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-orange-500/10">

            <div className="relative">

                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-60 w-full object-cover"
                />

                <span className="absolute right-3 top-3 rounded-full bg-[#c74a09] px-3 py-1 text-sm font-semibold text-white">
                    ★ {restaurant.rating}
                </span>

            </div>

            <div className="p-5"> 

                <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                    {restaurant.name} 
                </h3> 
 
                <p className="mb-4 text-sm text-gray-600 dark:text-slate-400">
                    {restaurant.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">

                    {restaurant.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-orange-100 dark:bg-orange-950/50 px-3 py-1 text-xs font-medium text-orange-700 dark:text-orange-300"
                        >
                            {tag}
                        </span>
                    ))}

                </div>

                <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="block rounded-lg bg-[#c74a09] py-2 text-center font-semibold text-white transition hover:bg-[#b64307]"
                >
                    Explore Menu !
                </Link>

            </div>

        </div>
    );
}

export default RestaurantCard;