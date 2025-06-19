const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");

require("dotenv").config();
require("./config/db");

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(8082, () => {
  console.log("Server is running");
});