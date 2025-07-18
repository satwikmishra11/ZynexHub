import React, { useState } from 'react';
import { Image, Smile, MapPin, Send, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../LoadingSpinner';

interface CreatePostCardProps {
  onCreatePost?: (content: string) => Promise<void>;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { authState } = useAuth();
  const { user } = authState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onCreatePost?.(content.trim());
        setContent('');
        setIsFocused(false);
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`card p-6 mb-6 transition-all duration-300 ${isFocused ? 'ring-2 ring-deep-blue/20 shadow-lg' : ''}`}>
      <div className="flex space-x-4">
        <div className="relative">
          <img
            src={user?.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
            alt={user?.full_name || user?.username}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent hover:ring-deep-blue/30 transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-green rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !content.trim() && setIsFocused(false)}
                placeholder="What's on your mind?"
                className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300 placeholder-gray-400"
                rows={isFocused ? 4 : 3}
                maxLength={500}
              />
              {content && (
                <button
                  type="button"
                  onClick={() => setContent('')}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {content && (
              <div className="text-right text-xs text-gray-500 mt-1">
                {content.length}/500
              </div>
            )}
            
            <div className={`flex items-center justify-between mt-4 transition-all duration-300 ${isFocused ? 'opacity-100' : 'opacity-70'}`}>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300 group"
                >
                  <Image className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300 group"
                >
                  <Smile className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">Emoji</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300 group"
                >
                  <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">Location</span>
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};