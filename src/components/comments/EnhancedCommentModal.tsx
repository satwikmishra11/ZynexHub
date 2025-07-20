import React from 'react';
import { X } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useEnhancedComments } from '../../hooks/useEnhancedComments';
import { PostWithProfile } from '../../hooks/usePosts';
import { LoadingSpinner } from '../LoadingSpinner';
import { EnhancedCommentCard } from './EnhancedCommentCard';
import { CommentForm } from './CommentForm';

interface EnhancedCommentModalProps {
  post: PostWithProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const EnhancedCommentModal: React.FC<EnhancedCommentModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    voteComment,
    reportComment,
  } = useEnhancedComments(post.id);

  const handleAddComment = async (content: string) => {
    await addComment({ content });
  };

  const handleReply = async (parentId: string, content: string) => {
    await addComment({ content, parent_id: parentId });
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
                <h3 className="font-semibold text-dark-gray">
                  {post.profiles.full_name || post.profiles.username}
                </h3>
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
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="md" />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600">
                <p>Error loading comments: {error}</p>
              </div>
            ) : comments.length > 0 ? (
              <div className="p-4 space-y-0">
                {comments.map((comment) => (
                  <EnhancedCommentCard
                    key={comment.id}
                    comment={comment}
                    onVote={voteComment}
                    onReply={handleReply}
                    onEdit={updateComment}
                    onDelete={deleteComment}
                    onReport={reportComment}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-gray-500 text-sm">No comments yet</p>
                  <p className="text-gray-400 text-xs mt-1">Be the first to comment!</p>
                </div>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <CommentForm
              onSubmit={handleAddComment}
              placeholder="Write a comment..."
              submitLabel="Comment"
            />
          </div>
        </div>
      </div>
    </div>
  );
};