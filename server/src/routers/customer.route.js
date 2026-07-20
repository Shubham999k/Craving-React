import express from "express";
import { createOrder, getUserOrders } from "../controllers/customer.controller.js";

const router = express.Router();
router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);

export default router;
