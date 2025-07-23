
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-slate-800 transition-colors">
              Home
            </Link>
            <Link href="/discover" className="text-slate-600 hover:text-slate-800 transition-colors">
              Discover
            </Link>
            <Link href="/messages" className="text-slate-600 hover:text-slate-800 transition-colors">
              Messages
            </Link>
            <Link href="/notifications" className="text-slate-600 hover:text-slate-800 transition-colors">
              Notifications
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0"
                >
                  <i className="ri-search-line text-xl"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0"
                >
                  <i className="ri-add-line text-xl"></i>
                </Button>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-colors"
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
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <i className="ri-user-line text-lg"></i>
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <i className="ri-settings-line text-lg"></i>
                        Settings
                      </Link>
                      <hr className="my-2 border-slate-200" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
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
