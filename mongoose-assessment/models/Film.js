const mongoose = require("mongoose");

const FilmSchema = mongoose.Schema({
  title: String,
  year: Number,
  rated: String,
  runtime: Number,
  countries: Array,
  genres: Array,
  director: String,
  writers: Array,
  actors: Array,
  plot: String,
  poster: String,
  imdb: Object,
  tomato: Object,
  metacritic: Number,
  awards: Object,
  type: String,
});

module.exports = mongoose.model("Films", FilmSchema);
