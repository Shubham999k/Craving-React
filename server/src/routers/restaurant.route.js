import express from "express";
import { addMenuItem, getActiveOrders, updateOrderStatus, registerRestaurant, uploadGalleryImages } from "../controllers/restaurant.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", registerRestaurant);
router.post("/menu", addMenuItem);
router.get("/orders", getActiveOrders);
router.put("/orders/:orderId/status", updateOrderStatus);
router.post("/gallery/:id", upload.array('gallery', 10), uploadGalleryImages);

export default router;
