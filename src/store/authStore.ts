import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { Profile } from '../types';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: (user: User) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,

  setSession: (session) => {
    set({ session, user: session?.user ?? null, loading: false });
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  signUp: async (email, password, username, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    if (data.user) {
        const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          full_name: fullName,
        })
      if (profileError) throw profileError
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ session: null, user: null, profile: null });
  },

  fetchProfile: async (user) => {
    if (!user) return;
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) set({ profile: data });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;
    set(state => ({ profile: { ...state.profile!, ...updates } }));
  },
}));

// src/store/postStore.ts
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Post, Comment } from '../types';

interface PostState {
  posts: Post[];
  comments: { [postId: string]: Comment[] };
  loading: boolean;
  fetchFeed: () => Promise<void>;
  getPost: (postId: string) => Post | undefined;
  createPost: (content: string, imageUrl?: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  comments: {},
  loading: false,

  fetchFeed: async () => {
    set({ loading: true });
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: likes } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        const likedPostIds = new Set(likes?.map(like => like.post_id));
        
        const postsWithLikes = posts?.map(post => ({
          ...post,
          is_liked: likedPostIds.has(post.id),
        })) || [];
        
        set({ posts: postsWithLikes as any[] });
      } else {
        set({ posts: posts as any[] });
      }
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      set({ loading: false });
    }
  },

  getPost: (postId: string) => {
    return get().posts.find(post => post.id === postId);
  },

  createPost: async (content: string, imageUrl?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('posts')
      .insert({ user_id: user.id, content, image_url: imageUrl })
      .select('*, profiles(*)')
      .single();

    if (error) throw error;
    set(state => ({ posts: [data as any, ...state.posts] }));
  },

  likePost: async (postId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const post = get().posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.is_liked;

    set(state => ({
      posts: state.posts.map(p =>
        p.id === postId
          ? {
              ...p,
              is_liked: !isLiked,
              likes_count: isLiked ? p.likes_count - 1 : p.likes_count + 1,
            }
          : p
      ),
    }));

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: postId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: postId });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error liking post:', error);
      set(state => ({
        posts: state.posts.map(p =>
          p.id === postId
            ? {
                ...p,
                is_liked: isLiked,
                likes_count: post.likes_count,
              }
            : p
        ),
      }));
    }
  },

  fetchComments: async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, profiles(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    set(state => ({
      comments: { ...state.comments, [postId]: data as any[] },
    }));
  },

  addComment: async (postId: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('comments')
      .insert({ user_id: user.id, post_id: postId, content })
      .select('*, profiles(*)')
      .single();

    if (error) throw error;
    set(state => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), data as any],
      },
      posts: state.posts.map(p =>
        p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
      ),
    }));
  },
}));

// src/store/chatStore.ts
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Message, User } from '../types';

interface ChatState {
  messages: Message[];
  chatUsers: User[];
  activeChatUserId: string | null;
  loading: boolean;
  lastFetch: { [key: string]: string };
  fetchChatUsers: () => Promise<void>;
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  setActiveChat: (userId: string | null) => void;
  getChat: (userId: string) => Message[] | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  chatUsers: [],
  activeChatUserId: null,
  loading: false,
  lastFetch: {},

  fetchChatUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    set({ chatUsers: data as any[] });
  },

  fetchMessages: async (userId) => {
    set({ loading: true });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const lastFetchTimestamp = get().lastFetch[userId] || new Date(0).toISOString();

    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:sender_id(*)')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`)
      .gt('created_at', lastFetchTimestamp)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    set(state => ({
      messages: [...state.messages, ...(data as any[])].sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
      loading: false,
      lastFetch: { ...state.lastFetch, [userId]: new Date().toISOString() },
    }));
  },

  sendMessage: async (receiverId, content) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('messages')
      .insert({ sender_id: user.id, receiver_id: receiverId, content })
      .select('*, sender:sender_id(*)')
      .single();

    if (error) throw error;
    set(state => ({ messages: [...state.messages, data as any] }));
  },

  setActiveChat: (userId) => {
    set({ activeChatUserId: userId });
    if (userId) {
      get().fetchMessages(userId);
    }
  },

  getChat: (userId) => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    return get().messages.filter(
      (msg) =>
        (msg.sender_id === userId && msg.receiver_id === user.id) ||
        (msg.receiver_id === userId && msg.sender_id === user.id)
    );
  },
}));
