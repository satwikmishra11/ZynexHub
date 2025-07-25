
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, AuthProvider } from '../../components/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '../../components/ThemeProvider';

function RegisterPageContent() {
  const { register, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await register({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (success) {
      router.push('/');
    } else {
      setError('Email or username already exists');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-community-line text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Join ZynexHub</h1>
          <p className="text-slate-600 dark:text-slate-400">Create your account and start connecting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            icon={<i className="ri-user-line"></i>}
            placeholder="Enter your full name"
          />

          <Input
            type="text"
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            icon={<i className="ri-at-line"></i>}
            placeholder="Choose a username"
          />

          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            icon={<i className="ri-mail-line"></i>}
            placeholder="Enter your email"
          />

          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            icon={<i className="ri-lock-line"></i>}
            placeholder="Create a password"
          />

          <Input
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            icon={<i className="ri-lock-line"></i>}
            placeholder="Confirm your password"
          />

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={!formData.fullName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RegisterPageContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
