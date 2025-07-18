import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { User, AuthState } from '../types';

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  resendConfirmation: (email: string) => Promise<void>;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false, // Start with false to show login immediately
  });

  useEffect(() => {
    // Simple initialization - just show login page
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const login = async (email: string, password: string) => {
    // Demo mode login - always works
    const demoUser: User = {
      id: '1',
      username: 'demo_user',
      email: email,
      fullName: 'Demo User',
      bio: 'This is a demo account for ZynexHub',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200',
      isVerified: false,
      followersCount: 1234,
      followingCount: 567,
      postsCount: 89,
      createdAt: new Date().toISOString(),
    };

    setAuthState({
      user: demoUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (userData: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }) => {
    // Demo mode registration - create demo user
    const demoUser: User = {
      id: '1',
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      bio: 'Welcome to ZynexHub!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200',
      isVerified: false,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setAuthState({
      user: demoUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = async () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    setAuthState(prev => {
      if (prev.user) {
        const updatedUser = { ...prev.user, ...userData };
        return { ...prev, user: updatedUser };
      }
      return prev;
    });
  };

  const resendConfirmation = async (email: string) => {
    // Demo mode - just show success message
    return Promise.resolve();
  };

  return {
    authState,
    login,
    register,
    logout,
    updateUser,
    resendConfirmation,
  };
};

export { AuthContext };