const express = require("express");
const tokenChecker = require("../middleware/tokenChecker");
const UsersController = require("../controllers/users");
const PostsController = require("../controllers/posts");

const router = express.Router();

router.post("/", UsersController.create);
router.put("/", tokenChecker, UsersController.putUser);
router.get("/profile", tokenChecker, UsersController.getUser);
router.get("/:userId", tokenChecker, UsersController.getUserById);
router.get("/posts", tokenChecker, PostsController.getPostsbyId);

module.exports = router;
