
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, AuthProvider } from '../../components/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '../../components/ThemeProvider';

function LoginPageContent() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
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
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome back</h1>
          <p className="text-slate-600 dark:text-slate-400">Sign in to your ZynexHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
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
            disabled={!formData.email || !formData.password}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Demo credentials:</p>
            <p>Email: alex@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoginPageContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
