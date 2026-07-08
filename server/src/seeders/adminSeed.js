import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const adminSeed = async () => {
    try {
        const existingAdmin = await User.findOne({ email: "admin@craving.com" });
        if (existingAdmin) {
            console.log("Admin already exists. Skipping.");
            return;
        }

        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", SALT);

        await User.create({
            fullName: "Super Admin",
            email: "admin@craving.com",
            password: hashedPassword,
            dob: new Date("1990-01-01"),
            phone: "+1234567890",
            gender: "Not specified",
            profilePic: {
                url: "https://placehold.co/600x400?text=A",
                publicId: null
            }
        });
        console.log("Admin seeded successfully.");
    } catch (error) {
        console.error("Error seeding admin:", error);
        throw error;
    }
};

export default adminSeed;
