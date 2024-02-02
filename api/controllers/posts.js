const Post = require('../models/post');
const { generateToken } = require('../lib/token');
const { post, request } = require('../app');

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
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

const updateLikes = async (req, res) => {
  const posts = await Post.findById(req.params.postId);
  res.status(200).json({ posts, user: req.body.userId });
  //add to likes array of post found, updates in db
  //mongoose db find update - documentation
  /*try {
    if (!req.body.userId) {
      return res.status(400).json({ error: 'Not Liked' });
    }

    const postToLike = await Post.findById(req.params.postId);
  
  if (postToLike.likes.find(x => x.id === request.body.userId))
  {
    postToLike.likes = postToLike.likes.filter(x => x.id !== request.body.userId)
  } else {
    postToLike.likes = [...postToLike.likes, req.body.userId]
    
  }
  return res.status(203)
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }*/
}
// find user
// put into likes array
// know which post liking

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updateLikes: updateLikes,
};



module.exports = PostsController;
