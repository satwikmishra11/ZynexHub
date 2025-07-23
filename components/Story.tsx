
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface StoryData {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  timestamp: string;
  isViewed: boolean;
}

interface StoryProps {
  story: StoryData;
  onClick: (story: StoryData) => void;
}

export const Story: React.FC<StoryProps> = ({ story, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(story)}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-full p-0.5 ${
        story.isViewed ? 'bg-slate-300' : 'bg-gradient-to-r from-pink-500 to-orange-500'
      }`}>
        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
          <img
            src={story.avatar}
            alt={story.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-slate-600 text-center max-w-[70px] truncate">
        {story.username}
      </span>
    </motion.div>
  );
};

export const StoriesSection: React.FC = () => {
  const [stories] = useState<StoryData[]>([
    {
      id: '1',
      userId: '1',
      username: 'alex_dev',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20male%20developer%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20clean%20professional%20lighting%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user1&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=Modern%20workspace%20with%20laptop%20and%20coffee%2C%20soft%20natural%20lighting%2C%20minimalist%20setup%2C%20professional%20atmosphere%2C%20clean%20aesthetic&width=400&height=600&seq=story1&orientation=portrait',
      timestamp: '2 hours ago',
      isViewed: false
    },
    {
      id: '2',
      userId: '2',
      username: 'sarah_design',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20female%20designer%20with%20creative%20workspace%20background%2C%20modern%20lighting%2C%20confident%20expression%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user2&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=Creative%20design%20workspace%20with%20sketches%20and%20color%20palettes%2C%20artistic%20lighting%2C%20inspiring%20creative%20environment%2C%20designer%20tools%20and%20materials&width=400&height=600&seq=story2&orientation=portrait',
      timestamp: '4 hours ago',
      isViewed: true
    },
    {
      id: '3',
      userId: '3',
      username: 'mike_photo',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20photographer%20with%20camera%20equipment%20in%20background%2C%20natural%20lighting%2C%20artistic%20composition%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user3&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20landscape%20photography%20with%20golden%20hour%20lighting%2C%20stunning%20natural%20scenery%2C%20professional%20photography%20composition%2C%20breathtaking%20view&width=400&height=600&seq=story3&orientation=portrait',
      timestamp: '6 hours ago',
      isViewed: false
    },
    {
      id: '4',
      userId: '4',
      username: 'emma_travel',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20female%20traveler%20with%20adventure%20gear%2C%20outdoor%20background%2C%20confident%20smile%2C%20natural%20lighting%20portrait&width=400&height=400&seq=user4&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=Amazing%20travel%20destination%20with%20beautiful%20architecture%2C%20vibrant%20colors%2C%20tourist%20attraction%2C%20cultural%20landmark%2C%20wanderlust%20inspiration&width=400&height=600&seq=story4&orientation=portrait',
      timestamp: '8 hours ago',
      isViewed: true
    },
    {
      id: '5',
      userId: '5',
      username: 'david_fitness',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20athletic%20male%20trainer%20in%20gym%20environment%2C%20healthy%20lifestyle%2C%20motivational%20expression%2C%20fitness%20background&width=400&height=400&seq=user5&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=Modern%20fitness%20gym%20with%20equipment%20and%20motivational%20atmosphere%2C%20healthy%20lifestyle%2C%20workout%20environment%2C%20athletic%20inspiration&width=400&height=600&seq=story5&orientation=portrait',
      timestamp: '12 hours ago',
      isViewed: false
    }
  ]);

  const handleStoryClick = (story: StoryData) => {
    console.log('Story clicked:', story.username);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {stories.map((story) => (
          <Story
            key={story.id}
            story={story}
            onClick={handleStoryClick}
          />
        ))}
      </div>
    </div>
  );
};
