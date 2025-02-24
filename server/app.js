const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/products", productRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(`${err}. did/ not connect!!`);
    process.exit(1);
  });

module.exports = app;
