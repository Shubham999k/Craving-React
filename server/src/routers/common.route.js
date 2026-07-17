import express from "express";
import { checkServerStatus } from "../controllers/common.controller.js";

const router = express.Router();

router.get("/", checkServerStatus);

export default router;
