import React, { useState, useEffect } from 'react';
import { Plus, Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface StoryUser {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  has_story: boolean;
  story_viewed: boolean;
}

export const StoriesBar: React.FC = () => {
  const { authState } = useAuth();
  const [storyUsers, setStoryUsers] = useState<StoryUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, [authState.user]);

  const fetchStories = async () => {
    if (!authState.user) return;

    try {
      // Get users with active stories (not expired)
      const { data: stories, error } = await supabase
        .from('stories')
        .select(`
          user_id,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by user and mark if viewed
      const userMap = new Map<string, StoryUser>();
      
      stories?.forEach(story => {
        if (!userMap.has(story.user_id)) {
          userMap.set(story.user_id, {
            ...story.profiles,
            has_story: true,
            story_viewed: false, // TODO: Implement story view tracking
          });
        }
      });

      setStoryUsers(Array.from(userMap.values()));
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200 p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 text-center animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="w-12 h-3 bg-gray-200 rounded mt-2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <div className="flex-shrink-0 text-center group">
          <button className="relative w-16 h-16 rounded-full bg-gradient-to-br from-deep-blue to-blue-green flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-3 h-3 text-deep-blue" />
            </div>
          </button>
          <p className="text-xs text-gray-600 mt-2 truncate w-16 font-medium">Your Story</p>
        </div>

        {/* User Stories */}
        {storyUsers.map((user) => (
          <div key={user.id} className="flex-shrink-0 text-center group">
            <button className="relative">
              <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 hover:scale-110 ${
                user.has_story && !user.story_viewed
                  ? 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 shadow-lg' 
                  : 'bg-gray-300'
              }`}>
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src={user.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={user.full_name || user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <p className="text-xs text-gray-600 mt-2 truncate w-16 font-medium">
              {user.username}
            </p>
          </div>
        ))}

        {storyUsers.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📸</span>
              </div>
              <p className="text-sm text-gray-500">No stories yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};