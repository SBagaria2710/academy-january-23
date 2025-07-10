const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { makePayment, bookShow, getAllBookings } = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.get("/get-all-bookings", authMiddleware, getAllBookings);
bookingRouter.post("/make-payment", authMiddleware, makePayment);
bookingRouter.post("/book-show", authMiddleware, bookShow);

module.exports = bookingRouter;