import Hero from "../components/Hero";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import PartnerSection from "../components/PartnerSection";
import RestaurantSection from "../components/RestaurantSection";


function Home() {
    return (
        <>
            <Hero />
            <RestaurantSection />
            <FeaturedRestaurants />
            <Statistics />
            <Testimonials/>
            <PartnerSection />
        </>
    );
}

export default Home;