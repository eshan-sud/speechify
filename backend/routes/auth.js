// backend/routes/auth.js

const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generate JWT with an expiration of 1 hour
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, SECRET_KEY, options);
};

// Registration route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      passwordHash,
    });

    await newUser.save(); // Save the user to the database

    res.json({ message: "Signed up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
