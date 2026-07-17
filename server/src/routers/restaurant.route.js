import express from "express";
import { addMenuItem, getActiveOrders, updateOrderStatus } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/menu", addMenuItem);
router.get("/orders", getActiveOrders);
router.put("/orders/:orderId/status", updateOrderStatus);

export default router;
