const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "USE STRIPE SECRET KEY"
);

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/make-payment", async (req, res) => {
  try {
    const { token, amount } = req.body;
    console.log(token.email, token.id);

    const paymentIntent = await stripe.charges.create({
      amount: amount, // Amount always needs to be in cents
      currency: "usd",
      receipt_email: token.email,
      source: token.id,
      description: "Booking Movie Testing",
    });

    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message:
        "Payment processing. You will receive a confirmation from your bank once the amount is deducted.",
      transactionId: transactionId,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

app.get("/api/send-email", async (req, res) => {
  try {
    const mailOptions = {
      from: "shashwatbagaria5@gmail.com",
      to: "shashwat.bagaria_1@scaler.com",
      subject: "Welcome to Scaler, buddy",
      html: `<h3>Welcome to Scaler, ${req.body.name}</h3><p>Thank you for sigining up. We hope you enjoy learning with us.</p>`
    };

    // Setup the transport details using SendGrid
    const smtpServerVendor = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: "USE SENDGRID KEY",
      },
    });

    // Send the email using the transporter
    const info = await smtpServerVendor.sendMail(mailOptions);
    console.log("Email Sent", info.messageId);

    res.send({
      message: "Mail Sent!",
      id: info.messageId
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "Message could not be sent",
      details: err.message
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ message: "All good!" });
});

app.use((req, res) => {
  res.status(404).send("Page not found!!!");
});

app.listen(8082, () => {
  console.log("Server is running");
});
