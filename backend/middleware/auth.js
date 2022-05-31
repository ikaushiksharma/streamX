const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});
