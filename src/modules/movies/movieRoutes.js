import { Router } from "express";
import CatchAsync from "../../utils/CatchAsync.js";
import authorization from "../../middleware/authMiddleware.js";
import validate from "../../middleware/validate.js";
import {
  movieSchema,
  updateMovieSchema,
  movieIdSchema,
} from "../../validation/movieValidation.js";
import {
  addMovie,
  getAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
  getMovieReview,
} from "./movieController.js";

const router = Router();

router.use(authorization);

//Post a movie
router.post("/", validate(movieSchema, "body"), CatchAsync(addMovie));

//Get all movies
router.get("/", CatchAsync(getAllMovies));

//Get a movie by id
router.get(
  "/:id",
  validate(movieIdSchema, "params"),
  CatchAsync(findMovieById)
);

//Update a movie by id
router.put(
  "/:id",
  validate(movieIdSchema, "params"),
  validate(updateMovieSchema),
  CatchAsync(updateMovieById)
);

//Delete a movie by id
router.delete(
  "/:id",
  validate(movieIdSchema, "params"),
  CatchAsync(deleteMovieById)
);

//Get a movie's reviews by id
router.get(
  "/:id/reviews",
  validate(movieIdSchema, "params"),
  CatchAsync(getMovieReview)
);

export default router;
