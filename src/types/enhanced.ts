export interface EnhancedUser {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  email_verified: boolean;
  last_seen: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface EnhancedComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  votes_count: number;
  is_edited: boolean;
  edit_count: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string | null;
  profiles: EnhancedUser;
  replies?: EnhancedComment[];
  user_vote?: 'upvote' | 'downvote' | null;
  can_edit?: boolean;
  can_delete?: boolean;
}

export interface CommentVote {
  id: string;
  user_id: string;
  comment_id: string;
  vote_type: 'upvote' | 'downvote';
  created_at: string;
}

export interface CommentReport {
  id: string;
  reporter_id: string;
  comment_id: string;
  reason: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
  description: string | null;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'comment_reply' | 'comment_mention' | 'comment_vote' | 'post_comment' | 'system';
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  device_info: Record<string, any>;
  ip_address: string | null;
  expires_at: string;
  created_at: string;
  last_accessed: string;
}

export interface EnhancedPost {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string | null;
  profiles: EnhancedUser;
  user_liked: boolean;
  can_edit?: boolean;
  can_delete?: boolean;
}

export interface CommentFormData {
  content: string;
  parent_id?: string | null;
}

export interface ReportFormData {
  reason: CommentReport['reason'];
  description?: string;
}

export interface UserRole {
  role: EnhancedUser['role'];
  permissions: string[];
}

export interface ModerationAction {
  type: 'warn' | 'suspend' | 'ban' | 'delete_comment' | 'approve_comment';
  target_id: string;
  reason: string;
  duration?: number; // in days
}