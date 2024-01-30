const Post = require('../models/post');
const { generateToken } = require('../lib/token');

const jwt = require('jsonwebtoken');

const getAllPosts = async (req, res) => {
  if (!req.user_id) {
    return res.status(401).json({ posts: null });
  }

  const posts = await Post.find();
  const newToken = jwt.sign({ user_id: req.user_id }, process.env.JWT_SECRET);

  res.status(200).json({ posts, token: newToken });
};
const createPost = async (req, res) => {
  try {
    // Ensure 'message' field is present
    if (!req.body.message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create and save the post
    const post = new Post(req.body);
    await post.save();

    // Generate a new token
    const newToken = generateToken(req.user_id);
    res.status(201).json({ post: post, token: newToken }); // Return the post object
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
