import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./src/config/dbConnection.config.js";
import adminSeed from "./src/seeders/admin.Seed.js";
import riderSeed from "./src/seeders/rider.Seed.js";
import userSeed from "./src/seeders/userSeed.js";

const run = async () => {
    try {
        await dbConnection();
        await adminSeed();
        await riderSeed();
        await userSeed();
        console.log("Seeding complete. Exiting...");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();
