import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Post } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { CommentModal } from '../comments/CommentModal';

interface PostCardProps {
  post: Post;
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
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    const newLikedState = !isLiked;
    
    // Optimistic update
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Add animation class
    const heartButton = document.querySelector(`[data-post-id="${post.id}"] .heart-icon`);
    if (heartButton && newLikedState) {
      heartButton.classList.add('animate-bounce-soft');
      setTimeout(() => {
        heartButton.classList.remove('animate-bounce-soft');
      }, 600);
    }
    
    try {
      onLike?.(post.id);
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
      setLikesCount(prev => newLikedState ? prev - 1 : prev + 1);
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
    if (!isLiked) {
      handleLike();
    }
  };

  return (
    <>
      <div className="card p-6 mb-6 animate-fade-in" data-post-id={post.id}>
        {/* User Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.avatar || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
              alt={post.user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-dark-gray">{post.user.fullName}</h3>
                {post.user.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-green" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>@{post.user.username}</span>
                <span>•</span>
                <span>{formatDistanceToNow(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-dark-gray leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div 
            className={`mb-4 ${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-2'}`}
            onDoubleClick={handleDoubleClick}
          >
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Post content"
                className="w-full rounded-xl object-cover max-h-96 cursor-pointer hover:brightness-95 transition-all duration-300"
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:bg-red-50 ${
                isLiked ? 'text-red-500' : 'text-gray-500'
              } disabled:cursor-not-allowed`}
            >
              <Heart className={`w-5 h-5 heart-icon ${isLiked ? 'fill-current' : ''} transition-all duration-300`} />
              <span className="text-sm font-medium">{likesCount}</span>
            </button>

            <button
              onClick={() => setShowComments(true)}
              className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.commentsCount}</span>
            </button>

            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{post.sharesCount}</span>
            </button>
          </div>

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-all duration-300 ${
              isBookmarked ? 'text-blue-green' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
};