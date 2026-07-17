import mongoose from "mongoose";

export const checkServerStatus = (req, res) => {
    console.log("Default Get API hit");
    res.status(200).json({ message: "Welcome to Cravings Project" });
};

export const checkHealth = (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.status(200).json({
        server: "Running",
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
};
