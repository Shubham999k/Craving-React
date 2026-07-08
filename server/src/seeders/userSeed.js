import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const userSeed = async () => {
    try {
        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", SALT);
        const existingCustomer = await User.find({role:"Customer"})
        const existingRestaurant = await User.find({role:"Restaurant"})
        const existingRider = await User.find({role:"Rider"})

        const users = [
            {
                fullName: "Regular Customer",
                email: "customer@craving.com",
                password: hashedPassword,
                dob: new Date("1998-03-25"),
                phone: "+1999888777",
                gender: "Female",
                role: "Customer",
                profilePic: {
                    url: "https://placehold.co/600x400?text=C",
                    publicId: null
                }
            },
            {
                fullName: "Demo User",
                email: "demo@user.com",
                password: hashedPassword,
                dob: new Date("1995-05-15"),
                phone: "+1987654321",
                gender: "Male",
                role: "Customer",
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
                role: "Restaurant",
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
                role: "Rider",
                profilePic: {
                    url: "https://placehold.co/600x400?text=R",
                    publicId: null
                }
            }
        ];

        for (const user of users) {
            await User.updateOne(
                { email: user.email },
                { $set: user },
                { upsert: true }
            );
        }
        
        console.log("Users seeded successfully.");
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
};

export default userSeed;
