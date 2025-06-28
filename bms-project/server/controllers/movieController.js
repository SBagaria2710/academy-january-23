const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    // Create a new movie document using the Movie Model
    const newMovie = new Movie(req.body);

    // Save the movie document
    await newMovie.save();

    // send a successful response that the operation was completed
    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({});
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.movieId, req.body);
    res.send({
      success: true,
      message: "Movie Updated!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.movieId);
  res.send({
    success: true,
    message: "Movie Deleted!",
  });
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };
