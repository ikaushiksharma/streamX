const express = require("express");
const {
  getContent,
  getAllContent,
  createContent,
} = require("../controllers/contentController");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const router = express.Router();
router.route("/content/:id").get(isAuthenticatedUser, getContent);
router.route("/content").get(isAuthenticatedUser, getAllContent);
router.route("/content/new").post(createContent);
module.exports = router;
