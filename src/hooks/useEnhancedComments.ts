import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { EnhancedComment, CommentFormData, CommentVote } from '../types/enhanced';

export const useEnhancedComments = (postId: string) => {
  const [comments, setComments] = useState<EnhancedComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useAuth();

  const fetchComments = async () => {
    if (!postId || !authState.user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch comments with user profiles and vote information
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            display_name,
            avatar_url,
            role,
            status
          )
        `)
        .eq('post_id', postId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Fetch user votes for these comments
      const commentIds = commentsData?.map(c => c.id) || [];
      let userVotes: CommentVote[] = [];
      
      if (commentIds.length > 0) {
        const { data: votesData } = await supabase
          .from('comment_votes')
          .select('*')
          .eq('user_id', authState.user.id)
          .in('comment_id', commentIds);
        
        userVotes = votesData || [];
      }

      // Process comments into threaded structure
      const processedComments = processCommentsIntoThreads(commentsData || [], userVotes);
      setComments(processedComments);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processCommentsIntoThreads = (
    comments: any[], 
    userVotes: CommentVote[]
  ): EnhancedComment[] => {
    const voteMap = new Map(userVotes.map(vote => [vote.comment_id, vote.vote_type]));
    
    // Convert to enhanced comments with user permissions
    const enhancedComments: EnhancedComment[] = comments.map(comment => ({
      ...comment,
      user_vote: voteMap.get(comment.id) || null,
      can_edit: comment.user_id === authState.user?.id && !comment.is_deleted,
      can_delete: comment.user_id === authState.user?.id || 
                  ['moderator', 'admin'].includes(authState.user?.role || ''),
      replies: []
    }));

    // Build threaded structure
    const commentMap = new Map(enhancedComments.map(c => [c.id, c]));
    const rootComments: EnhancedComment[] = [];

    enhancedComments.forEach(comment => {
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

  const addComment = async (formData: CommentFormData) => {
    if (!authState.user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: authState.user.id,
          content: formData.content,
          parent_id: formData.parent_id || null,
        })
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            display_name,
            avatar_url,
            role,
            status
          )
        `)
        .single();

      if (error) throw error;

      // Refresh comments to get updated structure
      await fetchComments();
      return data;
    } catch (error: any) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const updateComment = async (commentId: string, content: string) => {
    if (!authState.user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('comments')
        .update({
          content,
          is_edited: true,
          edit_count: supabase.sql`edit_count + 1`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', commentId)
        .eq('user_id', authState.user.id);

      if (error) throw error;

      await fetchComments();
    } catch (error: any) {
      console.error('Error updating comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!authState.user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('comments')
        .update({
          is_deleted: true,
          content: '[deleted]',
          updated_at: new Date().toISOString(),
        })
        .eq('id', commentId);

      if (error) throw error;

      await fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  const voteComment = async (commentId: string, voteType: 'upvote' | 'downvote') => {
    if (!authState.user) throw new Error('User not authenticated');

    try {
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('comment_votes')
        .select('*')
        .eq('user_id', authState.user.id)
        .eq('comment_id', commentId)
        .maybeSingle();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if same type
          const { error } = await supabase
            .from('comment_votes')
            .delete()
            .eq('id', existingVote.id);
          
          if (error) throw error;
        } else {
          // Update vote type
          const { error } = await supabase
            .from('comment_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
          
          if (error) throw error;
        }
      } else {
        // Create new vote
        const { error } = await supabase
          .from('comment_votes')
          .insert({
            user_id: authState.user.id,
            comment_id: commentId,
            vote_type: voteType,
          });
        
        if (error) throw error;
      }

      await fetchComments();
    } catch (error: any) {
      console.error('Error voting on comment:', error);
      throw error;
    }
  };

  const reportComment = async (commentId: string, reason: string, description?: string) => {
    if (!authState.user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('comment_reports')
        .insert({
          reporter_id: authState.user.id,
          comment_id: commentId,
          reason,
          description: description || null,
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error reporting comment:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (postId && authState.user) {
      fetchComments();
    }
  }, [postId, authState.user]);

  // Real-time subscriptions
  useEffect(() => {
    if (!postId || !authState.user) return;

    const commentsSubscription = supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    const votesSubscription = supabase
      .channel(`comment_votes:${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment_votes',
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      commentsSubscription.unsubscribe();
      votesSubscription.unsubscribe();
    };
  }, [postId, authState.user]);

  return {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    voteComment,
    reportComment,
    refetch: fetchComments,
  };
};