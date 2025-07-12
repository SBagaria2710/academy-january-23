const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const otpGenerator = require("../util/otpGenerator");
const EmailHelper = require("../util/EmailHelper");

const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User Already Exists",
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
      message: "Registration Successful!",
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
        message: "user does not exist",
      });
    }

    // Validate Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Sorry, invalid password entered",
      });
    }

    // Generate JWT TOKEN
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
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
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

const forgetPassword = async (req, res) => {
  try {
    /**
     * 1. Extract email from request
     * 2. Check if mail is present in DB or not.
     *  2.1: If email is not present -> send a response to the user (early return)
     * 3. if email is present -> create a basic otp using otpGenerator utility function and send the email
     * 4. Also, store the otp -> in the DB against the user who owns that email
     */
    if (req.body.email === undefined) {
      return res.status(401).json({
        success: false,
        message: "Please, enter the email for forget password",
      });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user === null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // We got the user. Now, let's generate the OTP.
    const otp = otpGenerator();

    // Save the OTP in DB
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // Now + 10 minutes
    await user.save();

    res.send({
      success: true,
      message: `OTP sent to the email: ${req.body.email}`,
    });

    // Send the email
    await EmailHelper("otp.html", user.email, { name: user.name, otp });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    let resetDetails = req.body;
    if (!resetDetails.password || !resetDetails.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const user = await User.findOne({ otp: resetDetails.otp });
    if (user === null) {
      return res.status(400).json({
        success: false,
        message: "OTP didn't match",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // Hash the password before saving onto the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(resetDetails.password, salt);
    resetDetails.password = hashedPassword;

    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.send({
      success: true,
      message: "Password reset was successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  forgetPassword,
  resetPassword,
};
