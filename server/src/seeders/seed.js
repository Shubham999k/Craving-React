import dotenv from "dotenv"
dotenv.config();

import dbConnection from "../config/dbConnection.config.js";
import adminSeed from "./adminSeed.js";
import userSeed from "./userSeed.js";

const Seed = async () => {
    try {
        await dbConnection();
        console.log("Database connected successfully");
        
        await adminSeed();
        await userSeed();

        console.log("All seeders executed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error connecting to database in seed script:", error);
        process.exit(1);
    }
}

Seed();
