const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");

require("dotenv").config();
require("./config/db");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

app.get("/health", (req, res) => {
  res.status(200).send("Service is healthy!");
});

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(8082, () => {
  console.log("Server is running");
});