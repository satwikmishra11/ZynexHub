import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Story } from '../../types';

interface UserStoryGroup {
  user: {
    id: string;
    username: string;
    fullName: string;
    avatar?: string;
  };
  stories: Story[];
  hasUnviewed: boolean;
}

interface StoryViewerProps {
  userStories: UserStoryGroup[];
  currentUserIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStoryView: (storyId: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  userStories,
  currentUserIndex,
  onClose,
  onNext,
  onPrevious,
  onStoryView,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUserStories = userStories[currentUserIndex];
  const currentStory = currentUserStories.stories[currentStoryIndex];

  useEffect(() => {
    if (currentStory) {
      onStoryView(currentStory.id);
    }
  }, [currentStory, onStoryView]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNextStory();
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total (100 * 50ms)

    return () => clearInterval(timer);
  }, [currentStoryIndex, currentUserIndex, isPaused]);

  const handleNextStory = () => {
    if (currentStoryIndex < currentUserStories.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onNext();
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      onPrevious();
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    if (clickX < width / 2) {
      handlePreviousStory();
    } else {
      handleNextStory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {currentUserStories.stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentStoryIndex ? '100%' : 
                       index === currentStoryIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <img
            src={currentUserStories.user.avatar}
            alt={currentUserStories.user.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div>
            <p className="text-white font-semibold">{currentUserStories.user.username}</p>
            <p className="text-white/80 text-sm">2h ago</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {currentUserIndex > 0 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {currentUserIndex < userStories.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Story Content */}
      <div
        className="relative w-full h-full max-w-md mx-auto cursor-pointer"
        onClick={handleStoryClick}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={currentStory.mediaUrl}
          alt="Story"
          className="w-full h-full object-cover"
        />
        
        {/* Story Text Overlay */}
        {currentStory.content && (
          <div className="absolute bottom-20 left-4 right-4">
            <p className="text-white text-lg font-medium drop-shadow-lg">
              {currentStory.content}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3 z-10">
        <input
          type="text"
          placeholder="Send message"
          className="flex-1 px-4 py-2 bg-transparent border border-white/50 rounded-full text-white placeholder-white/70 focus:outline-none focus:border-white"
        />
        <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
          <Heart className="w-6 h-6" />
        </button>
        <button className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};