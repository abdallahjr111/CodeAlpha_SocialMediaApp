import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import { Image, Send, X, AlertCircle } from 'lucide-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setContent('');
      removeImage();
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

          {imagePreview && (
            <div className="relative mt-2 mb-4">
              <img src={imagePreview} alt="Preview" className="max-h-64 w-full object-cover rounded-lg border" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-3 mt-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition"
            >
              <Image size={24} />
            </button>
            <button
              type="submit"
              disabled={loading || (!content.trim() && !image)}
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
