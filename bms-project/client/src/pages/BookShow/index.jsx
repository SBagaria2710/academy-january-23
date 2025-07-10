import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getShowById } from "../../apicalls/show";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { makePayment, bookShow } from "../../apicalls/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getShowDetails = async () => {
      try {
        const response = await getShowById(params.showId);
        if (response.success) {
          setShow(response.data);
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
      }
    };

    getShowDetails();
  }, []);

  // Function to generate seat layout dynamically
  const getSeats = () => {
    let columns = 12; // Number of columns for seating arrangement
    let totalSeats = show.totalSeats; // Total number of seats
    let rows = Math.ceil(totalSeats / columns); // Calculating number of rows
    return (
      <div className="d-flex flex-column align-items-center">
        <div>
          <div className="w-100 max-width-600 mx-auto mb-25px">
            <p className="text-center mb-10px">
              Screen this side, you will be watching in this direction
            </p>
            <div className="screen-div">
              {/* Placeholder for screen display */}
            </div>
          </div>
          <ul className="seat-ul justify-content-center">
            {Array.from(Array(rows).keys()).map((row) =>
              // Mapping rows
              Array.from(Array(columns).keys()).map((column) => {
                let seatNumber = row * columns + column + 1; // Calculating seat number

                let seatClass = "seat-btn"; // Default class for seat button
                if (selectedSeats.includes(seatNumber)) {
                  seatClass += " selected"; // Adding 'selected' class if seat is selected
                }
                if (show.bookedSeats.includes(seatNumber)) {
                  seatClass += " booked"; // Adding 'booked' class if seat is already booked
                }
                if (seatNumber <= totalSeats) {
                  // Rendering seat button if seat number is valid
                  return (
                    <li key={seatNumber}>
                      {/* Key added for React list rendering optimization */}
                      <button
                        style={{ color: "black" }}
                        className={seatClass}
                        onClick={() => {
                          if (show.bookedSeats.includes(seatNumber)) {
                            return;
                          }

                          // Function to handle seat selection/deselection
                          if (selectedSeats.includes(seatNumber)) {
                            setSelectedSeats(
                              selectedSeats.filter(
                                (curSeatNumber) => curSeatNumber !== seatNumber
                              )
                            );
                          } else {
                            setSelectedSeats([...selectedSeats, seatNumber]);
                          }
                        }}
                      >
                        {seatNumber}
                      </button>
                    </li>
                  );
                }
              })
            )}
          </ul>
        </div>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const bookSeatForUser = async (transactionId) => {
    try {
      const response = await bookShow({
        show: params.showId,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });

      if (response.success) {
        navigate("/profile");
      } else {
        console.error("Something went wrong", response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onToken = async (token) => {
    try {
      const response = await makePayment({
        token,
        amount: selectedSeats.length * show.ticketPrice,
      });

      if (response.success) {
        bookSeatForUser(response.data);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col gutter={24} span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.movieName}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}
                  </h3>
                </div>
              }
            >
              {getSeats()} {/* Rendering dynamic seat layout */}
              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  billingAddress
                  amount={selectedSeats.length * show.ticketPrice}
                  stripeKey="pk_test_51R6BX1KpJJuQX1KFrhGXZH5BQsUjz21mR7EO5qtGfe8GAosEPe1GYb0V2RP9hV7viZZdEz83EosZUbl5mahiFoOV00Ihrzwcyp"
                >
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default BookShow;
