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

const followUser = async (req, res) => {
  try {
    // Follow a user
    const userToFollowId = req.params.userId;

    // Find the current user
    const currentUser = await User.findById(req.user_id);

    // Check if the user to follow exists
    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User to follow not found" });
    }

    // Check if the current user exists
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Check if the user is already being followed
    if (currentUser.followers.includes(userToFollowId)) {
      return res.status(400).json({ message: "User already being followed" });
    }

    // Add the user to follow to the followers array of the current user
    currentUser.followers.push(userToFollowId);

    // Save the changes to the current user
    await currentUser.save();

    // Respond with a success message
    res.status(200).json({ message: "Successfully followed user" });
  } catch (error) {
    console.error(error);
    // Respond with an internal server error if an error occurs
    res.status(500).json({ message: "Internal server error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    // Unfollow a user
    const userToUnfollowId = req.params.userId;

    // Find the current user
    const currentUser = await User.findById(req.user_id);

    // Check if the user to unfollow exists
    const userToUnfollow = await User.findById(userToUnfollowId);
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User to unfollow not found" });
    }

    // Check if the current user exists
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Check if the user is in the followers array
    if (!currentUser.followers.includes(userToUnfollowId)) {
      return res.status(400).json({ message: "User is not being followed" });
    }

    // Remove the user to unfollow from the followers array of the current user
    currentUser.followers = currentUser.followers.filter(
      (userId) => userId !== userToUnfollowId
    );

    // Save the changes to the current user
    await currentUser.save();

    // Respond with a success message
    res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    console.error(error);
    // Respond with an internal server error if an error occurs
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "followers",
      "username"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "following",
      "username"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UsersController = {
  create: create,
  getUser: getUser,
  putUser: putUser,
  getUserById: getUserById,
  followUser: followUser,
  unfollowUser: unfollowUser,
  getFollowers: getFollowers,
  getFollowing: getFollowing,
};

module.exports = UsersController;
