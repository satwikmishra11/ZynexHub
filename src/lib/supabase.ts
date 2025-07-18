import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on actual schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          username?: string;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          image_url: string | null;
          likes_count: number | null;
          comments_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          user_id: string;
          content: string;
          image_url?: string | null;
        };
        Update: {
          content?: string;
          image_url?: string | null;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          post_id: string;
          user_id: string;
          content: string;
        };
        Update: {
          content?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          post_id: string;
        };
        Update: {};
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at: string | null;
        };
        Insert: {
          sender_id: string;
          receiver_id: string;
          content: string;
        };
        Update: {};
      };
      stories: {
        Row: {
          id: string;
          user_id: string;
          media_url: string;
          media_type: string | null;
          content: string | null;
          views_count: number | null;
          expires_at: string | null;
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          media_url: string;
          media_type?: string | null;
          content?: string | null;
        };
        Update: {
          content?: string | null;
          views_count?: number;
        };
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Like = Database['public']['Tables']['likes']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Story = Database['public']['Tables']['stories']['Row'];