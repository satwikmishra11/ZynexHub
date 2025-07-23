
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { useAuth } from './AuthProvider';

interface CreatePostProps {
  onCreatePost: (content: string, image?: string) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onCreatePost(content);
    setContent('');
    setIsExpanded(false);
    setIsPosting(false);
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's on your mind?"
              className="w-full resize-none border-none outline-none text-lg placeholder-slate-500 bg-transparent"
              rows={isExpanded ? 4 : 1}
            />
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-slate-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <i className="ri-image-line text-lg"></i>
                  Photo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <i className="ri-video-line text-lg"></i>
                  Video
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <i className="ri-emotion-line text-lg"></i>
                  Feeling
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setContent('');
                    setIsExpanded(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!content.trim()}
                  isLoading={isPosting}
                >
                  Post
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};
