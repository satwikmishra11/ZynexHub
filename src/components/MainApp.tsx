import React, { useState } from 'react';
import { Navigation } from './layout/Navigation';
import { FeedPage } from './feed/FeedPage';
import { ProfilePage } from './profile/ProfilePage';
import { ChatPage } from './chat/ChatPage';

export const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedPage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <ChatPage />;
      case 'explore':
        return (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-dark-gray mb-4">Explore</h2>
              <p className="text-gray-600">Discover new content and users</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-dark-gray mb-4">Notifications</h2>
              <p className="text-gray-600">Stay updated with your activity</p>
            </div>
          </div>
        );
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="md:ml-64 p-4 md:p-8 pb-20 md:pb-8">
        {renderContent()}
      </main>
    </div>
  );
};