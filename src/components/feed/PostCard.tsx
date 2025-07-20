import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { EnhancedCommentModal } from '../comments/EnhancedCommentModal';
import { PostWithProfile } from '../../hooks/usePosts';

interface PostCardProps {
  post: PostWithProfile;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onBookmark 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    
    // Add animation class
    const heartButton = document.querySelector(`[data-post-id="${post.id}"] .heart-icon`);
    if (heartButton && !post.user_liked) {
      heartButton.classList.add('animate-bounce-soft');
      setTimeout(() => {
        heartButton.classList.remove('animate-bounce-soft');
      }, 600);
    }
    
    try {
      await onLike?.(post.id);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setTimeout(() => setIsLiking(false), 300);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(post.id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!post.user_liked) {
      handleLike();
    }
  };

  return (
    <>
      <div className="card p-6 mb-6 animate-fade-in hover:shadow-lg transition-all duration-300 group" data-post-id={post.id}>
        {/* User Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={post.profiles.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt={post.profiles.full_name || post.profiles.username}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-deep-blue/20 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-green rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-dark-gray hover:text-deep-blue transition-colors cursor-pointer">
                  {post.profiles.full_name || post.profiles.username}
                </h3>
                <CheckCircle className="w-4 h-4 text-blue-green" />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>@{post.profiles.username}</span>
                <span>•</span>
                <span>{formatDistanceToNow(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-dark-gray leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Image */}
        {post.image_url && (
          <div 
            className="mb-4"
            onDoubleClick={handleDoubleClick}
          >
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full rounded-xl object-cover max-h-96 cursor-pointer hover:brightness-95 transition-all duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:bg-red-50 hover:scale-110 ${
                post.user_liked ? 'text-red-500' : 'text-gray-500'
              } disabled:cursor-not-allowed group/like`}
            >
              <Heart className={`w-5 h-5 heart-icon ${post.user_liked ? 'fill-current' : ''} transition-all duration-300 group-hover/like:scale-125`} />
              <span className="text-sm font-medium">{post.likes_count || 0}</span>
            </button>

            <button
              onClick={() => setShowComments(true)}
              className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-500 hover:scale-110 transition-all duration-300 group/comment"
            >
              <MessageCircle className="w-5 h-5 transition-all duration-300 group-hover/comment:scale-125" />
              <span className="text-sm font-medium">{post.comments_count || 0}</span>
            </button>

            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:bg-green-50 hover:text-green-500 hover:scale-110 transition-all duration-300 group/share"
            >
              <Share className="w-5 h-5 transition-all duration-300 group-hover/share:scale-125" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isBookmarked ? 'text-blue-green' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''} transition-all duration-300`} />
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      <EnhancedCommentModal
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
};