import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          bio: string | null;
          avatar_url: string | null;
          is_verified: boolean;
          followers_count: number;
          following_count: number;
          posts_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_verified?: boolean;
          followers_count?: number;
          following_count?: number;
          posts_count?: number;
        };
        Update: {
          username?: string;
          full_name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          is_verified?: boolean;
          followers_count?: number;
          following_count?: number;
          posts_count?: number;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          images: string[] | null;
          likes_count: number;
          comments_count: number;
          shares_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          content: string;
          images?: string[] | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
        };
        Update: {
          content?: string;
          images?: string[] | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          updated_at?: string;
        };
      };
      stories: {
        Row: {
          id: string;
          user_id: string;
          media_url: string;
          media_type: 'image' | 'video';
          content: string | null;
          views_count: number;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          media_url: string;
          media_type: 'image' | 'video';
          content?: string | null;
          views_count?: number;
          expires_at: string;
        };
        Update: {
          content?: string | null;
          views_count?: number;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          likes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
          content: string;
          likes_count?: number;
        };
        Update: {
          content?: string;
          likes_count?: number;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string | null;
          comment_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          post_id?: string | null;
          comment_id?: string | null;
        };
        Update: {};
      };
    };
  };
}