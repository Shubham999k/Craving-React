import express from "express";
import { getAvailableOrders, acceptOrder, updateDeliveryStatus } from "../controllers/rider.controller.js";

const router = express.Router();

router.get("/orders/available", getAvailableOrders);
router.post("/orders/:orderId/accept", acceptOrder);
router.put("/orders/:orderId/status", updateDeliveryStatus);

export default router;
