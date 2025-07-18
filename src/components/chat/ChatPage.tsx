import React, { useState, useEffect } from 'react';
import { Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import { LoadingSpinner } from '../LoadingSpinner';
import { formatDistanceToNow } from '../../utils/dateUtils';

export const ChatPage: React.FC = () => {
  const { authState } = useAuth();
  const { messages, chatUsers, isLoading, fetchMessages, sendMessage } = useMessages();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const selectedUser = chatUsers.find(user => user.id === selectedUserId);

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedUserId && !isSending) {
      setIsSending(true);
      try {
        await sendMessage(selectedUserId, messageText.trim());
        setMessageText('');
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)] flex bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Chat List */}
      <div className={`${selectedUserId ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-deep-blue to-blue-green">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all duration-300 text-white placeholder-white/70"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full scrollbar-hide">
          {chatUsers.length > 0 ? (
            chatUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-all duration-300 group ${
                  selectedUserId === user.id ? 'bg-blue-50 border-r-2 border-deep-blue' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={user.full_name || user.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-deep-blue/20 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-green rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-dark-gray truncate group-hover:text-deep-blue transition-colors">
                      {user.full_name || user.username}
                    </h3>
                    {user.last_message_time && (
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(user.last_message_time)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {user.last_message || 'Start a conversation'}
                    </p>
                    {user.unread_count > 0 && (
                      <span className="bg-deep-blue text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center animate-pulse">
                        {user.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-600 mb-2">No conversations yet</p>
              <p className="text-sm text-gray-500">Start chatting with other users!</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedUserId ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
        {selectedUserId && selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={selectedUser.avatar_url || `https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={selectedUser.full_name || selectedUser.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-green rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray">{selectedUser.full_name || selectedUser.username}</h3>
                  <p className="text-sm text-success-green">Online</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white scrollbar-hide">
              {messages.length > 0 ? (
                messages.map((message) => {
                  const isOwn = message.sender_id === authState.user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                          isOwn
                            ? 'bg-gradient-to-r from-deep-blue to-blue-green text-white'
                            : 'bg-white text-dark-gray border border-gray-100'
                        } hover:shadow-md transition-all duration-300`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-2 ${
                            isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatDistanceToNow(message.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👋</span>
                    </div>
                    <p className="text-gray-600 mb-2">Start the conversation</p>
                    <p className="text-sm text-gray-500">Send your first message!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-deep-blue/50 focus:border-deep-blue transition-all duration-300"
                    maxLength={1000}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all duration-300"
                  >
                    <Smile className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!messageText.trim() || isSending}
                  className="p-3 bg-gradient-to-r from-deep-blue to-blue-green text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                >
                  {isSending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-deep-blue to-blue-green rounded-full flex items-center justify-center mb-6 mx-auto">
                <Send className="w-10 h-10 text-white" />
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