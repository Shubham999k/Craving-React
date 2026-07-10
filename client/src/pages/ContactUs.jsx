import { useState } from "react";
import toast from "react-hot-toast";
import contactPage from "../assets/images/contactPage.jpg";
import api from "../config/api.config.js";

function ContactUs() {
    const [contactData, setContactData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [validateError, setValidateError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        const payload = {
            fullName: contactData.fullName.trim(),
            email: contactData.email.toLowerCase().trim(),
            phone: contactData.phone.trim(),
            subject: contactData.subject.trim(),
            message: contactData.message.trim(),
        };

        try {
            const response = await api.post("/public/contact-us", payload);
            toast.success(
                response?.data?.message || "Your message was sent successfully."
            );
            setContactData({
                fullName: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            const errorMessage =
                error?.response?.data?.message || "Failed to send your message. Please try again.";
            setValidateError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="relative flex min-h-[90vh] items-center justify-center bg-cover bg-center py-20 px-4"
            style={{
                backgroundImage: `url(${contactPage})`,
            }}
        >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className="grid lg:grid-cols-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800/50 overflow-hidden">
                    
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-[#c74a09] p-10 text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl font-extrabold mb-2">Get in touch</h3>
                            <p className="text-orange-100 mb-10 leading-relaxed">
                                We'd love to hear from you. Our friendly team is always here to chat.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <i className="bi bi-geo-alt-fill text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Office</h4>
                                        <p className="text-orange-100 text-sm">123 Cravings Blvd, Food City, FC 90210</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <i className="bi bi-telephone-fill text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Phone</h4>
                                        <p className="text-orange-100 text-sm">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <i className="bi bi-envelope-fill text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email</h4>
                                        <p className="text-orange-100 text-sm">hello@cravings.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-3 p-10 md:p-14">
                        <h2 className="mb-8 text-3xl font-extrabold text-slate-900 dark:text-white">
                            Send us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={contactData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={contactData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={contactData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={contactData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium resize-none"
                                ></textarea>
                            </div>

                            {validateError && (
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                                    <i className="bi bi-exclamation-circle-fill"></i>
                                    {validateError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-[#c74a09] py-4 font-bold text-white transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <i className="bi bi-send-fill ml-1"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;