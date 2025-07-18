import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabase';

interface AuthUser extends Profile {
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<AuthUser>) => void;
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
    isLoading: false,
  });

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (user: User) => {
    try {
      console.log('Loading profile for user:', user.id);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // Check if the error is because no profile exists (PGRST116)
        if (error.code === 'PGRST116' || error.message.includes('no rows returned')) {
          console.log('No profile found, creating default profile for user:', user.id);
          console.log('No profile found, creating default profile for user:', user.id);
          
          // Create a default profile for the authenticated user
          const defaultUsername = user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`;
          const defaultFullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              username: defaultUsername,
              full_name: defaultFullName,
              bio: 'Welcome to ZynexHub!',
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError);
            // Don't fail completely, try to continue with basic user data
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }

          // Use the newly created profile
          const authUser: AuthUser = {
            ...newProfile,
            email: user.email || '',
            avatar_url: newProfile.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`,
          };

          setAuthState({
            user: authUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        } else {
          console.error('Error loading profile:', error);
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }
      }

      const authUser: AuthUser = {
        ...profile,
        email: user.email || '',
        avatar_url: profile.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`,
      };

      setAuthState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Login successful, user:', authData.user?.id);
      // The auth state change listener will handle profile loading
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }) => {
    console.log('Attempting registration for:', userData.email);

    try {
      // Check if username is already taken
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', userData.username)
        .single();

      if (existingUser) {
        throw new Error('Username is already taken');
      }

      // Sign up the user
      const { data: authData, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username,
            full_name: userData.fullName,
            bio: 'Welcome to ZynexHub!',
          }
        }
      });

      if (error) throw error;

      if (authData.user && !authData.session) {
        // Email confirmation required
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        throw new Error('Please check your email and click the confirmation link to complete registration.');
      }

      if (authData.user && authData.session) {
        // Create profile (this should be handled by the trigger, but let's ensure it)
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            username: userData.username,
            full_name: userData.fullName,
            bio: 'Welcome to ZynexHub!',
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      console.log('Registration successful');
      // The auth state change listener will handle profile loading
    } catch (error: any) {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    setAuthState(prev => {
      if (prev.user) {
        const updatedUser = { ...prev.user, ...userData };
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