import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { Send } from 'lucide-react';

const Messages: React.FC = () => {
  const { messages, chatUsers, activeChatUserId, fetchChatUsers, sendMessage, setActiveChat } = useChatStore();
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchChatUsers();
  }, [fetchChatUsers]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeChatUserId) {
      sendMessage(activeChatUserId, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      <div className="w-1/3 border-r">
        <ul>
          {chatUsers.map(chatUser => (
            <li key={chatUser.id} onClick={() => setActiveChat(chatUser.id)} className="p-4 hover:bg-gray-100 cursor-pointer">
              {chatUser.full_name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`rounded-lg px-4 py-2 ${msg.sender_id === user?.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Type a message..."
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-full">
              <Send />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
