import { useState } from 'react';
import { usePostStore } from '../store/postStore';

export const useCreatePost = () => {
  const createPost = usePostStore(state => state.createPost);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (content: string, imageUrl?: string) => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await createPost(content, imageUrl);
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error display to user
    } finally {
      setLoading(false);
    }
  };

  return { createPost: handleCreatePost, loading };
};
