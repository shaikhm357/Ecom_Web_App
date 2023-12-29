import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    // set jwt as httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    });

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
  res.send("Register user");
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
  res.send("Get user profile");
});

// @desc    update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
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
