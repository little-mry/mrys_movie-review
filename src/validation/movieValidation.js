import Joi from "joi";

export const movieSchema = Joi.object({
    
});

export const movieIdSchema = Joi.object({
  movieId: Joi.string().length(24).hex().required().messages({
    "string.hex": "movieId måste vara en giltig hex-sträng",
    "any.required": "movieId saknas",
  }),
});
