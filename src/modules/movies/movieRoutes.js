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
  getMovieReviews,
  getMovieRating
} from "./movieController.js";

const router = Router();



//Post a movie
router.post(
  "/",
  authorization,
  validate(movieSchema, "body"),
  CatchAsync(addMovie)
);

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
  authorization,
  validate(movieIdSchema, "params"),
  validate(updateMovieSchema),
  CatchAsync(updateMovieById)
);

//Delete a movie by id
router.delete(
  "/:id",
  authorization,
  validate(movieIdSchema, "params"),
  CatchAsync(deleteMovieById)
);

//Get a movie's reviews
router.get(
  "/:id/reviews",
  validate(movieIdSchema, "params"),
  CatchAsync(getMovieReviews)
);

//Get a movie's avarage rating
router.get('/:id/ratings',
  validate(movieIdSchema, "params"),
  CatchAsync(getMovieRating)

)

export default router;
