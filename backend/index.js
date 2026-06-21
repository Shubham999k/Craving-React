import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

app.get("/", (req, res) => {
    console.log("Default Get API hit");
    res.json({ message: "Welcome to my first backend Project" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server started in port:", port);
}); 