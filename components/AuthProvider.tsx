
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, RegisterData, mockUsers, TOKEN_KEY } from '../lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        const foundUser = mockUsers.find(u => u.id === userData.userId);
        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && foundUser.password === password) {
      const token = btoa(JSON.stringify({ userId: foundUser.id, exp: Date.now() + 86400000 }));
      localStorage.setItem(TOKEN_KEY, `header.${token}.signature`);
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === userData.email || u.username === userData.username);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      bio: 'New ZynexHub user',
      avatar: 'https://readdy.ai/api/search-image?query=Default%20avatar%20placeholder%20with%20modern%20gradient%20background%2C%20minimalist%20design%2C%20professional%20appearance%2C%20clean%20simple%20aesthetic&width=400&height=400&seq=defaultuser&orientation=squarish',
      followers: 0,
      following: 0,
      isVerified: false,
      password: userData.password
    };

    mockUsers.push(newUser);
    const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 86400000 }));
    localStorage.setItem(TOKEN_KEY, `header.${token}.signature`);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};