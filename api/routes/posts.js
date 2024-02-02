const express = require('express');
const router = express.Router();
const tokenChecker = require('../middleware/tokenChecker');
const PostsController = require('../controllers/posts');

router.get('/', tokenChecker, PostsController.getAllPosts);
router.post('/', tokenChecker, PostsController.createPost);
router.put('/like/:id', tokenChecker, PostsController.updateLikes);
module.exports = router;
