import express from "express";
import { getAllUsers, updateUserBlockStatus, getAnalytics } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/users/:userId/block", updateUserBlockStatus);
router.get("/analytics", getAnalytics);

export default router;
