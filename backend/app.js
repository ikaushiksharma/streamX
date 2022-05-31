const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const path = require("path");
const fs = require("fs");
const errorMiddleware = require("./middleware/Error");

//Routes
const user = require("./Routes/userRoute");
const content = require("./Routes/contentRoute");

app.use("/api", content);
app.use("/api", user);
// MiddleWare for Errors
app.use(errorMiddleware);

module.exports = app;
