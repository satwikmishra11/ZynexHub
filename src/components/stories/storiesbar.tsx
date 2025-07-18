import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../../types';
import { StoryViewer } from './StoryViewer';
import { useAuth } from '../../hooks/useAuth';

interface StoriesBarProps {
  stories: Story[];
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ stories }) => {
  const { authState } = useAuth();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  // Group stories by user
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = [];
    }
    acc[story.userId].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  const userStories = Object.values(groupedStories).map(userStoryGroup => ({
    user: userStoryGroup[0].user,
    stories: userStoryGroup,
    hasUnviewed: userStoryGroup.some(story => !viewedStories.has(story.id) && !story.isViewed),
  }));

  const handleStoryClick = (userIndex: number) => {
    setSelectedStoryIndex(userIndex);
  };

  const handleStoryView = (storyId: string) => {
    setViewedStories(prev => new Set([...prev, storyId]));
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  const handleNext = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < userStories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex-shrink-0 text-center">
            <button className="relative w-16 h-16 rounded-full bg-gradient-to-br from-deep-blue to-blue-green flex items-center justify-center text-white hover:scale-105 transition-transform duration-300">
              <Plus className="w-6 h-6" />
            </button>
            <p className="text-xs text-gray-600 mt-2 truncate w-16">Your Story</p>
          </div>

          {/* User Stories */}
          {userStories.map((userStory, index) => (
            <div key={userStory.user.id} className="flex-shrink-0 text-center">
              <button
                onClick={() => handleStoryClick(index)}
                className="relative group"
              >
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  userStory.hasUnviewed 
                    ? 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500' 
                    : 'bg-gray-300'
                }`}>
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={userStory.user.avatar}
                      alt={userStory.user.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <p className="text-xs text-gray-600 mt-2 truncate w-16">
                {userStory.user.username}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          userStories={userStories}
          currentUserIndex={selectedStoryIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onStoryView={handleStoryView}
        />
      )}
    </>
  );
};