import { useState } from "react";
import contactPage from "../assets/images/contactPage.jpg";

function ContactUs() {
    const [contactData, setContactData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [validateError, setValidateError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !contactData.fullName ||
            !contactData.email ||
            !contactData.phone ||
            !contactData.subject ||
            !contactData.message
        ) {
            setValidateError("Please fill all fields");
            return;
        }

        setValidateError("");

        const payload = {
            fullName: contactData.fullName,
            email: contactData.email.toLowerCase(),
            phone: contactData.phone,
            subject: contactData.subject,
            message: contactData.message,
        };

        console.log("Contact Form Data:", payload);

        // API Call Here

        setContactData({
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    return (
        <section
            className="relative flex min-h-[90vh] items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${contactPage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16">
                <div className="max-w-md rounded-xl bg-white p-6 shadow-2xl">
                    <h2 className="mb-2 text-center text-3xl font-bold text-[#c74a09]">
                        Contact Us
                    </h2>

                    <p className="mb-4 text-center text-gray-500">
                        Have a question? We'd love to hear from you.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="fullName"
                                value={contactData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                value={contactData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                name="phone"
                                value={contactData.phone} 
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                name="subject"
                                value={contactData.subject}
                                onChange={handleChange}
                                placeholder="What is this about?"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        <div className="mb-3"> 
                            <textarea
                                rows={4}
                                name="message"
                                value={contactData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
                            ></textarea>
                        </div>

                        {validateError && (
                            <p className="mb-3 text-sm text-red-500">
                                {validateError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-md bg-[#c74a09] py-3 font-semibold text-white transition hover:bg-[#b34006]"
                        >
                            Send Message !!!
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;