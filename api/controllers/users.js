const User = require("../models/user");

const checkEmailUniqueness = async (email) => {
  const existingEmail = await User.findOne({ email });
  return !existingEmail;
};

const checkUsernameUniqueness = async (username) => {
  const existingUsername = await User.findOne({ username });
  return !existingUsername;
};

const checkPasswordValidity = async (password) => {
  let passwordValid = false;
  if (password.length >= 8) {
    passwordValid = true;
    return passwordValid;
  }
  return passwordValid;
};

const getUser = async (req, res) => {
  // console.log(req.user_id);
  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the user profile information you wish to expose
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user" });
  }
};

const create = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password || !username) {
      console.log("Auth Error: Email and password are required");
      return res
        .status(400)
        .json({ message: "Email, username, and password are required" });
    }

    const isUsernameUnique = await checkUsernameUniqueness(username);
    if (!isUsernameUnique) {
      console.log("Auth Error: Username already exists");
      return res.status(409).json({ message: "Username already exists" });
    }

    const isEmailUnique = await checkEmailUniqueness(email);
    if (!isEmailUnique) {
      console.log("Auth Error: Email already exists");
      return res.status(409).json({ message: "Email already exists" });
    }

    const isPasswordValid = await checkPasswordValidity(password);
    if (!isPasswordValid) {
      console.log("Auth Error: Password does not meet requirements");
      return res
        .status(401)
        .json({ message: "Password does not meet requirements" });
    }

    const user = new User({ username, email, password });
    await user.save();

    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const UsersController = {
  create: create,
  getUser: getUser,
  getUserById: getUserById,
};

module.exports = UsersController;
