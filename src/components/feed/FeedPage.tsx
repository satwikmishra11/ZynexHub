import React, { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { CreatePostCard } from './CreatePostCard';
import { StoriesBar } from '../stories/StoriesBar';
import { Post } from '../../types';
import { mockPosts, mockStories } from '../../data/mockData';
import { LoadingSpinner } from '../LoadingSpinner';

export const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    const loadPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  const handleCreatePost = (content: string) => {
    // In a real app, this would send to the backend
    console.log('Creating post:', content);
    // You could add the new post to the local state here
  };

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleBookmark = (postId: string) => {
    console.log('Bookmark post:', postId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories Bar */}
      <StoriesBar stories={mockStories} />
      
      {/* Create Post */}
      <CreatePostCard onCreatePost={handleCreatePost} />
      
      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};