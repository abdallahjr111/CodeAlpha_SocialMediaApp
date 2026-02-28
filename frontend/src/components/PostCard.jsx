import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send } from 'lucide-react';
import api from '../api/axios';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [hasLiked, setHasLiked] = useState(false); // Simplified for now

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post.id}/like`);
      setLikes(res.data.likes);
      setHasLiked(res.data.hasLiked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/posts/${post.id}/comments`, { content: newComment });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border rounded-xl mb-6 overflow-hidden post-card">
      <div className="p-4 flex items-center space-x-3">
        <Link to={`/profile/${post.author.username}`} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          {post.author.username[0].toUpperCase()}
        </Link>
        <Link to={`/profile/${post.author.username}`} className="font-semibold">{post.author.username}</Link>
      </div>

      <div className="px-4 py-2">
        <p className="text-gray-800">{post.content}</p>
      </div>

      <div className="p-4 border-t flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <button onClick={handleLike} className={`flex items-center space-x-1 like-button ${hasLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
            <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </button>
          <div className="flex items-center space-x-1 text-gray-600">
            <MessageCircle size={20} />
            <span>{comments.length}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {comments.map((comment, i) => (
            <div key={i} className="text-sm">
              <span className="font-semibold mr-2">{comment.author?.username}</span>
              <span className="text-gray-700">{comment.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleComment} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="text-purple-600 font-semibold text-sm">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
