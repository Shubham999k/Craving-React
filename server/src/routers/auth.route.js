import express from 'express';
import { LoginUser, LogoutUser, RegisterUser, UpdateProfile } from "../controllers/auth.controller.js";
import { sampleMiddleWare, sampleMiddleWare2 } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login",sampleMiddleWare2, LoginUser);
router.post("/register",sampleMiddleWare, sampleMiddleWare2,RegisterUser);
router.get("/logout",sampleMiddleWare, LogoutUser);
router.put("/update-profile", UpdateProfile);

export default router;