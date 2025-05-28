import { AppError } from "../../utils/AppError.js";
import Movie from "./movieModel.js";
import Review from "../reviews/reviewModel.js";

export const addMovie = async (req, res, next) => {
  const { title, director, releaseYear, genre } = req.body;

  const movie = await Movie.create({ title, director, releaseYear, genre });

  res.status(201).json({
    success: true,
    data: {
      movie: {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        releaseYear: movie.releaseYear,
      },
    },
  });
};

export const getAllMovies = async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    success: true,
    data: {
      movies: movies,
    },
  });
};

export const findMovieById = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await Movie.findById(movieId);
  if (!movie) return next(new AppError("Filmen hittades inte", 404));

  res.status(200).json({
    success: true,
    data: movie,
  });
};

export const updateMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  const update = req.body;

  const movie = await Movie.findByIdAndUpdate(movieId, update, { new: true });
  if (!movie)
    return next(new AppError("Filmen att uppdatera hittades inte", 404));

  res.status(200).json({
    success: true,
    data: movie,
  });
};

export const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  const deleted = await Movie.findByIdAndDelete(movieId);

  if (!deleted)
    return next(new AppError("Filmen att radera hittades inte", 404));

  res.status(200).json({
    success: true,
    data: {
      deleted: deleted.title,
    },
  });
};

export const getMovieReviews = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await Movie.findById(movieId);
  if (!movie) return next(new AppError("Filmen hittades inte", 404));

  const reviews = await Review.find({ movieId })
    .populate("userId", "username")
    .lean();

  res.status(200).json({
    success: true,
    data: {
      movie: {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        releaseYear: movie.releaseYear,
      },
      reviews: reviews,
    },
  });
};
