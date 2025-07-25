
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Post } from '../../components/Post';

export default function BookmarksPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const bookmarkedPosts = [
    {
      id: '1',
      user: {
        id: '2',
        username: 'sarah_designer',
        fullName: 'Sarah Johnson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20UI%20UX%20designer%20with%20creative%20background%2C%20friendly%20expression%2C%20design%20studio%20themed%20portrait&width=200&height=200&seq=bookmark1&orientation=squarish',
        isVerified: true
      },
      content: "Just finished designing a new dashboard interface! The user experience flow is so smooth now. Here's a sneak peek at the design process 🎨",
      image: 'https://readdy.ai/api/search-image?query=Modern%20UI%20UX%20dashboard%20design%20mockup%20with%20clean%20interface%20elements%2C%20professional%20design%20workspace%2C%20colorful%20user%20interface%20components&width=600&height=400&seq=bookmarkpost1&orientation=landscape',
      timestamp: '2d',
      likes: 892,
      comments: 156,
      shares: 45,
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '2',
      user: {
        id: '3',
        username: 'mike_photo',
        fullName: 'Mike Chen',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20photographer%20with%20camera%20equipment%20background%2C%20artistic%20expression%2C%20photography%20studio%20themed%20portrait&width=200&height=200&seq=bookmark2&orientation=squarish',
        isVerified: false
      },
      content: "Golden hour photography tips that changed my perspective completely. The lighting makes such a difference in storytelling through images.",
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20golden%20hour%20landscape%20photography%20with%20warm%20lighting%2C%20professional%20camera%20equipment%2C%20stunning%20natural%20scenery%20during%20sunset&width=600&height=400&seq=bookmarkpost2&orientation=landscape',
      timestamp: '3d',
      likes: 567,
      comments: 89,
      shares: 23,
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '3',
      user: {
        id: '4',
        username: 'emma_writer',
        fullName: 'Emma Davis',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20content%20writer%20with%20book%20background%2C%20intellectual%20expression%2C%20writing%20workspace%20themed%20portrait&width=200&height=200&seq=bookmark3&orientation=squarish',
        isVerified: true
      },
      content: "Writing productivity hacks that actually work! After years of trial and error, these 5 techniques have transformed my writing process. Thread below 👇",
      timestamp: '5d',
      likes: 234,
      comments: 67,
      shares: 34,
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '4',
      user: {
        id: '5',
        username: 'david_dev',
        fullName: 'David Wilson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20software%20developer%20with%20coding%20background%2C%20focused%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=bookmark4&orientation=squarish',
        isVerified: false
      },
      content: "React 18 features that will change how you build apps. The new concurrent features are a game-changer for user experience!",
      image: 'https://readdy.ai/api/search-image?query=Modern%20software%20development%20workspace%20with%20React%20code%20on%20screen%2C%20programming%20environment%2C%20clean%20tech%20setup%20with%20multiple%20monitors&width=600&height=400&seq=bookmarkpost3&orientation=landscape',
      timestamp: '1w',
      likes: 445,
      comments: 78,
      shares: 56,
      isLiked: false,
      isBookmarked: true
    }
  ];

  const filteredPosts = bookmarkedPosts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Bookmarks</h1>
                  <p className="text-slate-600 mt-1">
                    {bookmarkedPosts.length} saved post{bookmarkedPosts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <i className="ri-bookmark-fill text-3xl text-blue-600"></i>
              </div>
              
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>
            
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Post post={{
                      ...post,
                      userId: post.user.id,
                      username: post.user.username,
                      fullName: post.user.fullName,
                      avatar: post.user.avatar,
                      isVerified: post.user.isVerified,
                    }} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
                >
                  {searchTerm ? (
                    <>
                      <i className="ri-search-line text-6xl text-slate-400 mb-4"></i>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        No results found
                      </h3>
                      <p className="text-slate-600">
                        Try searching for something else or clear your search
                      </p>
                    </>
                  ) : (
                    <>
                      <i className="ri-bookmark-line text-6xl text-slate-400 mb-4"></i>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        No bookmarks yet
                      </h3>
                      <p className="text-slate-600">
                        Save posts to read later by clicking the bookmark icon
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
