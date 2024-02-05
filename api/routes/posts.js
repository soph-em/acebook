const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const PostsController = require("../controllers/posts");

router.get("/", tokenChecker, PostsController.getAllPosts);
router.post("/", tokenChecker, PostsController.createPost);
router.delete("/posts/postId", tokenChecker, PostsController.deletePost);

module.exports = router;
