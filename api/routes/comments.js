const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");
const CommentsController = require("../controllers/comments");

router.get(
  "/:postId/comments",
  tokenChecker,
  CommentsController.getCommentsByPost
);
router.post(
  "/:postId/comments",
  tokenChecker,
  CommentsController.createComment
);

module.exports = router;
