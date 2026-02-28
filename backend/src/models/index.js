const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User - Post
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Post - Comment
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// User - Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Follow System (Self-referential)
User.belongsToMany(User, {
  through: 'Followers',
  as: 'followers',
  foreignKey: 'followingId',
});
User.belongsToMany(User, {
  through: 'Followers',
  as: 'following',
  foreignKey: 'followerId',
});

// Like System
Post.belongsToMany(User, { through: 'PostLikes', as: 'likedBy' });
User.belongsToMany(Post, { through: 'PostLikes', as: 'likedPosts' });

module.exports = { User, Post, Comment };
