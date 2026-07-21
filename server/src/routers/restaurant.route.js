import express from "express";
import { addMenuItem, getActiveOrders, updateOrderStatus, registerRestaurant } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/register", registerRestaurant);
router.post("/menu", addMenuItem);
router.get("/orders", getActiveOrders);
router.put("/orders/:orderId/status", updateOrderStatus);

export default router;
