import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";
import dbConnection from "./src/config/dbConnection.config.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

app.get("/", (req, res) => {
    console.log("Default Get API hit");
    res.json({ message: "Welcome to Cravings Project" });
});

//default Error Handler
app.use((err, req, res, next) => {
    const ErrorMessage = err.message || "Internal Server Error";
    const ErrorStatusCode = err.statusCode || 500;
    res.status(ErrorStatusCode).json({ message: ErrorMessage });

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server started in port:", port);
    dbConnection();
});

