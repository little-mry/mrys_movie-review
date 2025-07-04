import "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import  errorHandler  from "./middleware/errorHandler.js";
import authRouter from "./modules/auth/authRoutes.js";
import moviesRouter from "./modules/movies/movieRoutes.js";
import reviewsRouter from "./modules/reviews/reviewRoutes.js";

const app = express();
const port = process.env.PORT || 3030;
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use("/auth", authRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use((req, res, next) => {
  next(new AppError(`Kan inte hitta ${req.originalUrl}`, 404));
}); 

app.use(errorHandler);

app.listen(port, () => console.log(`Servern körs på http://localhost:${port}`));
