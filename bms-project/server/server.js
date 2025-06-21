const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");

require("dotenv").config();
require("./config/db");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

app.listen(8082, () => {
  console.log("Server is running");
});