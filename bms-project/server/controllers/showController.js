const Show = require("../models/showModel");

const addShow = async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.status(200).json({
      success: true,
      message: "New show has been added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add show",
    });
  }
};

const getAllShowsByTheatre = async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.params.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTheatresByMovie = async (req, res) => {
  try {
    const { movieId, date } = req.params;
    const shows = await Show.find({
      movie: movieId,
      date: new Date(date).toISOString(),
    }).populate("theatre");

    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );

      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "All shows fetched",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "",
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const shows = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const udpateShow = async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.params.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.send({
      success: true,
      message: "The show has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
  udpateShow,
  deleteShow,
};
