import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Post {
  id: string
  user_id: string
  content: string
  image_url: string | null
  likes_count: number
  comments_count: number
  created_at: string
  updated_at: string
  profiles: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
  is_liked?: boolean
}

interface Comment {
  id: string
  user_id: string
  post_id: string
  content: string
  created_at: string
  profiles: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
}

interface PostState {
  posts: Post[]
  comments: { [postId: string]: Comment[] }
  loading: boolean
  fetchFeed: () => Promise<void>
  createPost: (content: string, imageUrl?: string) => Promise<void>
  likePost: (postId: string) => Promise<void>
  fetchComments: (postId: string) => Promise<void>
  addComment: (postId: string, content: string) => Promise<void>
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  comments: {},
  loading: false,

  fetchFeed: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // Check which posts are liked by current user
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: likes } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', user.id)
        
        const likedPostIds = new Set(likes?.map(like => like.post_id) || [])
        
        const postsWithLikes = data?.map(post => ({
          ...post,
          is_liked: likedPostIds.has(post.id)
        })) || []
        
        set({ posts: postsWithLikes })
      } else {
        set({ posts: data || [] })
      }
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      set({ loading: false })
    }
  },

  createPost: async (content: string, imageUrl?: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user logged in')
    
    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content,
        image_url: imageUrl || null,
      })
    
    if (error) throw error
    await get().fetchFeed()
  },

  likePost: async (postId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user logged in')
    
    // Check if already liked
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .single()
    
    if (existingLike) {
      // Unlike
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', postId)
      
      // Decrement likes count
      await supabase.rpc('decrement_likes', { post_id: postId })
    } else {
      // Like
      await supabase
        .from('likes')
        .insert({ user_id: user.id, post_id: postId })
      
      // Increment likes count
      await supabase.rpc('increment_likes', { post_id: postId })
    }
    
    await get().fetchFeed()
  },

  fetchComments: async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    set(state => ({
      comments: {
        ...state.comments,
        [postId]: data || []
      }
    }))
  },

  addComment: async (postId: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user logged in')
    
    const { error } = await supabase
      .from('comments')
      .insert({
        user_id: user.id,
        post_id: postId,
        content,
      })
    
    if (error) throw error
    
    // Increment comments count
    await supabase.rpc('increment_comments', { post_id: postId })
    
    await get().fetchComments(postId)
    await get().fetchFeed()
  },
}))