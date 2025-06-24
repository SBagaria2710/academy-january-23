const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

function middlewareFunction(req, res, next) {
  next();
}

userRouter.post("/register", middlewareFunction, registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current-user", authMiddleware, getCurrentUser);

module.exports = userRouter;
