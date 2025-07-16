import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const Feed: React.FC = () => {
  const { posts, loading, fetchFeed } = usePostStore();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost />
      {loading && <p>Loading...</p>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
