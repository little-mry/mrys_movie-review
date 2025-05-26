import jwt from "jsonwebtoken";
import { jwtSecret, tokenExpiry } from "../../config/config.js";
import { AppError } from "../../utils/AppError.js";
import { User } from "./authModel.js";

const signToken = (username, id) =>
  jwt.sign({ username, id }, jwtSecret, { expiresIn: tokenExpiry });

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return next(
      new AppError(
        "Mailadressen eller användarnamnet finns redan registrerat",
        409
      )
    );
  }

  const user = await User.create({username, email, password})
  const token = signToken(user.id, user.username)
};
