
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCreatePost = () => {
    router.push('/');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleMessages = () => {
    router.push('/messages');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
              Home
            </Link>
            <Link href="/discover" className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
              Discover
            </Link>
            <Link href="/messages" className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
              Messages
            </Link>
            <Link href="/notifications" className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
              Notifications
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0"
                    onClick={handleSearch}
                  >
                    <i className="ri-search-line text-xl"></i>
                  </Button>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ri-search-line text-slate-400"></i>
                        <input
                          type="text"
                          placeholder="Search posts, people, communities..."
                          className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400"
                          autoFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Recent Searches</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                            <i className="ri-time-line text-slate-400"></i>
                            <span className="text-sm text-slate-600 dark:text-slate-300">React development</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                            <i className="ri-time-line text-slate-400"></i>
                            <span className="text-sm text-slate-600 dark:text-slate-300">Design inspiration</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0"
                  onClick={handleCreatePost}
                >
                  <i className="ri-add-line text-xl"></i>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 relative"
                  onClick={handleNotifications}
                >
                  <i className="ri-notification-line text-xl"></i>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 relative"
                  onClick={handleMessages}
                >
                  <i className="ri-message-3-line text-xl"></i>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
                
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-user-line text-lg"></i>
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <i className="ri-settings-line text-lg"></i>
                        Settings
                      </Link>
                      <hr className="my-2 border-slate-200 dark:border-slate-700" />
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors w-full text-left"
                      >
                        <i className="ri-logout-box-line text-lg"></i>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
