import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config.js";
import AppError from "../utils/AppError.js";
import User from "../modules/auth/authModel.js";

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Åtkomst nekad", 401));

    const decoded = jwt.verify(token, jwtSecret);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
      return next(new AppError("Det finns ingen användare med detta id", 401));

    req.user = { id: currentUser._id, role: currentUser.role };

    next();
  } catch (error) {
    console.error("JWT error:", error);
    res.status(401).json({ error: "Ogiltig eller utgången token" });
  }
};

export default authorization;
