import React, { useState } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  isOwn: boolean;
}

export const ChatPage: React.FC = () => {
  const { authState } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! How are you doing?',
      senderId: '2',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      content: 'I\'m doing great! Just working on some new features for the app. How about you?',
      senderId: '1',
      timestamp: '10:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      content: 'That sounds exciting! I\'d love to hear more about it. Maybe we can catch up over coffee sometime?',
      senderId: '2',
      timestamp: '10:35 AM',
      isOwn: false,
    },
    {
      id: '4',
      content: 'Absolutely! How about this Friday?',
      senderId: '1',
      timestamp: '10:37 AM',
      isOwn: true,
    },
  ]);

  const chats = mockUsers.map(user => ({
    id: user.id,
    user,
    lastMessage: 'Hey! How are you doing?',
    timestamp: '2 min ago',
    unreadCount: user.id === '2' ? 2 : 0,
  }));

  const selectedUser = mockUsers.find(user => user.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: messageText.trim(),
        senderId: authState.user?.id || '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)] flex">
      {/* Chat List */}
      <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark-gray mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full scrollbar-hide">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-all duration-300 ${
                selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-deep-blue' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-green rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-dark-gray truncate">
                    {chat.user.fullName}
                  </h3>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-deep-blue text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedChat ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
        {selectedChat && selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  ←
                </button>
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-dark-gray">{selectedUser.fullName}</h3>
                  <p className="text-sm text-success-green">Online</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? 'bg-deep-blue text-white'
                        : 'bg-white text-dark-gray shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Smile className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-2 bg-deep-blue text-white rounded-full hover:bg-deep-blue/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Send className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600">
                Select a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};