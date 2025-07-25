
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { Post } from '../../components/Post';

export default function DiscoverPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');

  const trendingPosts = [
    {
      id: '1',
      user: {
        id: '6',
        username: 'tech_innovator',
        fullName: 'Alex Thompson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20tech%20innovator%20with%20futuristic%20background%2C%20visionary%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=discover1&orientation=squarish',
        isVerified: true
      },
      content: "The future of AI is here! Just tested the latest machine learning models and the results are mind-blowing. This will change everything we know about automation. 🤖✨",
      image: 'https://readdy.ai/api/search-image?query=Futuristic%20AI%20technology%20workspace%20with%20holographic%20displays%2C%20advanced%20computing%20setup%2C%20artificial%20intelligence%20visualization&width=600&height=400&seq=discoverpost1&orientation=landscape',
      timestamp: '1h',
      likes: 2340,
      comments: 456,
      shares: 189,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '2',
      user: {
        id: '7',
        username: 'creative_genius',
        fullName: 'Maya Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20creative%20artist%20with%20colorful%20artistic%20background%2C%20inspiring%20expression%2C%20art%20studio%20themed%20portrait&width=200&height=200&seq=discover2&orientation=squarish',
        isVerified: true
      },
      content: "Art has the power to transform society. This new digital art installation represents the intersection of technology and human emotion. What do you think?",
      image: 'https://readdy.ai/api/search-image?query=Interactive%20digital%20art%20installation%20with%20vibrant%20colors%2C%20modern%20gallery%20space%2C%20contemporary%20art%20exhibition&width=600&height=400&seq=discoverpost2&orientation=landscape',
      timestamp: '2h',
      likes: 1890,
      comments: 234,
      shares: 78,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      user: {
        id: '8',
        username: 'startup_guru',
        fullName: 'James Chen',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20successful%20startup%20founder%20with%20modern%20office%20background%2C%20confident%20expression%2C%20business%20themed%20portrait&width=200&height=200&seq=discover3&orientation=squarish',
        isVerified: true
      },
      content: "From idea to IPO in 3 years. Here's the story of how we built a billion-dollar company from a college dorm room. Thread 🧵",
      timestamp: '3h',
      likes: 3450,
      comments: 567,
      shares: 234,
      isLiked: false,
      isBookmarked: true
    }
  ];

  const categories = [
    { id: 'technology', name: 'Technology', icon: 'ri-code-line', color: 'bg-blue-500' },
    { id: 'design', name: 'Design', icon: 'ri-palette-line', color: 'bg-pink-500' },
    { id: 'business', name: 'Business', icon: 'ri-briefcase-line', color: 'bg-green-500' },
    { id: 'photography', name: 'Photography', icon: 'ri-camera-line', color: 'bg-purple-500' },
    { id: 'music', name: 'Music', icon: 'ri-music-line', color: 'bg-orange-500' },
    { id: 'art', name: 'Art', icon: 'ri-brush-line', color: 'bg-red-500' }
  ];

  const trendingTopics = [
    { tag: '#AI', posts: '45.2K posts', growth: '+12%' },
    { tag: '#WebDevelopment', posts: '32.8K posts', growth: '+8%' },
    { tag: '#StartupLife', posts: '28.5K posts', growth: '+15%' },
    { tag: '#DesignThinking', posts: '24.1K posts', growth: '+6%' },
    { tag: '#Innovation', posts: '19.7K posts', growth: '+11%' }
  ];

  const suggestedUsers = [
    {
      id: '9',
      username: 'design_master',
      fullName: 'Sophie Wilson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20design%20expert%20with%20creative%20background%2C%20artistic%20expression%2C%20design%20workspace%20themed%20portrait&width=200&height=200&seq=suggested1&orientation=squarish',
      isVerified: true,
      bio: 'Senior UX Designer at Google • Design mentor',
      followers: 45600,
      isFollowing: false
    },
    {
      id: '10',
      username: 'code_wizard',
      fullName: 'Marcus Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20software%20architect%20with%20tech%20background%2C%20focused%20expression%2C%20programming%20workspace%20themed%20portrait&width=200&height=200&seq=suggested2&orientation=squarish',
      isVerified: true,
      bio: 'Full Stack Developer • Open Source Contributor',
      followers: 38200,
      isFollowing: false
    },
    {
      id: '11',
      username: 'entrepreneur_life',
      fullName: 'Lisa Park',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20entrepreneur%20with%20modern%20business%20background%2C%20confident%20expression%2C%20executive%20office%20themed%20portrait&width=200&height=200&seq=suggested3&orientation=squarish',
      isVerified: true,
      bio: 'CEO & Founder • Startup Advisor',
      followers: 52800,
      isFollowing: false
    }
  ];

  const tabs = [
    { id: 'trending', label: 'Trending', icon: 'ri-fire-line' },
    { id: 'categories', label: 'Categories', icon: 'ri-grid-line' },
    { id: 'topics', label: 'Topics', icon: 'ri-hashtag' },
    { id: 'people', label: 'People', icon: 'ri-user-line' }
  ];

  const followUser = (userId: string) => {
    console.log('Following user:', userId);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="flex gap-6">
          <Sidebar />
          
          <div className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Discover</h1>
                  <p className="text-slate-600 mt-1">
                    Find new content, topics, and people to follow
                  </p>
                </div>
                <i className="ri-compass-line text-3xl text-blue-600"></i>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className={tab.icon}></i>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
            
            {activeTab === 'trending' && (
              <div className="space-y-6">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Post
                      post={{
                        ...post,
                        userId: post.user.id,
                        username: post.user.username,
                        fullName: post.user.fullName,
                        avatar: post.user.avatar,
                        isVerified: post.user.isVerified,
                      }}
                      onLike={() => {}}
                      onComment={() => {}}
                      onShare={() => {}}
                      onBookmark={() => {}}
                    />
                  </motion.div>
                ))}

              </div>
            )}
            
            {activeTab === 'categories' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center hover:shadow-md transition-shadow"
                  >
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`${category.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="font-semibold text-slate-800">{category.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Explore {category.name.toLowerCase()} content
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'topics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-bold text-slate-800 mb-4">Trending Topics</h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.tag}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-800">{topic.tag}</h3>
                        <p className="text-sm text-slate-600">{topic.posts}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-medium">
                          {topic.growth}
                        </div>
                        <div className="text-xs text-slate-500">growth</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'people' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
              >
                <h2 className="text-xl font-bold text-slate-800 mb-4">Suggested People</h2>
                <div className="space-y-4">
                  {suggestedUsers.map((suggestedUser, index) => (
                    <motion.div
                      key={suggestedUser.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={suggestedUser.avatar}
                          alt={suggestedUser.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800">{suggestedUser.fullName}</h3>
                          {suggestedUser.isVerified && (
                            <i className="ri-verified-badge-fill text-blue-500"></i>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mb-1">@{suggestedUser.username}</p>
                        <p className="text-sm text-slate-700 mb-2">{suggestedUser.bio}</p>
                        <p className="text-xs text-slate-500">
                          {suggestedUser.followers.toLocaleString()} followers
                        </p>
                      </div>
                      <Button
                        onClick={() => followUser(suggestedUser.id)}
                        className="whitespace-nowrap"
                      >
                        <i className="ri-user-add-line mr-2"></i>
                        Follow
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
