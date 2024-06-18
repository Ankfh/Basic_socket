const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { createToken, signup } = require("../auth/userAuth");
// const { baseUrl } = require("../baseUrl/baseUrl");

////////////////

///.............................................
const userSignup = async (req, res) => {
  try {
    let { email, password } = req.body.data;

    const hash = await signup(password);
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(201).json({
        message: "Email already exist",
        type: "email",
        success: false,
      });
    }

    const user = await User.create({
      email: email,
      password: hash,
    });

    res.status(200).json({
      message: "Registration Successfull",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message, success: false });
    // console.log(error);
  }
};

///login us
////user login ....................................
const userLogin = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(201)
        .json({ message: "Email not exist", type: "email", success: false });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({
        message: "Password Incorrect",
        type: "password",
        success: false,
      });
    }

    //create token..
    const token = createToken(user._id);

    res
      .status(200)
      .json({ message: "Login Successfull", user, token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const AllUser = await User.find({}).sort({
      createdAt: -1,
    });
    if (!AllUser) {
      return res
        .status(201)
        .json({ message: "No Product Found", success: false });
    }
    res.status(200).json({ AllUser, success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res
        .status(201)
        .json({ message: "No Such user found", success: false });
    }

    res.status(200).json({ message: "user deleted", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

const uploadPhoto = async (req, res) => {
  console.log(req.files.file);
  try {
    const images = req.files.file;

    let uploadPath;
    if (req.files.file) {
      uploadPath = await uploadImage(images);
    } else {
      return res
        .status(201)
        .json({ message: "No Photo Found", success: false });
    }

    return res.status(200).json({
      message: "image added Successfull",
      uploadPath,

      success: true,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
  }
};

module.exports = {
  userSignup,
  getAllUser,
  userLogin,
};
