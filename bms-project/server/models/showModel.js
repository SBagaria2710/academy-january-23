const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: Array, default: [] },
  },
  { timestamps: true }
);

const showModel = mongoose.model("shows", showSchema);
module.exports = showModel;
