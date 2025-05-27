import { AppError } from "../../utils/AppError.js";
import  Movie from "./movieModel.js";

export const addMovie = async (req, res, next) => {
  const { title, director, releaseYear, genre } = req.body;

  const movie = await Movie.create({title, director, releaseYear, genre})

  res.status(201).json({
    success: true,
    data: {
        movie: {
            id: movie.id,
            title: movie.title,
            director: movie.director,
            releaseYear: movie.releaseYear
        }
    }
  })
};

export const getAllMovies = async (req, res, next) => {};

export const findMovieById = async (req, res, next) => {};

export const updateMovieById = async (req, res, next) => {};

export const deleteMovieById = async (req, res, next) => {};

export const getMovieReviews = async (req, res, next) => {};
