import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import { Image, Send } from 'lucide-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

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
    try {
      await api.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="bg-white p-4 rounded-xl border mb-8">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            className="w-full resize-none border-none focus:ring-0 text-lg"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between border-t pt-3 mt-3">
            <button type="button" className="text-purple-600 hover:bg-purple-50 p-2 rounded-full">
              <Image size={24} />
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
            >
              Post
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
