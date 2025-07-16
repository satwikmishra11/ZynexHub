import React, { useState } from 'react';
import { usePostStore } from '../store/postStore';
import { Send, Image } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const { createPost } = usePostStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createPost(content);
      setContent('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border-none focus:ring-0 resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <button type="button" className="text-gray-500 hover:text-blue-500">
            <Image />
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
