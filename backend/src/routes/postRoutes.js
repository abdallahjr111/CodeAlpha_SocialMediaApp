const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, addComment } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.post('/:id/like', auth, likePost);
router.post('/:id/comments', auth, addComment);

module.exports = router;
