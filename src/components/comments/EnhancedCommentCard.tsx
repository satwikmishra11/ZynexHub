import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Reply, 
  Edit, 
  Trash2, 
  Flag, 
  MoreHorizontal,
  Shield,
  Clock
} from 'lucide-react';
import { EnhancedComment } from '../../types/enhanced';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useAuth } from '../../hooks/useAuth';
import { CommentForm } from './CommentForm';
import { ReportModal } from './ReportModal';

interface EnhancedCommentCardProps {
  comment: EnhancedComment;
  onVote: (commentId: string, voteType: 'upvote' | 'downvote') => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<void>;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onReport: (commentId: string, reason: string, description?: string) => Promise<void>;
  depth?: number;
}

export const EnhancedCommentCard: React.FC<EnhancedCommentCardProps> = ({
  comment,
  onVote,
  onReply,
  onEdit,
  onDelete,
  onReport,
  depth = 0,
}) => {
  const { authState } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      await onVote(comment.id, voteType);
    } finally {
      setIsVoting(false);
    }
  };

  const handleReply = async (content: string) => {
    await onReply(comment.id, content);
    setShowReplyForm(false);
  };

  const handleEdit = async (content: string) => {
    await onEdit(comment.id, content);
    setShowEditForm(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await onDelete(comment.id);
    }
  };

  const handleReport = async (reason: string, description?: string) => {
    await onReport(comment.id, reason, description);
    setShowReportModal(false);
  };

  const getVoteColor = (voteType: 'upvote' | 'downvote') => {
    if (comment.user_vote === voteType) {
      return voteType === 'upvote' ? 'text-green-600' : 'text-red-600';
    }
    return 'text-gray-500';
  };

  const maxDepth = 5;
  const shouldShowReplies = depth < maxDepth;

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-100 pl-4' : ''} animate-fade-in`}>
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={comment.profiles.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
              alt={comment.profiles.display_name || comment.profiles.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm text-dark-gray">
                  {comment.profiles.display_name || comment.profiles.full_name || comment.profiles.username}
                </span>
                {comment.profiles.role === 'admin' && (
                  <Shield className="w-4 h-4 text-red-500" title="Admin" />
                )}
                {comment.profiles.role === 'moderator' && (
                  <Shield className="w-4 h-4 text-blue-500" title="Moderator" />
                )}
                {comment.is_edited && (
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    edited
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>@{comment.profiles.username}</span>
                <span>•</span>
                <span>{formatDistanceToNow(comment.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Comment Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                {comment.can_edit && (
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                {comment.can_delete && (
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
                {comment.user_id !== authState.user?.id && (
                  <button
                    onClick={() => {
                      setShowReportModal(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Comment Content */}
        {showEditForm ? (
          <CommentForm
            initialContent={comment.content}
            onSubmit={handleEdit}
            onCancel={() => setShowEditForm(false)}
            submitLabel="Save Changes"
            placeholder="Edit your comment..."
          />
        ) : (
          <div className="mb-3">
            <p className="text-dark-gray leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        )}

        {/* Comment Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Voting */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote('upvote')}
                disabled={isVoting}
                className={`p-1 rounded-full hover:bg-gray-100 transition-all duration-300 ${getVoteColor('upvote')} hover:scale-110`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                {comment.votes_count}
              </span>
              <button
                onClick={() => handleVote('downvote')}
                disabled={isVoting}
                className={`p-1 rounded-full hover:bg-gray-100 transition-all duration-300 ${getVoteColor('downvote')} hover:scale-110`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Reply Button */}
            {shouldShowReplies && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-deep-blue transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Count */}
          {comment.replies && comment.replies.length > 0 && (
            <span className="text-xs text-gray-500">
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </span>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CommentForm
              onSubmit={handleReply}
              onCancel={() => setShowReplyForm(false)}
              placeholder="Write a reply..."
              submitLabel="Reply"
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {shouldShowReplies && comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <EnhancedCommentCard
              key={reply.id}
              comment={reply}
              onVote={onVote}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onReport={onReport}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReport}
        commentId={comment.id}
      />
    </div>
  );
};