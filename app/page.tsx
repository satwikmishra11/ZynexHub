
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/AuthProvider';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { StoriesSection } from '../components/Story';
import { CreatePost } from '../components/CreatePost';
import { Post, PostData } from '../components/Post';
import { AuthProvider } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';

function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      const mockPosts: PostData[] = [
        {
          id: '1',
          userId: '1',
          username: 'alex_dev',
          fullName: 'Alex Johnson',
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20male%20developer%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20clean%20professional%20lighting%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user1&orientation=squarish',
          isVerified: true,
          content: 'Just finished building a new React component library! The developer experience is amazing with TypeScript integration. Excited to share it with the community soon. 🚀',
          image: 'https://readdy.ai/api/search-image?query=Modern%20code%20editor%20interface%20with%20React%20TypeScript%20code%2C%20clean%20development%20workspace%2C%20professional%20programming%20environment%2C%20syntax%20highlighting%2C%20developer%20tools&width=600&height=400&seq=post1&orientation=landscape',
          timestamp: '2 hours ago',
          likes: 142,
          comments: 28,
          shares: 15,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: '2',
          userId: '2',
          username: 'sarah_design',
          fullName: 'Sarah Chen',
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20female%20designer%20with%20creative%20workspace%20background%2C%20modern%20lighting%2C%20confident%20expression%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user2&orientation=squarish',
          isVerified: true,
          content: 'Working on a new brand identity for a sustainable fashion startup. The creative process has been incredible - blending modern aesthetics with environmental consciousness. Here\'s a sneak peek at the color palette and typography choices.',
          image: 'https://readdy.ai/api/search-image?query=Modern%20brand%20identity%20design%20showcase%20with%20color%20palette%2C%20typography%20samples%2C%20eco-friendly%20aesthetic%2C%20sustainable%20fashion%20branding%2C%20creative%20design%20workspace%2C%20professional%20presentation&width=600&height=400&seq=post2&orientation=landscape',
          timestamp: '4 hours ago',
          likes: 89,
          comments: 12,
          shares: 8,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: '3',
          userId: '3',
          username: 'mike_photo',
          fullName: 'Michael Rodriguez',
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20photographer%20with%20camera%20equipment%20in%20background%2C%20natural%20lighting%2C%20artistic%20composition%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user3&orientation=squarish',
          isVerified: false,
          content: 'Golden hour magic at the city skyline! Sometimes the best shots come from unexpected moments. This was taken during a commercial shoot when the light suddenly became perfect.',
          image: 'https://readdy.ai/api/search-image?query=Stunning%20city%20skyline%20during%20golden%20hour%2C%20professional%20photography%20composition%2C%20dramatic%20lighting%2C%20urban%20landscape%2C%20architectural%20photography%2C%20breathtaking%20sunset%20view&width=600&height=400&seq=post3&orientation=landscape',
          timestamp: '1 day ago',
          likes: 234,
          comments: 45,
          shares: 23,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: '4',
          userId: '4',
          username: 'emma_travel',
          fullName: 'Emma Watson',
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20female%20traveler%20with%20adventure%20gear%2C%20outdoor%20background%2C%20confident%20smile%2C%20natural%20lighting%20portrait&width=400&height=400&seq=user4&orientation=squarish',
          isVerified: false,
          content: 'Just returned from an incredible 3-week journey through Southeast Asia! The cultural diversity, amazing food, and warm hospitality made this trip unforgettable. Already planning the next adventure! ✈️',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Southeast%20Asian%20temple%20architecture%20with%20traditional%20design%2C%20cultural%20landmark%2C%20travel%20photography%2C%20vibrant%20colors%2C%20tourist%20destination%2C%20spiritual%20atmosphere&width=600&height=400&seq=post4&orientation=landscape',
          timestamp: '2 days ago',
          likes: 156,
          comments: 32,
          shares: 18,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: '5',
          userId: '5',
          username: 'david_fitness',
          fullName: 'David Martinez',
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20athletic%20male%20trainer%20in%20gym%20environment%2C%20healthy%20lifestyle%2C%20motivational%20expression%2C%20fitness%20background&width=400&height=400&seq=user5&orientation=squarish',
          isVerified: false,
          content: 'Consistency beats perfection every single time! 6 months ago I could barely run a mile, today I completed my first half marathon. The journey has taught me so much about mental resilience and pushing through barriers. 💪',
          timestamp: '3 days ago',
          likes: 78,
          comments: 19,
          shares: 12,
          isLiked: false,
          isBookmarked: true
        }
      ];

      setPosts(mockPosts);
      setPostsLoading(false);
    }
  }, [user, isLoading, router]);

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      userId: user!.id,
      username: user!.username,
      fullName: user!.fullName,
      avatar: user!.avatar,
      isVerified: user!.isVerified,
      content,
      image,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1 max-w-2xl space-y-6">
            <StoriesSection />
            <CreatePost onCreatePost={handleCreatePost} />
            
            <div className="space-y-6">
              {postsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onBookmark={handleBookmark}
                  />
                ))
              )}
            </div>
          </div>

          <div className="w-80 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <i className="ri-live-line text-white"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-800">Go Live</div>
                    <div className="text-sm text-slate-500">Start broadcasting</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <i className="ri-group-line text-white"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-800">Create Event</div>
                    <div className="text-sm text-slate-500">Organize meetup</div>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">John liked your post</span>
                  <span className="text-slate-400 ml-auto">2m</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">Sarah commented on your photo</span>
                  <span className="text-slate-400 ml-auto">5m</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-600">Mike started following you</span>
                  <span className="text-slate-400 ml-auto">1h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}
