const { Post, User, Comment } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.create({ content, image, userId: req.user.id });
    const fullPost = await Post.findByPk(post.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'profilePic'] }]
    });
    res.status(201).json(fullPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'profilePic'] },
        { model: Comment, as: 'comments', include: [{ model: User, as: 'author', attributes: ['username'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    const user = await User.findByPk(req.user.id);

    const hasLiked = await post.hasLikedBy(user);
    if (hasLiked) {
      await post.removeLikedBy(user);
      post.likes -= 1;
    } else {
      await post.addLikedBy(user);
      post.likes += 1;
    }
    await post.save();
    res.json({ likes: post.likes, hasLiked: !hasLiked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      postId: req.params.id,
      userId: req.user.id
    });
    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['username'] }]
    });
    res.json(fullComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
