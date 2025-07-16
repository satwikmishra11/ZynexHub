import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This is a critical check. If these variables are not set, the app will fail silently.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your Vercel project settings.");
  throw new Error("Supabase environment variables are missing.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
