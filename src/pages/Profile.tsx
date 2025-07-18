import React from 'react';
import { useAuthStore } from '../store/authStore';

const Profile: React.FC = () => {
  const { profile } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={profile?.avatar_url || `https://i.pravatar.cc/150?u=${profile?.id}`}
            alt={profile?.full_name || 'User'}
            className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
          ></img>
          <h1 className="text-xl font-bold">{profile?.full_name}</h1>
          <p className="text-gray-600">@{profile?.username}</p>
          <p className="text-gray-700 mt-2">{profile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
