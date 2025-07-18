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

    // Optimistically update UI
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
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: postId });
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: postId });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert optimistic update on error
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
