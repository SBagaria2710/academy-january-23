const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();

    res.send({
      success: true,
      message: "New Theatre was added successfully!"
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const theatreExists = await Theatre.findById(req.params.theatreId);

    if (!theatreExists) {
      return res.status(404).send({
        success: false,
        message: "Theatre was not found"
      });
    }

    await Theatre.findByIdAndUpdate(req.params.theatreId, req.body);

    res.send({
      success: true,
      message: "Theatre was updated successfully"
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const theatreExists = await Theatre.findById(req.params.theatreId);

    if (!theatreExists) {
      return res.status(404).send({
        success: false,
        message: "Theatre was not found",
      });
    }

    await Theatre.findByIdAndDelete(req.params.theatreId);

    res.send({
      success: true,
      message: "Theatre was delete successfully",
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const allTheatres = await Theatre.find({}).populate("owner");
    res.send({
      success: true,
      message: "All theatres fetched",
      data: allTheatres
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const getAllTheatresForAnOwner = async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      message: "All theatres fetched",
      data: allTheatres,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresForAnOwner,
};
