import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Titel måste anges"],
      trim: true,
      maxlength: [150, "Titeln kan inte vara längre än 150 tecken"],
    },
    director: {
      type: String,
      trim: true,
      required: [true, "Regissör måste anges"],
    },
    releaseYear: {
      type: Number,
      min: [1888, "Inga filmer gjordes före 1888!"],
      max: [new Date().getFullYear, "Releasedatum kan inte vara i framtiden"],
    },
    genre: {
      type: [String],
      enum: {
        values: [
          "Action",
          "Drama",
          "Komedi",
          "Sci-fi",
          "Skräck",
          "Thriller",
          "Äventyr",
          "Fantasy",
          "Dokumentär",
        ],
        message: "Ogiltig genre: `{VALUE}`",
      },
      required: [true, "Minst en genre måste anges"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false, // versionKey ser ut såhär: __v: 9843543ndfsi7984nlkd9823. här säger man att den inte ska skickas med i ett api-anrop
      transform: (_, ret) => { //ändrar mongoDBs id från: _id --> id. (ret.id står får return id)
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//SLugify??

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
