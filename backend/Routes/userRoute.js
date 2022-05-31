const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
} = require("../controllers/userController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
module.exports = router;
