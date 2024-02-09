const { generateHash } = require("../encryption/passwords");
const User = require("../models/user");
const sendEmail = require('./sendingEmail')
const DEFAULT_PFP = "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png"



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

const putUser = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let imageUrl = null;
    if (req.body.image) {
      console.log(req.file);
      // If image added, save the image URL
      imageUrl = req.body.image;
      // imageUrl = req.file.secure_url;
    } else {
      res.status("500 - image missing");
    }
    user.image = imageUrl;
    user.save();
    res
      .status(200)
      .json({ username: user.username, email: user.email, image: user.image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  // console.log(req.user_id);
  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the user profile information you wish to expose
    res
      .status(200)
      .json({ username: user.username, email: user.email, image: user.image });
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

    const image = DEFAULT_PFP;


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


    // Hashing the password before saving the user to the database
    const hashedPassword = generateHash(password)
    
    // Changing the password value to take the value from hashedPassword
    const user = new User({ username, email, password:hashedPassword, image });
    
    await user.save();

    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
    if (res.status(201)) {
      sendEmail(email, username);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const UsersController = {
  create: create,
  getUser: getUser,
  putUser: putUser,
  getUserById: getUserById,
};

module.exports = UsersController;
