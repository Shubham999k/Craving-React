import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const riderSeed = async () => {
    try {
        const checkUser = await User.findOne({ email: "rider@craving.com" });

        if (checkUser) {
            console.log("Rider user already seeded.");
            return;
        }

        const hashedPassword = await bcrypt.hash("rider123", 10);
        
        await User.create({
            fullName: "Ravi Kumar",
            email: "rider@craving.com",
            password: hashedPassword,
            dob: "1995-05-15",
            phone: "9876543210",
            gender: "Male",
            role: "Rider"
        });

        console.log("Rider user seeded successfully.");

    } catch (error) {
        console.error("Rider seed error: ", error);
    }
};

export default riderSeed;
