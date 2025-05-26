import { Router } from "express";
import { registerUser, loginUser } from "./authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
