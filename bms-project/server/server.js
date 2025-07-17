const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

require("dotenv").config();

// Conect to DB
require("./config/db.js");

const app = express();

app.use(helmet());
app.disable("x-powered-by"); // it will remove the x-powered-by header from the response

// Sanitize user input to prevent MongoDB Operator Injection
app.use(mongoSanitize());

// Custom Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com", "scaler.com"], // Allow scripts from 'self', example.com, and scaler.com
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "example.com", "m.media-amazon.com"], // Allow images from 'self', data URLs, and example.com
      connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);

// Rate Limiter Middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs (defined above)
  message: "Too many requests from this IP. Please, try again in 15 minutes",
});

app.use(express.json());
app.use(cors());

// Apply rate limiter to all API routes
app.use("/api/", apiLimiter);

app.use("/api/users", userRouter); // Route for all user operations
app.use("/api/movies", movieRouter); // Route for all movie operations
app.use("/api/theatre", theatreRouter); // Route for all theatre operations
app.use("/api/shows", showRouter); // Route for all show operation
app.use("/api/booking", bookingRouter); // Route for all booking operation

app.listen(8082, () => {
  console.log("Server is running");
});

const publicPath = path.join(__dirname, "../client/dist");
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use((req, res) => {
  res.status(404).send("Page not found!!!");
});