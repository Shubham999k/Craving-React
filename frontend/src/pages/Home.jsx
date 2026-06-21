import Hero from "../components/Hero";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import PartnerSection from "../components/PartnerSection";

function Home() {
    return (
        <>
            <Hero />
            <FeaturedRestaurants />
            <Statistics />
            <Testimonials/>
            <PartnerSection />
        </>
    );
}

export default Home;