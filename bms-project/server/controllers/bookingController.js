const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../util/EmailHelper");
const stripe = require("stripe")(
  "sk_test_51R6BX1KpJJuQX1KF7p02hefwLxDStAKh4HfBU9Xb4u1caNU31bcjwU5WarnY9xutgBN7ybnuQ9LkqrtsKmCmQrJo00FfMrIpLI"
);

const makePayment = async (req, res) => {
  try {
    console.log(req.body);
    const { token, amount } = req.body;
    console.log(token.email, token.id);

    const paymentIntent = await stripe.charges.create({
      amount,
      currency: "usd",
      receipt_email: token.email,
      source: token.id,
      description: "Booking Movie",
    });

    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message:
        "Payment Processing. You will receive a confirmation once the payment is complete.",
      data: transactionId,
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
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populateBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    await EmailHelper("ticketTemplate.html", populateBooking.user.email, {
      name: populateBooking.user.name,
      movie: populateBooking.show.movie.movieName,
      theatre: populateBooking.show.theatre.name,
      date: populateBooking.show.date,
      time: populateBooking.show.time,
      seats: populateBooking.seats.join(", "),
      amount: populateBooking.seats.length * populateBooking.show.ticketPrice,
      transactionId: populateBooking.transactionId,
    });

    res.send({
      success: true,
      message: "New Booking done",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched",
      data: bookings,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = { makePayment, bookShow, getAllBookings };
