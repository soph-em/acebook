const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true, // Removes leading/trailing whitespace
    lowercase: true,
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
  image: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectID,
      ref: "UserId",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectID,
      ref: "UserId",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectID,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
