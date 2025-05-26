import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config.js";
import { AppError } from "../utils/AppError.js";

export const authorization = async (req, res, next) => {
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

  req.user = currentUser;

  next();
};
