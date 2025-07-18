import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, MessageCircle, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar: React.FC = () => {
  const { signOut } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Feed' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen fixed bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold">ZynexHub</h1>
      </div>
      <nav className="mt-8">
        {navItems.map(item => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center px-4 py-2 mx-4 my-1 rounded-lg ${
              location.pathname === item.href ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <item.icon className="mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 w-full px-4">
        <button onClick={signOut} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 rounded-lg">
          <LogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
