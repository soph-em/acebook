const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const PostsController = require("../controllers/posts");

router.get("/", tokenChecker, PostsController.getAllPosts);
router.post("/", tokenChecker, PostsController.createPost);

module.exports = router;
