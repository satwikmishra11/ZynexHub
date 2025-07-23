
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';

export default function CommunitiesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('joined');

  const joinedCommunities = [
    {
      id: '1',
      name: 'Web Development',
      description: 'Share knowledge, tips, and best practices for web development',
      members: 45600,
      posts: 2340,
      image: 'https://readdy.ai/api/search-image?query=Modern%20web%20development%20community%20with%20coding%20elements%2C%20programming%20workspace%2C%20colorful%20tech%20community%20illustration&width=400&height=300&seq=community1&orientation=landscape',
      isJoined: true,
      category: 'Technology'
    },
    {
      id: '2',
      name: 'UI/UX Design',
      description: 'A community for designers to share ideas and get feedback',
      members: 38200,
      posts: 1890,
      image: 'https://readdy.ai/api/search-image?query=Creative%20UI%20UX%20design%20community%20with%20design%20tools%2C%20colorful%20interface%20elements%2C%20modern%20design%20workspace%20illustration&width=400&height=300&seq=community2&orientation=landscape',
      isJoined: true,
      category: 'Design'
    },
    {
      id: '3',
      name: 'Photography',
      description: 'Showcase your photography skills and learn from others',
      members: 52100,
      posts: 3450,
      image: 'https://readdy.ai/api/search-image?query=Photography%20community%20with%20camera%20equipment%2C%20beautiful%20landscape%20photos%2C%20creative%20photography%20workspace%20illustration&width=400&height=300&seq=community3&orientation=landscape',
      isJoined: true,
      category: 'Creative'
    }
  ];

  const suggestedCommunities = [
    {
      id: '4',
      name: 'React Developers',
      description: 'Everything about React.js development and best practices',
      members: 28400,
      posts: 1560,
      image: 'https://readdy.ai/api/search-image?query=React%20JavaScript%20development%20community%20with%20React%20logo%2C%20modern%20programming%20workspace%2C%20blue%20technology%20themed%20illustration&width=400&height=300&seq=community4&orientation=landscape',
      isJoined: false,
      category: 'Technology'
    },
    {
      id: '5',
      name: 'Startup Founders',
      description: 'Connect with fellow entrepreneurs and share startup experiences',
      members: 34700,
      posts: 2180,
      image: 'https://readdy.ai/api/search-image?query=Startup%20entrepreneur%20community%20with%20business%20elements%2C%20modern%20office%20workspace%2C%20professional%20business%20illustration&width=400&height=300&seq=community5&orientation=landscape',
      isJoined: false,
      category: 'Business'
    },
    {
      id: '6',
      name: 'Digital Marketing',
      description: 'Learn and share digital marketing strategies and tips',
      members: 41300,
      posts: 2890,
      image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20community%20with%20charts%20and%20analytics%2C%20modern%20marketing%20workspace%2C%20colorful%20business%20illustration&width=400&height=300&seq=community6&orientation=landscape',
      isJoined: false,
      category: 'Marketing'
    }
  ];

  const tabs = [
    { id: 'joined', label: 'Joined Communities' },
    { id: 'discover', label: 'Discover' }
  ];

  const joinCommunity = (communityId: string) => {
    console.log('Joining community:', communityId);
  };

  const leaveCommunity = (communityId: string) => {
    console.log('Leaving community:', communityId);
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
                  <h1 className="text-2xl font-bold text-slate-800">Communities</h1>
                  <p className="text-slate-600 mt-1">
                    Connect with like-minded people and share knowledge
                  </p>
                </div>
                <Button className="whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Create Community
                </Button>
              </div>
              
              <div className="flex border-b border-slate-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'joined' && joinedCommunities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{community.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {community.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="ri-group-line"></i>
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-file-text-line"></i>
                        <span>{community.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => leaveCommunity(community.id)}
                        className="flex-1 whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Joined
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        View
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {activeTab === 'discover' && suggestedCommunities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{community.name}</h3>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {community.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="ri-group-line"></i>
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-file-text-line"></i>
                        <span>{community.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => joinCommunity(community.id)}
                        className="flex-1 whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-2"></i>
                        Join
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Preview
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {activeTab === 'joined' && joinedCommunities.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
              >
                <i className="ri-group-line text-6xl text-slate-400 mb-4"></i>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  No communities joined yet
                </h3>
                <p className="text-slate-600 mb-4">
                  Discover communities that match your interests and start connecting
                </p>
                <Button
                  onClick={() => setActiveTab('discover')}
                  className="whitespace-nowrap"
                >
                  <i className="ri-compass-line mr-2"></i>
                  Discover Communities
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
