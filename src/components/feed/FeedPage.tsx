import React from 'react';
import { PostCard } from './PostCard';
import { CreatePostCard } from './CreatePostCard';
import { StoriesBar } from '../stories/StoriesBar';
import { LoadingSpinner } from '../LoadingSpinner';
import { usePosts } from '../../hooks/usePosts';

export const FeedPage: React.FC = () => {
  const { posts, isLoading, createPost, toggleLike } = usePosts();

  const handleCreatePost = async (content: string) => {
    try {
      await createPost(content);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
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
      <StoriesBar />
      
      {/* Create Post */}
      <CreatePostCard onCreatePost={handleCreatePost} />
      
      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
            />
          ))
        ) : (
          <div className="card p-12 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-deep-blue to-blue-green rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-dark-gray mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share something with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};