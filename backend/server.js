const app = require("./app");
const connectDataBase = require("./config/database");
require("dotenv").config({ path: "backend/config/.env" });

// handling uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("welcome to a simple HTTP cookie server");
});
// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
