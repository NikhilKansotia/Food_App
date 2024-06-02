const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
async function registerController(req, res) {
  try {
    // console.log(req.body);
    //validation
    const { userName, email, password, address, phone, answer } = req.body;
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //check exisiting user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email is already registered",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //createUser
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    res.send(500).send({
      success: false,
      message: "Error in regiter API",
      error,
    });
  }
}
async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //checkUser
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check user password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch, password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    res.send(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
}
module.exports = { registerController, loginController };
