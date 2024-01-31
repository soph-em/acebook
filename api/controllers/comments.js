const { get } = require("mongoose");
const Comment = require("../models/comment");
const Post = require("../models/post");

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { message } = req.body;

    // check the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }

    // create & save comment
    const newComment = new Comment({
      message: message,
      createdBy: req.user_id,
      post: postId, // associate comment with post
    });
    await newComment.save();

    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId }).populate(
      "createdBy",
      "username"
    );
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CommentsContoller = {
  createComment: createComment,
  getCommentsByPost: getCommentsByPost,
};

module.exports = CommentsContoller;
