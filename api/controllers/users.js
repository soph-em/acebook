const User = require("../models/user");

const checkEmailUniqueness = async (email) => {
  const existingUser = await User.findOne({ email });
  return !existingUser;
};

const create = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const isEmailUnique = await checkEmailUniqueness(email);
    if (!isEmailUnique) {
      console.log("Auth Error: Email already exists");
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = new User({ email, password });
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
};

module.exports = UsersController;