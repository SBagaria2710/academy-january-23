const express = require("express");
const {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresForAnOwner
} = require("../controllers/theatreController");

const theatreRouter = express.Router();

theatreRouter.post("/add-theatre", addTheatre);
theatreRouter.put("/update-theatre/:theatreId", updateTheatre);
theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);
theatreRouter.get("/get-all-theatres", getAllTheatres);
theatreRouter.get("/get-all-theatres/:ownerId", getAllTheatresForAnOwner);

module.exports = theatreRouter;
