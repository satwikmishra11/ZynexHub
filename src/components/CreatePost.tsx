import React, { useState } from 'react'
import { Image, Send } from 'lucide-react'
import { usePostStore } from '../store/postStore'
import { useAuthStore } from '../store/authStore'

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { createPost } = usePostStore()
  const { profile } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await createPost(content)
      setContent('')
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium">
            {profile?.username?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              rows={3}
            />
            
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Image className="h-5 w-5" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className={`
                  flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200
                  ${!content.trim() || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                  }
                `}
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost