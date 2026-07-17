import express from "express";
import { checkServerStatus, checkHealth } from "../controllers/common.controller.js";

const router = express.Router();

router.get("/", checkServerStatus);
router.get("/health", checkHealth);

export default router;
