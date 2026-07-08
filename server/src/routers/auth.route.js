import express from 'express';
import { ForgotPassword, LoginUser, LogoutUser, RegisterUser, ResetPassword, UpdateProfile } from "../controllers/auth.controller.js";
import { sampleMiddleWare, sampleMiddleWare2 } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login",sampleMiddleWare2, LoginUser);
router.post("/register",sampleMiddleWare, sampleMiddleWare2,RegisterUser);
router.get("/logout",sampleMiddleWare, LogoutUser);
router.put("/update-profile", UpdateProfile);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password/:token", ResetPassword);

export default router;