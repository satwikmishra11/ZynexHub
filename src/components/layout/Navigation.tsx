import React from 'react';
import { Home, Search, MessageCircle, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { authState, logout } = useAuth();
  const { user } = authState;

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-auto md:w-64 md:h-full bg-white border-t md:border-t-0 md:border-r border-gray-200 z-50">
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
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-deep-blue text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* User Info & Logout - Desktop only */}
        <div className="hidden md:block mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.avatar || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
              alt={user?.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-gray truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
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
  );
};