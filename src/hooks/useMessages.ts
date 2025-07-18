import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface MessageWithProfile {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  sender_profile: {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  receiver_profile: {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface ChatUser {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useAuth();

  const fetchChatUsers = async () => {
    if (!authState.user) return;

    try {
      setIsLoading(true);

      // Get all users who have exchanged messages with current user
      const { data, error } = await supabase
        .from('messages')
        .select(`
          sender_id,
          receiver_id,
          content,
          created_at,
          sender_profile:profiles!messages_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          ),
          receiver_profile:profiles!messages_receiver_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .or(`sender_id.eq.${authState.user.id},receiver_id.eq.${authState.user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process messages to get unique chat users with last message
      const userMap = new Map<string, ChatUser>();
      
      data?.forEach(message => {
        const otherUserId = message.sender_id === authState.user!.id 
          ? message.receiver_id 
          : message.sender_id;
        
        const otherUserProfile = message.sender_id === authState.user!.id 
          ? message.receiver_profile 
          : message.sender_profile;

        if (!userMap.has(otherUserId)) {
          userMap.set(otherUserId, {
            ...otherUserProfile,
            last_message: message.content,
            last_message_time: message.created_at,
            unread_count: 0, // TODO: Implement unread count
          });
        }
      });

      setChatUsers(Array.from(userMap.values()));
    } catch (error) {
      console.error('Error fetching chat users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    if (!authState.user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender_profile:profiles!messages_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          ),
          receiver_profile:profiles!messages_receiver_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .or(`and(sender_id.eq.${authState.user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${authState.user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (receiverId: string, content: string) => {
    if (!authState.user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: authState.user.id,
          receiver_id: receiverId,
          content,
        })
        .select(`
          *,
          sender_profile:profiles!messages_sender_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          ),
          receiver_profile:profiles!messages_receiver_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (authState.user) {
      fetchChatUsers();
    }
  }, [authState.user]);

  return {
    messages,
    chatUsers,
    isLoading,
    fetchMessages,
    sendMessage,
    refetchChatUsers: fetchChatUsers,
  };
};