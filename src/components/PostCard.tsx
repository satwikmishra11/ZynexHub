import React, { useState } from 'react'
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'
import { usePostStore } from '../store/postStore'
import { formatDistanceToNow } from '../utils/dateUtils'

interface PostCardProps {
  post: {
    id: string
    user_id: string
    content: string
    image_url: string | null
    likes_count: number
    comments_count: number
    created_at: string
    profiles: {
      username: string
      full_name: string | null
      avatar_url: string | null
    }
    is_liked?: boolean
  }
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const { likePost, addComment, fetchComments, comments } = usePostStore()

  const handleLike = async () => {
    try {
      await likePost(post.id)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await addComment(post.id, newComment)
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const toggleComments = async () => {
    if (!showComments) {
      await fetchComments(post.id)
    }
    setShowComments(!showComments)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {post.profiles.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {post.profiles.full_name || post.profiles.username}
              </h3>
              <p className="text-sm text-gray-500">
                @{post.profiles.username} • {formatDistanceToNow(post.created_at)}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post content"
            className="mt-4 w-full rounded-xl object-cover max-h-96"
          />
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                post.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${post.is_liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes_count}</span>
            </button>
            
            <button
              onClick={toggleComments}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{post.comments_count}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share className="h-5 w-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-50 bg-gray-50">
          {/* Add Comment */}
          <div className="p-4">
            <form onSubmit={handleComment} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">U</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="pb-4">
            {comments[post.id]?.map((comment) => (
              <div key={comment.id} className="px-4 py-2 flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">
                    {comment.profiles.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {comment.profiles.full_name || comment.profiles.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard