const { User, Post } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ['password'] },
      include: [
        { model: Post, as: 'posts' },
        { model: User, as: 'followers', attributes: ['id', 'username'] },
        { model: User, as: 'following', attributes: ['id', 'username'] }
      ]
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findOne({ where: { username: req.params.username } });
    const currentUser = await User.findByPk(req.user.id);

    if (userToFollow.id === currentUser.id) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const isFollowing = await currentUser.hasFollowing(userToFollow);
    if (isFollowing) {
      await currentUser.removeFollowing(userToFollow);
      res.json({ message: 'Unfollowed' });
    } else {
      await currentUser.addFollowing(userToFollow);
      res.json({ message: 'Followed' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
