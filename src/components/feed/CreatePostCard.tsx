import React, { useState } from 'react';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface CreatePostCardProps {
  onCreatePost?: (content: string) => void;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const { authState } = useAuth();
  const { user } = authState;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost?.(content.trim());
      setContent('');
    }
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex space-x-4">
        <img
          src={user?.avatar || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
          alt={user?.fullName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300"
              rows={3}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue transition-colors"
                >
                  <Image className="w-5 h-5" />
                  <span className="text-sm">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue transition-colors"
                >
                  <Smile className="w-5 h-5" />
                  <span className="text-sm">Emoji</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-deep-blue transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Location</span>
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!content.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};