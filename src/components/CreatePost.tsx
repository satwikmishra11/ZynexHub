import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCreatePost } from '../hooks/useCreatePost';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const { profile } = useAuthStore();
  const { createPost, loading } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(content);
    setContent('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex space-x-4">
        <img
          src={profile?.avatar_url || `https://i.pravatar.cc/150?u=${profile?.id}`}
          alt={profile?.full_name || 'User'}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Image className="h-5 w-5" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
