const Content = require("../Models/contentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const path = require("path");
const fs = require("fs");

exports.createContent = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const content = await Content.create(req.body);
  res.status(201).json({
    success: true,
    content,
  });
});

exports.getAllContent = catchAsyncErrors(async (req, res, next) => {
  const contentCount = await Content.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  const allContent = await apiFeature.query;
  res.status(200).json({ success: true, allContent, contentCount });
});
exports.getContent = catchAsyncErrors(async (req, res, next) => {
  const content = await Content.findById(req.params.id);
  if (!content) {
    return next(new ErrorHandler("content not found", 404));
  }
  res.status(200).json({
    success: true,
    content,
  });
});
exports.playVideo = catchAsyncErrors(async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const content = await Content.findById(req.params.id);
  const address = content.path;
  const videoPath = path.normalize(address);
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 4;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});
