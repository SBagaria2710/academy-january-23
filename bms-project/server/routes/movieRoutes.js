const express = require("express");
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie/:movieId", updateMovie);
movieRouter.delete("/delete-movie/:movieId", deleteMovie);

module.exports = movieRouter;
