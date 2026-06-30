import Contact from "../models/contact.model.js";

export const ContactUs = async (req, res, next) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;

        if (!fullName || !email || !phone || !subject || !message) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }

        const savedContact = await Contact.create({
            fullName,
            email,
            phone,
            subject,
            message,
        });

        res.status(201).json({
            message: "Contact Us message received successfully",
            data: savedContact,
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};
