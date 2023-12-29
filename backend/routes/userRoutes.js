import express from "express";
import {
  authUser,
  updateUser,
  getUserById,
  deleteUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  registerUser
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers)
router.post('/login',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

export default router;