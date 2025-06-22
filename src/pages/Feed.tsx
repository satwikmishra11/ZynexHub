import React, { useEffect } from 'react'
import { usePostStore } from '../store/postStore'
import CreatePost from '../components/CreatePost'
import PostCard from '../components/PostCard'

const Feed: React.FC = () => {
  const { posts, loading, fetchFeed } = usePostStore()

  useEffect(() => {
    fetchFeed()
  }, [fetchFeed])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Feed</h1>
        <p className="text-gray-600">Stay connected with your community</p>
      </div>

      <CreatePost />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet. Start by creating your first post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Feed