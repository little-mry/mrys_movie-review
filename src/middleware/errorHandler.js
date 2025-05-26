import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  const error =
    err instanceof AppError
      ? err
      : new AppError("Internal Server Error", 500, false);

  const payload = { message: error.message, status: error.statusCode };

  res.status(error.statusCode).json(payload);
};
