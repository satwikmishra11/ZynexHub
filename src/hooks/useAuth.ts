import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState } from '../types';

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
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
    isLoading: true,
  });

  useEffect(() => {
    // Simulate checking for existing auth token
    const checkAuth = () => {
      const savedUser = localStorage.getItem('zynexhub_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem('zynexhub_user');
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      fullName: 'John Doe',
      bio: 'Welcome to ZynexHub! 🚀',
      avatar: `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400`,
      isVerified: true,
      followersCount: 1234,
      followingCount: 567,
      postsCount: 89,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('zynexhub_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (userData: any) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      bio: 'New to ZynexHub! 👋',
      avatar: `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400`,
      isVerified: false,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('zynexhub_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('zynexhub_user');
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
        localStorage.setItem('zynexhub_user', JSON.stringify(updatedUser));
        return { ...prev, user: updatedUser };
      }
      return prev;
    });
  };

  return {
    authState,
    login,
    register,
    logout,
    updateUser,
  };
};

export { AuthContext };