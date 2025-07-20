import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { CommentReport, ModerationAction } from '../types/enhanced';

export const useModeration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useAuth();

  const isModerator = () => {
    return authState.user && ['moderator', 'admin'].includes(authState.user.role);
  };

  const isAdmin = () => {
    return authState.user?.role === 'admin';
  };

  const fetchReports = async (status?: CommentReport['status']) => {
    if (!isModerator()) throw new Error('Insufficient permissions');

    try {
      setIsLoading(true);

      let query = supabase
        .from('comment_reports')
        .select(`
          *,
          reporter:reporter_id (username, full_name),
          comment:comment_id (content, user_id),
          reviewer:reviewed_by (username, full_name)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string, 
    status: CommentReport['status'],
    reviewNote?: string
  ) => {
    if (!isModerator()) throw new Error('Insufficient permissions');

    try {
      const { error } = await supabase
        .from('comment_reports')
        .update({
          status,
          reviewed_by: authState.user!.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', reportId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  };

  const moderateUser = async (userId: string, action: ModerationAction) => {
    if (!isModerator()) throw new Error('Insufficient permissions');

    try {
      setIsLoading(true);

      switch (action.type) {
        case 'suspend':
          await supabase
            .from('profiles')
            .update({ status: 'suspended' })
            .eq('id', userId);
          break;

        case 'ban':
          await supabase
            .from('profiles')
            .update({ status: 'banned' })
            .eq('id', userId);
          break;

        case 'delete_comment':
          await supabase
            .from('comments')
            .update({ 
              is_deleted: true, 
              content: '[removed by moderator]' 
            })
            .eq('id', action.target_id);
          break;

        default:
          throw new Error('Unknown moderation action');
      }

      // Log moderation action (you might want to create a moderation_log table)
      console.log('Moderation action performed:', action);
    } catch (error) {
      console.error('Error performing moderation action:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserStats = async (userId: string) => {
    if (!isModerator()) throw new Error('Insufficient permissions');

    try {
      // Get user's comment count, report count, etc.
      const [commentsResult, reportsResult] = await Promise.all([
        supabase
          .from('comments')
          .select('id', { count: 'exact' })
          .eq('user_id', userId),
        supabase
          .from('comment_reports')
          .select('id', { count: 'exact' })
          .eq('reporter_id', userId)
      ]);

      return {
        commentCount: commentsResult.count || 0,
        reportCount: reportsResult.count || 0,
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  };

  const bulkModerateComments = async (commentIds: string[], action: 'delete' | 'approve') => {
    if (!isModerator()) throw new Error('Insufficient permissions');

    try {
      setIsLoading(true);

      if (action === 'delete') {
        await supabase
          .from('comments')
          .update({ 
            is_deleted: true, 
            content: '[removed by moderator]' 
          })
          .in('id', commentIds);
      }
      // Add more bulk actions as needed
    } catch (error) {
      console.error('Error performing bulk moderation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isModerator: isModerator(),
    isAdmin: isAdmin(),
    fetchReports,
    updateReportStatus,
    moderateUser,
    getUserStats,
    bulkModerateComments,
  };
};