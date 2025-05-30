import jwt from "jsonwebtoken";
import { jwtSecret, tokenExpiry } from "../../config/config.js";
import AppError from "../../utils/AppError.js";
import User from "./authModel.js";

const signToken = (id, role) =>
  jwt.sign({ id, role }, jwtSecret, { expiresIn: tokenExpiry });

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

  const user = await User.create({ username, email, password });
  const token = signToken(user.id, user.role);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token,
    },
  });
};

export const loginUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  const optional = email ? { email } : { username };
  const user = await User.findOne(optional).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Felaktiga inloggningsuppgifter", 401));
  }

  const token = signToken(user.id, user.role);

  res.status(200).json({
    success: true,
    token: token,
  });
};

export const promoteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new AppError("Användaren hittades inte", 404));

  user.role = "admin";
  await user.save();

  res.status(200).json({
    success: true,
    message: "Användaren är uppgraderad till admin",
    data: user,
  });
};
