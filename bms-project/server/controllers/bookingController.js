const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

const makePayment = async (req, res) => {
  try {
    res.send({
      success: true,
      message:
        "Payment Processing. You will receive a confirmation once the payment is complete.",
      data: null,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const bookShow = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "New Booking done",
      data: null,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "Bookings fetched",
      data: null,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = { makePayment, bookShow, getAllBookings };
