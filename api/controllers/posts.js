const Post = require('../models/post');
const { generateToken } = require('../lib/token');

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  // const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts });
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
