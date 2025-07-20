import React, { useState } from 'react';
import { Home, Search, MessageCircle, Bell, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationCenter } from '../notifications/NotificationCenter';

interface EnhancedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const { authState, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = authState;

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { 
      id: 'notifications', 
      icon: Bell, 
      label: 'Notifications',
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  // Add moderation tab for moderators and admins
  if (user && ['moderator', 'admin'].includes(user.role)) {
    navItems.splice(-1, 0, {
      id: 'moderation',
      icon: Shield,
      label: 'Moderation'
    });
  }

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'notifications') {
      handleNotificationClick();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-auto md:w-64 md:h-full bg-white border-t md:border-t-0 md:border-r border-gray-200 z-40">
        <div className="md:p-6">
          {/* Logo - Desktop only */}
          <div className="hidden md:flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold text-dark-gray">ZynexHub</span>
          </div>

          {/* Navigation Items */}
          <div className="flex md:flex-col justify-around md:justify-start md:space-y-2 p-2 md:p-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-deep-blue text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="hidden md:block font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Info & Logout - Desktop only */}
          <div className="hidden md:block mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <img
                  src={user?.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                  alt={user?.full_name || user?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user?.role === 'admin' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Shield className="w-2 h-2 text-white" />
                  </div>
                )}
                {user?.role === 'moderator' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Shield className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-gray truncate">
                  {user?.display_name || user?.full_name || user?.username}
                </p>
                <div className="flex items-center space-x-1">
                  <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
                  {user?.role !== 'user' && (
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      user?.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user?.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};