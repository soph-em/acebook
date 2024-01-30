const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true, // Removes leading/trailing whitespace
    lowercase: true, // Converts email to lowercase
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
