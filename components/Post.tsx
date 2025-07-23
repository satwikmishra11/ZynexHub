
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export interface PostData {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostProps {
  post: PostData;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export const Post: React.FC<PostProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id);
      setNewComment('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={post.avatar}
              alt={post.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800">{post.fullName}</h3>
              {post.isVerified && (
                <i className="ri-verified-badge-fill text-blue-500 text-sm"></i>
              )}
            </div>
            <p className="text-sm text-slate-500">@{post.username} • {post.timestamp}</p>
          </div>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <i className="ri-more-line text-lg"></i>
          </Button>
        </div>

        <p className="text-slate-800 mb-4 leading-relaxed">{post.content}</p>

        {post.image && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-2 ${
                post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
              } transition-colors`}
            >
              <i className={`${post.isLiked ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
              <span className="text-sm font-medium">{post.likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors"
            >
              <i className="ri-chat-3-line text-xl"></i>
              <span className="text-sm font-medium">{post.comments}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onShare(post.id)}
              className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors"
            >
              <i className="ri-share-line text-xl"></i>
              <span className="text-sm font-medium">{post.shares}</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmark(post.id)}
            className={`${
              post.isBookmarked ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500'
            } transition-colors`}
          >
            <i className={`${post.isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-xl`}></i>
          </motion.button>
        </div>

        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-slate-100"
          >
            <form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Default%20user%20avatar%20with%20modern%20gradient%20background%2C%20minimalist%20design%2C%20professional%20appearance&width=100&height=100&seq=currentuser&orientation=squarish"
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                <i className="ri-send-plane-line"></i>
              </Button>
            </form>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20person%20with%20friendly%20expression%2C%20modern%20background%2C%20high%20quality%20portrait%20photography&width=100&height=100&seq=commenter1&orientation=squarish"
                    alt="Commenter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-2xl px-3 py-2">
                    <p className="font-medium text-sm text-slate-800">Jessica Wong</p>
                    <p className="text-sm text-slate-700">This is amazing! Great work 👏</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>2h</span>
                    <button className="hover:text-slate-700">Like</button>
                    <button className="hover:text-slate-700">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
