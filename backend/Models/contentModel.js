const mongoose = require("mongoose");
const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  path: {
    type: String,
    required: [true, "Please Enter Path of Video"],
    unique: true,
  },
  genre: {
    type: String,
    required: [true, "Please Enter Genre"],
  },
  length: {
    type: Number,
    required: [true, "Please Enter Length of Video"],
  },
  year: {
    type: Number,
    required: [true, "Please Enter Year of Release"],
  },
  imdbRating: {
    type: Number,
    required: [true, "Please Enter Valid Rating"],
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
    required: [true, "Please Enter Thumbnail Link"],
  },
  trailer: {
    type: String,
    required: [true, "Please Enter Trailer Link"],
  },
});
mongoose.models = {};
module.exports = mongoose.model("Content", contentSchema);
