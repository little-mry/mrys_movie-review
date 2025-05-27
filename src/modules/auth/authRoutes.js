import { Router } from "express";
import { registerUser, loginUser } from "./authController";
import { CatchAsync} from '../../utils/CatchAsync.js'

const router = Router();

router.post("/register", CatchAsync(registerUser));
router.post("/login", CatchAsync(loginUser));

export default router;
