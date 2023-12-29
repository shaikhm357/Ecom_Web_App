import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //generate token
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User already exists");
  }
  // create user
  const user = await User.create({
    name,
    email,
    password
  });

  // check if user created
  if (user) {
    //generate token once user is created
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user and clear cookies
// @route   Post /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // cleat the stored cookie
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  //check if user exists
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    if (req.body.password) {
      user.password = req.body.password;
    }
    // update the user details
    const updatedUser = await user.save();

    // send the res
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    get users
// @route   Get /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users admin");
});

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

// @desc    Get user by id
// @route   Get /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by id");
});

// @desc    update user
// @route   Put /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user admin");
});

export {
  authUser,
  updateUser,
  getUserById,
  deleteUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  registerUser
};
