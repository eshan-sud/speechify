// backend/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define a schema for the User model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Add a method to the user schema to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
