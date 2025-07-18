import { Database } from './supabase';

export type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: Profile;
  is_liked?: boolean;
};

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type Comment = Database['public']['Tables']['comments']['Row'] & {
  profiles: Profile;
};

export type Message = Database['public']['Tables']['messages']['Row'] & {
  sender: Profile;
};

export type User = Database['public']['Tables']['profiles']['Row'];
