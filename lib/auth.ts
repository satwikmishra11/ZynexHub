
'use client';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  isVerified: boolean;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alex_dev',
    email: 'alex@example.com',
    fullName: 'Alex Johnson',
    bio: 'Full-stack developer passionate about creating amazing user experiences',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20male%20developer%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20clean%20professional%20lighting%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user1&orientation=squarish',
    followers: 1250,
    following: 890,
    isVerified: true,
    password: 'password123'
  },
  {
    id: '2',
    username: 'sarah_design',
    email: 'sarah@example.com',
    fullName: 'Sarah Chen',
    bio: 'UI/UX Designer crafting beautiful digital experiences',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20female%20designer%20with%20creative%20workspace%20background%2C%20modern%20lighting%2C%20confident%20expression%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user2&orientation=squarish',
    followers: 2100,
    following: 650,
    isVerified: true,
    password: 'password123'
  },
  {
    id: '3',
    username: 'mike_photo',
    email: 'mike@example.com',
    fullName: 'Michael Rodriguez',
    bio: 'Professional photographer capturing life\'s beautiful moments',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20photographer%20with%20camera%20equipment%20in%20background%2C%20natural%20lighting%2C%20artistic%20composition%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=user3&orientation=squarish',
    followers: 3400,
    following: 1200,
    isVerified: false,
    password: 'password123'
  }
];

export const JWT_SECRET = 'your-secret-key-here';
export const TOKEN_KEY = 'zynexhub_token';
