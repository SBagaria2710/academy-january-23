const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    
    // Hash the password before saving onto the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
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

    // Validate Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Sorry, invalid password entered"
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

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };