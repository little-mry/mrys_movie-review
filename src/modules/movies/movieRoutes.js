import { Router } from "express";
import CatchAsync from "../../utils/CatchAsync.js";
import { authorization } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validate.js";
import {
  addMovie,
  getAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
  getMovieReview,
} from "./movieController.js";

const router = Router();

//Post a movie
router.post("/", CatchAsync(addMovie));

//Get all movies
router.get("/");

//Get a movie by id
router.get("/:id");

//Update a movie by id
router.put("/:id");

//Delete a movie by id
router.delete("/:id");

//Get a movie's reviews by id
router.get("/:id/reviews");

export default router;
