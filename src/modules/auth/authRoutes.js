import { Router } from "express";
import { registerUser, loginUser } from "./authController";
import { CatchAsync } from "../../utils/CatchAsync.js";
import  validate  from "../../middleware/validate.js";
import { registerUserSchema, loginUserSchema } from "../../validation/userValidation.js";

const router = Router();

router.post("/register", validate(registerUserSchema, 'body'), CatchAsync(registerUser));
router.post("/login", validate(loginUserSchema, 'body'), CatchAsync(loginUser));

export default router;
