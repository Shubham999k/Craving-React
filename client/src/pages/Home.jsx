import { useState } from "react";
import Hero from "../components/Hero";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import PartnerSection from "../components/PartnerSection";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FeaturedRestaurants searchQuery="" />
            <Statistics />
            <Testimonials/>
            <PartnerSection />
        </div>
    );
}

export default Home;