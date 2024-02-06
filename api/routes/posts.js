const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const PostsController = require("../controllers/posts");

router.get("/", tokenChecker, PostsController.getAllPosts);
router.post("/", tokenChecker, PostsController.createPost);
<<<<<<<<< Temporary merge branch 1
router.delete("/:postId", tokenChecker, PostsController.deletePost);
=========
router.put('/like/:id', tokenChecker, PostsController.updateLikes);
>>>>>>>>> Temporary merge branch 2

module.exports = router;
