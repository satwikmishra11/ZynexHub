import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabase';

interface AuthUser extends Profile {
  email: string;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
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
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          if (mounted) {
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          }
          return;
        }

        if (session?.user && mounted) {
          console.log('Found existing session, loading profile...');
          await loadUserProfile(session.user);
        } else if (mounted) {
          console.log('No session found');
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
    };

    const loadUserProfile = async (user: User) => {
      try {
        console.log('Loading profile for user:', user.id);
        
        // Get or create profile
        let { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Profile fetch error:', error);
          if (mounted) {
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          }
          return;
        }

        // Create profile if it doesn't exist
        if (!profile) {
          console.log('Creating new profile...');
          const defaultUsername = user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`;
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              username: defaultUsername,
              full_name: user.user_metadata?.full_name || defaultUsername,
              bio: 'Welcome to ZynexHub!',
              avatar_url: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100',
            })
            .select()
            .single();

          if (insertError) {
            console.error('Profile creation error:', insertError);
            if (mounted) {
              setAuthState({ user: null, isAuthenticated: false, isLoading: false });
            }
            return;
          }

          profile = newProfile;
        }

        if (mounted) {
          const authUser: AuthUser = {
            ...profile,
            email: user.email || '',
          };

          console.log('Setting authenticated user:', authUser.username);
          setAuthState({
            user: authUser,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Profile loading error:', error);
        if (mounted) {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
    };

    // Initialize auth
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }

    console.log('Login successful');
  };

  const register = async (userData: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }) => {
    console.log('Register attempt for:', userData.email);

    // Check username availability
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', userData.username)
      .maybeSingle();

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          username: userData.username,
          full_name: userData.fullName,
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('Registration successful');
  };

  const resendConfirmation = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      throw new Error(error.message);
    }
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    setAuthState(prev => {
      if (prev.user) {
        return { ...prev, user: { ...prev.user, ...userData } };
      }
      return prev;
    });
  };

  return {
    authState,
    login,
    register,
    resendConfirmation,
    logout,
    updateUser,
  };
};

export { AuthContext };