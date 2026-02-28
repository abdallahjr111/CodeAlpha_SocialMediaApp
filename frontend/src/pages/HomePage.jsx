import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import { Send, AlertCircle } from 'lucide-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      await api.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error('Post creation error:', err);
      setError(err.response?.data?.message || 'Failed to create post. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="bg-white p-4 rounded-xl border mb-8 shadow-sm">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center space-x-2 border border-red-100">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            className="w-full resize-none border-none focus:ring-0 text-lg"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="flex items-center justify-end border-t pt-3 mt-3">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition disabled:opacity-50 min-w-[100px]"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
