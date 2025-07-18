import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useAuth } from '../../hooks/useAuth';
import { useComments } from '../../hooks/useComments';
import { PostWithProfile } from '../../hooks/usePosts';
import { LoadingSpinner } from '../LoadingSpinner';

interface CommentModalProps {
  post: PostWithProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ post, isOpen, onClose }) => {
  const { authState } = useAuth();
  const { comments, isLoading, addComment } = useComments(post.id);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await addComment(newComment.trim());
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex animate-slide-up">
        {/* Post Image */}
        {post.image_url && (
          <div className="hidden md:block w-1/2 bg-black">
            <img
              src={post.image_url}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Comments Section */}
        <div className={`${post.image_url ? 'md:w-1/2' : 'w-full'} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={post.profiles.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt={post.profiles.full_name || post.profiles.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-dark-gray">{post.profiles.full_name || post.profiles.username}</h3>
                <p className="text-sm text-gray-500">@{post.profiles.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-dark-gray leading-relaxed mb-3">{post.content}</p>
            <p className="text-sm text-gray-500">{formatDistanceToNow(post.created_at)}</p>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 scrollbar-hide">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="md" />
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 group animate-fade-in">
                  <img
                    src={comment.profiles.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={comment.profiles.full_name || comment.profiles.username}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-transparent group-hover:ring-deep-blue/20 transition-all duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-dark-gray hover:text-deep-blue transition-colors cursor-pointer">
                        {comment.profiles.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-dark-gray leading-relaxed mb-2 bg-gray-50 rounded-lg px-3 py-2 group-hover:bg-gray-100 transition-colors duration-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-gray-500 text-sm">No comments yet</p>
                <p className="text-gray-400 text-xs mt-1">Be the first to comment!</p>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmitComment} className="flex items-center space-x-3">
              <img
                src={authState.user?.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt={authState.user?.full_name || authState.user?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300 bg-white"
                  maxLength={500}
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="p-3 text-white bg-deep-blue hover:bg-deep-blue/90 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};