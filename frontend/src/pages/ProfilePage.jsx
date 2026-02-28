import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import PostCard from '../components/PostCard';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${username}`);
        setProfile(res.data);
        setIsFollowing(res.data.followers.some(f => f.id === currentUser?.id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [username, currentUser?.id]);

  const handleFollow = async () => {
    try {
      await api.post(`/users/${username}/follow`);
      setIsFollowing(!isFollowing);
      // Refresh profile to update counts
      const res = await api.get(`/users/${username}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl border p-8 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
          {profile.username[0].toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-4">
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            {currentUser && currentUser.username !== username && (
              <button
                onClick={handleFollow}
                className={`mt-4 md:mt-0 px-6 py-1.5 rounded-lg font-semibold transition ${
                  isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <div><span className="font-bold">{profile.posts?.length || 0}</span> Posts</div>
            <div><span className="font-bold">{profile.followers?.length || 0}</span> Followers</div>
            <div><span className="font-bold">{profile.following?.length || 0}</span> Following</div>
          </div>
          <p className="text-gray-600">{profile.bio || "No bio yet."}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.posts?.map(post => (
          <PostCard key={post.id} post={{...post, author: profile}} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
