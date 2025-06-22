import React, { useState } from 'react'
import { Camera, Edit3, MapPin, Calendar, Link as LinkIcon } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Profile: React.FC = () => {
  const { profile, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <div>
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-colors">
          <Camera className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 -mt-16 relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {profile?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile?.full_name || profile?.username || 'Your Name'}
                  </h1>
                  <p className="text-gray-600 mb-2">@{profile?.username || 'username'}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {profile?.bio || 'No bio available. Click edit to add one!'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex items-center space-x-8 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Joined November 2024</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <span className="font-bold text-gray-900">120</span>
              <span className="text-gray-600 ml-1">Following</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">1.2K</span>
              <span className="text-gray-600 ml-1">Followers</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">48</span>
              <span className="text-gray-600 ml-1">Posts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Posts</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500">Your posts will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default Profile