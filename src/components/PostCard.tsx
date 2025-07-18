import React from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { Post } from '../types';
import { usePostStore } from '../store/postStore';
import { formatDistanceToNow } from '../utils/dateUtils';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost } = usePostStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-4">
        <img src={post.profiles.avatar_url || `https://i.pravatar.cc/150?u=${post.profiles.id}`} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-bold">{post.profiles.full_name}</p>
          <p className="text-sm text-gray-500">@{post.profiles.username} · {formatDistanceToNow(new Date(post.created_at))}</p>
        </div>
      </div>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="post" className="mt-4 rounded-lg" />}
      <div className="flex justify-between mt-4 text-gray-500">
        <button onClick={() => likePost(post.id)} className="flex items-center space-x-1 hover:text-red-500">
          <Heart className={post.is_liked ? 'text-red-500 fill-current' : ''} />
          <span>{post.likes_count}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <MessageCircle />
          <span>{post.comments_count}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-green-500">
          <Share />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
