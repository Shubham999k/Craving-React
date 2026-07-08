import dotenv from "dotenv"
dotenv.config();

import dbConnection from "../config/dbConnection.config.js";

const Seed = async () => {
    try {
        await dbConnection();
        console.log("Database connected and seeded successfully.");
    } catch (error) {
        console.error("Error connecting to database in seed script:", error);
        throw error;
    }
}

Seed();
