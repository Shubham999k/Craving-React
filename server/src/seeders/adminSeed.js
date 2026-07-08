import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const adminSeed = async () => {
    try {
        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", SALT);

        await User.updateOne(
            { email: "admin@craving.com" },
            {
                $set: {
                    fullName: "Super Admin",
                    email: "admin@craving.com",
                    password: hashedPassword,
                    dob: new Date("1990-01-01"),
                    phone: "+1234567890",
                    gender: "Not specified",
                    role: "Admin",
                    profilePic: {
                        url: "https://placehold.co/600x400?text=A",
                        publicId: null
                    }
                }
            },
            { upsert: true }
        );

        console.log("Admin seeded successfully.");
    } catch (error) {
        console.error("Error seeding admin:", error);
        throw error;
    }
};

export default adminSeed;
