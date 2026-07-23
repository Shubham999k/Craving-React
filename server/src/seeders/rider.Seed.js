import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const riderSeed = async () => {
    try {
        const hashedPassword = await bcrypt.hash("ravi123", 10);
        
        await User.updateOne(
            { email: "rider@craving.com" },
            {
                $set: {
                    fullName: "Ravi Kumar",
                    email: "rider@craving.com",
                    password: hashedPassword,
                    dob: "1995-05-15",
                    phone: "9876543210",
                    gender: "Male",
                    role: "Rider"
                }
            },
            { upsert: true }
        );

        console.log("Rider user seeded successfully.");

    } catch (error) {
        console.error("Rider seed error: ", error);
    }
};

export default riderSeed;
