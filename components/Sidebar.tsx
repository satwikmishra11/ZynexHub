
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const menuItems = [
    { icon: 'ri-home-line', label: 'Home', href: '/' },
    { icon: 'ri-compass-line', label: 'Discover', href: '/discover' },
    { icon: 'ri-notification-line', label: 'Notifications', href: '/notifications' },
    { icon: 'ri-message-3-line', label: 'Messages', href: '/messages' },
    { icon: 'ri-bookmark-line', label: 'Bookmarks', href: '/bookmarks' },
    { icon: 'ri-group-line', label: 'Communities', href: '/communities' },
    { icon: 'ri-user-line', label: 'Profile', href: '/profile' },
    { icon: 'ri-settings-line', label: 'Settings', href: '/settings' }
  ];

  const trendingTopics = [
    { tag: '#WebDevelopment', posts: '12.5K posts' },
    { tag: '#ReactJS', posts: '8.3K posts' },
    { tag: '#UIDesign', posts: '6.1K posts' },
    { tag: '#TechNews', posts: '4.8K posts' },
    { tag: '#Photography', posts: '3.2K posts' }
  ];

  const suggestedUsers = [
    {
      id: '6',
      username: 'tech_guru',
      fullName: 'John Smith',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20tech%20expert%20with%20modern%20background%2C%20confident%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=suggested1&orientation=squarish',
      isVerified: true,
      followers: 15600
    },
    {
      id: '7',
      username: 'creative_mind',
      fullName: 'Lisa Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20creative%20professional%20with%20artistic%20background%2C%20inspiring%20expression%2C%20modern%20portrait%20photography&width=200&height=200&seq=suggested2&orientation=squarish',
      isVerified: false,
      followers: 8900
    },
    {
      id: '8',
      username: 'startup_founder',
      fullName: 'Marcus Chen',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20entrepreneur%20with%20business%20background%2C%20determined%20expression%2C%20executive%20portrait%20style&width=200&height=200&seq=suggested3&orientation=squarish',
      isVerified: true,
      followers: 23400
    }
  ];

  if (!user) return null;

  return (
    <div className="w-80 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800">{user.fullName}</h3>
              {user.isVerified && (
                <i className="ri-verified-badge-fill text-blue-500 text-sm"></i>
              )}
            </div>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold text-slate-800">{user.followers.toLocaleString()}</div>
            <div className="text-slate-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-slate-800">{user.following.toLocaleString()}</div>
            <div className="text-slate-500">Following</div>
          </div>
        </div>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
      >
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-800"
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
      >
        <h3 className="font-semibold text-slate-800 mb-4">Trending Topics</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic.tag}
              className="w-full text-left hover:bg-slate-50 p-2 rounded-lg transition-colors"
            >
              <div className="font-medium text-slate-800">{topic.tag}</div>
              <div className="text-sm text-slate-500">{topic.posts}</div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
      >
        <h3 className="font-semibold text-slate-800 mb-4">Suggested for You</h3>
        <div className="space-y-4">
          {suggestedUsers.map((suggestedUser) => (
            <div key={suggestedUser.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={suggestedUser.avatar}
                  alt={suggestedUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="font-medium text-slate-800 text-sm">{suggestedUser.fullName}</h4>
                  {suggestedUser.isVerified && (
                    <i className="ri-verified-badge-fill text-blue-500 text-xs"></i>
                  )}
                </div>
                <p className="text-xs text-slate-500">{suggestedUser.followers.toLocaleString()} followers</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
