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
    return get().messages.filter(
      (msg) =>
        (msg.senderId === userId && msg.receiverId === get().activeChatUserId) ||
        (msg.receiverId === userId && msg.senderId === get().activeChatUserId)
    );
  },
}));
