import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";


const app = express();

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);



app.get("/", (req, res) => {
    console.log("Default Get API hit");
    res.json({ message: "Welcome to my first backend Project" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server started in port:", port);
});  
