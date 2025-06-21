const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User Already Exists"
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    // Register User Logic
    res.json({
      success: "true",
      message: "Registration Successful!"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: "false",
      message: "Invalid API Call",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist"
      });
    }

    if (req.body.password !== user.password) {
      return res.status(404).json({
        success: false,
        message: "Sorry, invalid password entered",
      });
    }

    // Generate JWT TOKEN
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d"
    });

    res.json({
      success: true,
      message: "Login Successful",
      data: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: "false",
      message: "Invalid API Call",
    });
  }
};

module.exports = { registerUser, loginUser };