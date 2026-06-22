import express from 'express';
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.post("/register", RegisterUser);

export default router;


