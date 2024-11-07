// backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/auth");
const audioRoutes = require("./routes/audio");
const modelRoutes = require("./routes/model");

const logsDir = path.join(__dirname, "./logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection using Mongoose
async function connectDatabase() {
  try {
    const dbUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/speechify";
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB server.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

// Initialize MongoDB connection
connectDatabase();

// Express routing
app.use("/api", authRoutes); // Authentication routes
app.use("/api", audioRoutes); // Audio-related routes
app.use("/api", modelRoutes); // Model-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
