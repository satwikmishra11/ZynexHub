import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface PostWithProfile {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string | null;
  profiles: {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  user_liked: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useAuth();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check which posts the current user has liked
      let postsWithLikes = data || [];
      
      if (authState.user) {
        const { data: likes } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', authState.user.id);

        const likedPostIds = new Set(likes?.map(like => like.post_id) || []);
        
        postsWithLikes = (data || []).map(post => ({
          ...post,
          user_liked: likedPostIds.has(post.id)
        }));
      }

      setPosts(postsWithLikes);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authState.user) {
      fetchPosts();
    }
  }, [authState.user]);

  const createPost = async (content: string, imageUrl?: string) => {
    if (!authState.user) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: authState.user.id,
          content,
          image_url: imageUrl || null,
        })
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      const newPost = {
        ...data,
        user_liked: false
      };

      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const toggleLike = async (postId: string) => {
    if (!authState.user) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.user_liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', authState.user.id)
          .eq('post_id', postId);

        if (error) throw error;

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, user_liked: false, likes_count: p.likes_count - 1 }
            : p
        ));
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: authState.user.id,
            post_id: postId,
          });

        if (error) throw error;

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, user_liked: true, likes_count: p.likes_count + 1 }
            : p
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return {
    posts,
    isLoading,
    createPost,
    toggleLike,
    refetch: fetchPosts,
  };
};