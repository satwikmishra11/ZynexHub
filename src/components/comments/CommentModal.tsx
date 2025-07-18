import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send } from 'lucide-react';
import { Post, Comment } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useAuth } from '../../hooks/useAuth';

interface CommentModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ post, isOpen, onClose }) => {
  const { authState } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      postId: post.id,
      userId: '2',
      user: {
        id: '2',
        username: 'sarah_dev',
        email: 'sarah@example.com',
        fullName: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        isVerified: true,
        followersCount: 2345,
        followingCount: 789,
        postsCount: 156,
        createdAt: '2024-01-15T10:30:00Z',
      },
      content: 'This is amazing! Great work on the authentication system. 🔥',
      likesCount: 12,
      isLiked: false,
      createdAt: '2024-12-10T15:30:00Z',
    },
    {
      id: '2',
      postId: post.id,
      userId: '3',
      user: {
        id: '3',
        username: 'mike_design',
        email: 'mike@example.com',
        fullName: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=400',
        isVerified: false,
        followersCount: 987,
        followingCount: 432,
        postsCount: 67,
        createdAt: '2024-02-20T14:15:00Z',
      },
      content: 'Would love to see a tutorial on this! The UI looks so clean.',
      likesCount: 8,
      isLiked: true,
      createdAt: '2024-12-10T16:45:00Z',
    },
  ]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && authState.user) {
      const comment: Comment = {
        id: Date.now().toString(),
        postId: post.id,
        userId: authState.user.id,
        user: authState.user,
        content: newComment.trim(),
        likesCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1
          }
        : comment
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Post Image */}
        {post.images && post.images.length > 0 && (
          <div className="hidden md:block w-1/2 bg-black">
            <img
              src={post.images[0]}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Comments Section */}
        <div className={`${post.images && post.images.length > 0 ? 'md:w-1/2' : 'w-full'} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={post.user.avatar}
                alt={post.user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-dark-gray">{post.user.fullName}</h3>
                <p className="text-sm text-gray-500">@{post.user.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Post Content */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-dark-gray leading-relaxed mb-3">{post.content}</p>
            <p className="text-sm text-gray-500">{formatDistanceToNow(post.createdAt)}</p>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 group">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.fullName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-dark-gray">
                      {comment.user.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed mb-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center space-x-1 text-xs ${
                        comment.isLiked ? 'text-red-500' : 'text-gray-500'
                      } hover:text-red-500 transition-colors`}
                    >
                      <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span>{comment.likesCount}</span>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmitComment} className="flex items-center space-x-3">
              <img
                src={authState.user?.avatar}
                alt={authState.user?.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 text-deep-blue hover:bg-deep-blue/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};