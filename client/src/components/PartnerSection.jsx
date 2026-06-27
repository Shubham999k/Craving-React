import { Link } from "react-router-dom";

function PartnerSection() {
    return (
        <section className="bg-orange-700/90 py-12.5">

            <div className="mx-auto max-w-6xl px-4 text-center">

                <h2 className="mb-4 text-4xl font-bold text-white">
                    Become a Restaurant Partner 
                </h2>

                <p className="mx-auto mb-8 max-w-3xl text-lg text-orange-100">
                    Grow your business with Cravings. Join thousands of
                    restaurants already delivering with us and reach more
                    customers every day.
                </p>

                <Link
                    to="/restaurant"
                    className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-orange-700 shadow-lg transition-all duration-300 hover:bg-orange-50"
                >
                    Partner With Us
                </Link>

            </div>

        </section>
    );
}

export default PartnerSection;