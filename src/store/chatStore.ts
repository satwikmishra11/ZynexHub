import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  sender_profile?: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
}

interface ChatUser {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
}

interface ChatState {
  messages: Message[]
  chatUsers: ChatUser[]
  activeChat: string | null
  loading: boolean
  fetchChatUsers: () => Promise<void>
  fetchMessages: (userId: string) => Promise<void>
  sendMessage: (receiverId: string, content: string) => Promise<void>
  setActiveChat: (userId: string | null) => void
  subscribeToMessages: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  chatUsers: [],
  activeChat: null,
  loading: false,

  fetchChatUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url')
      .limit(20)
    
    if (error) throw error
    set({ chatUsers: data || [] })
  },

  fetchMessages: async (userId: string) => {
    set({ loading: true })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender_profile:sender_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    set({ messages: data || [], loading: false })
  },

  sendMessage: async (receiverId: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user logged in')
    
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content,
      })
    
    if (error) throw error
  },

  setActiveChat: (userId: string | null) => {
    set({ activeChat: userId })
    if (userId) {
      get().fetchMessages(userId)
    }
  },

  subscribeToMessages: () => {
    const { data: { user } } = supabase.auth.getUser()
    user.then((result) => {
      if (result.user) {
        supabase
          .channel('messages')
          .on('postgres_changes', 
            { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'messages',
              filter: `receiver_id=eq.${result.user.id}`
            }, 
            (payload) => {
              const { activeChat } = get()
              if (activeChat === payload.new.sender_id) {
                get().fetchMessages(activeChat)
              }
            }
          )
          .subscribe()
      }
    })
  },
}))