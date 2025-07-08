const express = require("express");
const {
  addShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
  udpateShow,
  deleteShow,
} = require("../controllers/showController");

const showRouter = express.Router();

showRouter.post("/add-show", addShow);
showRouter.get("/get-all-shows-by-theatre/:theatreId", getAllShowsByTheatre);
showRouter.get(
  "/get-all-theatres-by-movie/:movieId/:date",
  getAllTheatresByMovie
);
showRouter.get("/get-show/:showId", getShowById);
showRouter.put("/update-show/:showId", udpateShow);
showRouter.delete("/delete-show/:showId", deleteShow);

module.exports = showRouter;
