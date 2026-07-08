import dotenv from "dotenv"
dotenv.config();

import DBconnection from "../../config/db.js";

const Seed = async () => {
    try {
        await DBconnection();
        console.log("Database connected");
    } catch (error) {
        throw error;
    }
}

Seed();