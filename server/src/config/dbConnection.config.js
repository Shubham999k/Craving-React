import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully");
        console.log("DB Host :", conn.connection.host);
        console.log("DB Name :", conn.connection.name);
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
        process.exit(1);
    }
}

export default dbConnection;
