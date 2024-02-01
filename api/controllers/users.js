const User = require("../models/user");

const checkEmailUniqueness = async (email) => {
  const existingEmail = await User.findOne({ email });
  return !existingEmail;
};

const checkUsernameUniqueness = async (username) => {
  const existingUsername = await User.findOne({ username });
  return !existingUsername;
};

const getUser = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("test1");
    userId = 123;
    // const userId = req.user.id;
    if (!userId) {
      console.log("Log in required");
      return res
        .status(400)
        .json({ message: "You need to be logged in to view this page" });
    }

    let user = await User.findById(mongoose.Types.ObjectId(userId));
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const username = user.username;
    res.status(200).json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
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
};

module.exports = UsersController;
