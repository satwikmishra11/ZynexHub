import React, { useState } from 'react';
import { Camera, MapPin, Link, Calendar, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PostCard } from '../feed/PostCard';
import { mockPosts } from '../../data/mockData';

export const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [activeTab, setActiveTab] = useState('posts');
  
  // Filter posts by current user (in a real app, this would come from the backend)
  const userPosts = mockPosts.filter(post => post.userId === user?.id);

  const tabs = [
    { id: 'posts', label: 'Posts', count: user?.postsCount || 0 },
    { id: 'media', label: 'Media', count: 12 },
    { id: 'likes', label: 'Likes', count: 89 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 gradient-bg rounded-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="card p-6 mb-6 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
          <div className="relative mb-4 md:mb-0">
            <img
              src={user?.avatar || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200`}
              alt={user?.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-deep-blue text-white rounded-full hover:bg-deep-blue/90 transition-all duration-300">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-dark-gray mb-1">
                  {user?.fullName}
                </h1>
                <p className="text-gray-600 mb-2">@{user?.username}</p>
              </div>
              <button className="btn-secondary self-start md:self-center">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            <p className="text-dark-gray mb-4 leading-relaxed">
              {user?.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Link className="w-4 h-4" />
                <span className="text-deep-blue">zynexhub.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2024</span>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <span className="font-bold text-dark-gray block">
                  {user?.followingCount?.toLocaleString()}
                </span>
                <span className="text-gray-600">Following</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-dark-gray block">
                  {user?.followersCount?.toLocaleString()}
                </span>
                <span className="text-gray-600">Followers</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-dark-gray block">
                  {user?.postsCount?.toLocaleString()}
                </span>
                <span className="text-gray-600">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-dark-gray'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'posts' && (
          <div className="space-y-0">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="card p-12 text-center">
                <p className="text-gray-600 mb-4">No posts yet</p>
                <p className="text-sm text-gray-500">
                  Share your first post to get started!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="card p-12 text-center">
            <p className="text-gray-600">Media content coming soon!</p>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="card p-12 text-center">
            <p className="text-gray-600">Liked posts coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};