const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

function middlewareFunction(req, res, next) {
  next();
}

userRouter.post("/register", middlewareFunction, registerUser);
userRouter.post("/login", loginUser);
userRouter.patch("/forgetpassword", forgetPassword);
userRouter.patch("/resetpassword", resetPassword);
userRouter.get("/current-user", authMiddleware, getCurrentUser);

module.exports = userRouter;
