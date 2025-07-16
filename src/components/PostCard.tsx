import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';
import { usePost } from '../hooks/usePost';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post: initialPost }) => {
  const { post, likePost } = usePost(initialPost.id);

  if (!post) {
      return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 mb-6">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <img
              src={post.profiles.avatar_url || `https://i.pravatar.cc/150?u=${post.profiles.id}`}
              alt={post.profiles.full_name || 'User'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {post.profiles.full_name || post.profiles.username}
              </h3>
              <p className="text-sm text-gray-500">
                @{post.profiles.username} • {formatDistanceToNow(post.created_at)}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post content"
            className="mt-4 w-full rounded-xl object-cover max-h-96"
          />
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => likePost(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${post.is_liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes_count}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{post.comments_count}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share className="h-5 w-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
