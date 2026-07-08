import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const userSeed = async () => {
    try {
        const existingUser = await User.findOne({ email: "demo@user.com" });
        if (existingUser) {
            console.log("Demo user already exists. Skipping.");
            return;
        }

        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", SALT);

        const users = [
            {
                fullName: "Demo User",
                email: "demo@user.com",
                password: hashedPassword,
                dob: new Date("1995-05-15"),
                phone: "+1987654321",
                gender: "Male",
                profilePic: {
                    url: "https://placehold.co/600x400?text=D",
                    publicId: null
                }
            },
            {
                fullName: "Restaurant Owner",
                email: "owner@restaurant.com",
                password: hashedPassword,
                dob: new Date("1985-08-20"),
                phone: "+1122334455",
                gender: "Female",
                profilePic: {
                    url: "https://placehold.co/600x400?text=R",
                    publicId: null
                }
            },
            {
                fullName: "Delivery Rider",
                email: "rider@delivery.com",
                password: hashedPassword,
                dob: new Date("1992-11-10"),
                phone: "+1555666777",
                gender: "Male",
                profilePic: {
                    url: "https://placehold.co/600x400?text=R",
                    publicId: null
                }
            }
        ];

        await User.insertMany(users);
        console.log("Users seeded successfully.");
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
};

export default userSeed;
