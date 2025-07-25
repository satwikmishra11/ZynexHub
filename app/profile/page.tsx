
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { Post } from '../../components/Post';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  const userPosts = [
    {
      id: '1',
      user: {
        id: '1',
        username: 'alex_dev',
        fullName: 'Alex Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20hispanic%20male%20developer%20with%20modern%20tech%20background%2C%20confident%20expression%2C%20software%20engineering%20themed%20portrait&width=200&height=200&seq=profile1&orientation=squarish',
        isVerified: true
      },
      content: "Just shipped a new feature that I'm really excited about! The user feedback has been amazing so far. 🚀",
      image: 'https://readdy.ai/api/search-image?query=Modern%20software%20development%20workspace%20with%20multiple%20monitors%20showing%20code%2C%20professional%20development%20environment%2C%20clean%20desk%20setup&width=600&height=400&seq=profilepost1&orientation=landscape',
      timestamp: '2h',
      likes: 234,
      comments: 45,
      shares: 12,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '2',
      user: {
        id: '1',
        username: 'alex_dev',
        fullName: 'Alex Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20hispanic%20male%20developer%20with%20modern%20tech%20background%2C%20confident%20expression%2C%20software%20engineering%20themed%20portrait&width=200&height=200&seq=profile1&orientation=squarish',
        isVerified: true
      },
      content: "Learning new technologies every day. Today's focus: exploring the latest React patterns and best practices. What's your favorite React hook?",
      timestamp: '1d',
      likes: 189,
      comments: 67,
      shares: 23,
      isLiked: false,
      isBookmarked: true
    }
  ];

  const stats = [
    { label: 'Posts', value: '247' },
    { label: 'Followers', value: '2.4K' },
    { label: 'Following', value: '892' },
    { label: 'Likes', value: '12.5K' }
  ];

  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'ri-file-text-line' },
    { id: 'media', label: 'Media', icon: 'ri-image-line' },
    { id: 'likes', label: 'Likes', icon: 'ri-heart-line' },
    { id: 'replies', label: 'Replies', icon: 'ri-reply-line' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="flex gap-6">
          <Sidebar />
          
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl"></div>
                <div className="absolute -bottom-16 left-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-20 pb-6 px-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-slate-800">{user.fullName}</h1>
                      {user.isVerified && (
                        <i className="ri-verified-badge-fill text-blue-500 text-xl"></i>
                      )}
                    </div>
                    <p className="text-slate-600 mb-2">@{user.username}</p>
                    <p className="text-slate-700 mb-4">
                      Full-stack developer passionate about creating amazing user experiences. 
                      Currently working on innovative web applications using React and Node.js.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        <span>Joined March 2023</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-link"></i>
                        <span className="text-blue-600">alexdev.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="whitespace-nowrap">
                      <i className="ri-message-3-line mr-2"></i>
                      Message
                    </Button>
                    <Button className="whitespace-nowrap">
                      <i className="ri-edit-line mr-2"></i>
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 mb-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex border-b border-slate-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <i className={tab.icon}></i>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              {activeTab === 'posts' && userPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
              
              {activeTab === 'media' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Professional%20photography%20portfolio%20image%20with%20modern%20composition%2C%20creative%20visual%20content%2C%20high%20quality%20artistic%20photo&width=300&height=300&seq=media${i}&orientation=squarish`}
                          alt={`Media ${i}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'likes' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center"
                >
                  <i className="ri-heart-line text-6xl text-slate-400 mb-4"></i>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No liked posts yet</h3>
                  <p className="text-slate-600">Posts you like will appear here</p>
                </motion.div>
              )}
              
              {activeTab === 'replies' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center"
                >
                  <i className="ri-reply-line text-6xl text-slate-400 mb-4"></i>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No replies yet</h3>
                  <p className="text-slate-600">Your replies to other posts will appear here</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
