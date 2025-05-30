import AppError from "../../utils/AppError.js";
import Review from "./reviewModel.js";
import Movie from "../movies/movieModel.js";

//OPEN ACCESS:
export const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find().populate(
    "movieId",
    "title director releaseYear genre"
  );

  res.status(200).json({
    success: true,
    data: {
      reviews,
    },
  });
};

export const findReviewById = async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id)
    .populate("movieId", "title director releaseYear genre")
    .populate("userId", "username");

  if (!review) return next(new AppError("Recension hittades inte", 404));

  res.status(200).json({
    success: true,
    data: review,
  });
};

//USER ONLY:
export const addReview = async (req, res, next) => {
  const userId = req.user.id;
  const { movieId, rating, comment } = req.body;

  const movie = await Movie.findById(movieId);
  if (!movie) return next(new AppError("Filmen finns inte", 404));

  const review = await Review.create({ userId, movieId, rating, comment });

  res.status(201).json({
    success: true,
    message: "Recension tillagd",
    data: {
      movie: {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        releaseYear: movie.releaseYear,
      },
      review,
    },
  });
};

export const updateReviewById = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  const review = await Review.findByIdAndUpdate(id, update, {
    new: true,
  }).populate("movieId", "title director releaseYear genre");

  if (!review)
    return next(
      new AppError("Recensionen du vill uppdatera hittades inte", 404)
    );

  res.status(200).json({
    success: true,
    message: "Recension uppdaterad",
    data: review,
  });
};

export const deleteReviewById = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await Review.findByIdAndDelete(id);

  if (!deleted)
    return next(new AppError("Recension du vill radera hittades inte", 404));

  const movie = await Movie.findById(deleted.movieId);

  res.status(200).json({
    success: true,
    message: "Recension raderad",
    data: {
      deleted: deleted,
      movie: { id: movie.title, title: movie.title },
    },
  });
};
