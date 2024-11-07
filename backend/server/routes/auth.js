// backend/server/routes/auth.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const recordingsDir = path.join(__dirname, "../../recordings");

// Registration route
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const userDir = path.join(recordingsDir, email);

  if (fs.existsSync(userDir)) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create folder and save password
  fs.mkdirSync(userDir);
  fs.writeFileSync(path.join(userDir, "password.txt"), password);
  res.json({ message: "Signed up successfully" });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const userDir = path.join(recordingsDir, email);

  if (!fs.existsSync(userDir)) {
    return res.status(400).json({ message: "User not found" });
  }

  const savedPassword = fs.readFileSync(
    path.join(userDir, "password.txt"),
    "utf8"
  );

  if (savedPassword !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Logged in successfully" });
});

module.exports = router;
