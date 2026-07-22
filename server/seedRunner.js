import dbConnection from "./src/config/dbConnection.config.js";
import adminSeed from "./src/seeders/admin.Seed.js";

const run = async () => {
    try {
        await dbConnection();
        await adminSeed();
        console.log("Seeding complete. Exiting...");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

run();
