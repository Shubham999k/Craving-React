import express from "express";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";
import OrderRouter from "./src/routers/order.route.js";
import CommonRouter from "./src/routers/common.route.js";
import RestaurantRouter from "./src/routers/restaurant.route.js";
import RiderRouter from "./src/routers/rider.route.js";
import AdminRouter from "./src/routers/admin.route.js";
import dbConnection from "./src/config/dbConnection.config.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import cloudinary from './src/config/cloudinary.config.js';

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/customer", OrderRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/rider", RiderRouter);
app.use("/admin", AdminRouter);

app.use("/", CommonRouter);

//default Error Handler
app.use((err, req, res, next) => {
    const ErrorMessage = err.message || "Internal Server Error";
    const ErrorStatusCode = err.statusCode || 500;
    res.status(ErrorStatusCode).json({ message: ErrorMessage });

});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log("server started in port:", port);
    dbConnection();
    try {
        const result = await cloudinary.api.ping();
        console.log("cloudinary connected", result);
    } catch (error) {
        console.log("Error while connecting to cloudinary",error);
        process.exit(1);

    }
});

