
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth, AuthProvider } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

function MessagesPageContent() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState('2');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '2',
      user: {
        id: '2',
        username: 'sarah_designer',
        fullName: 'Sarah Johnson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20UI%20UX%20designer%20with%20creative%20background%2C%20friendly%20expression%2C%20design%20studio%20themed%20portrait&width=200&height=200&seq=chat1&orientation=squarish',
        isOnline: true
      },
      lastMessage: 'That sounds like a great idea! Let me know when you want to start.',
      timestamp: '2m',
      unread: 2
    },
    {
      id: '3',
      user: {
        id: '3',
        username: 'mike_photo',
        fullName: 'Mike Chen',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20photographer%20with%20camera%20equipment%20background%2C%20artistic%20expression%2C%20photography%20studio%20themed%20portrait&width=200&height=200&seq=chat2&orientation=squarish',
        isOnline: false
      },
      lastMessage: 'The photos from yesterday\'s shoot are ready for review.',
      timestamp: '1h',
      unread: 0
    },
    {
      id: '4',
      user: {
        id: '4',
        username: 'emma_writer',
        fullName: 'Emma Davis',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20content%20writer%20with%20book%20background%2C%20intellectual%20expression%2C%20writing%20workspace%20themed%20portrait&width=200&height=200&seq=chat3&orientation=squarish',
        isOnline: true
      },
      lastMessage: 'I\'ve finished the first draft of the article. What do you think?',
      timestamp: '3h',
      unread: 1
    },
    {
      id: '5',
      user: {
        id: '5',
        username: 'david_dev',
        fullName: 'David Martinez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20software%20developer%20with%20coding%20background%2C%20focused%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=chat4&orientation=squarish',
        isOnline: false
      },
      lastMessage: 'Great job on the latest feature! The performance improvements are impressive.',
      timestamp: '5h',
      unread: 0
    },
    {
      id: '6',
      user: {
        id: '6',
        username: 'lisa_marketing',
        fullName: 'Lisa Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20marketing%20specialist%20with%20business%20background%2C%20professional%20expression%2C%20office%20themed%20portrait&width=200&height=200&seq=chat5&orientation=squarish',
        isOnline: true
      },
      lastMessage: 'The campaign analytics look fantastic! We exceeded our targets.',
      timestamp: '1d',
      unread: 0
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: '1',
      content: 'I\'m doing great! Just finished working on a new project.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'That\'s awesome! What kind of project are you working on?',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: '4',
      senderId: '1',
      content: 'It\'s a social media platform with real-time messaging. I\'m really excited about it!',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: '5',
      senderId: '2',
      content: 'That sounds like a great idea! Let me know when you want to start.',
      timestamp: '10:36 AM',
      isOwn: false
    },
    {
      id: '6',
      senderId: '1',
      content: 'I\'ll definitely keep you updated. Maybe we can collaborate on the UI design?',
      timestamp: '10:38 AM',
      isOwn: true
    },
    {
      id: '7',
      senderId: '2',
      content: 'I would love that! UI design is exactly what I\'m passionate about.',
      timestamp: '10:40 AM',
      isOwn: false
    },
    {
      id: '8',
      senderId: '1',
      content: 'Perfect! I\'ll send you the project details later today.',
      timestamp: '10:42 AM',
      isOwn: true
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="flex gap-6">
          <Sidebar />
          <div className="flex-1 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[600px] flex"
            >
              <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-slate-800">Messages</h1>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <i className="ri-edit-line mr-2"></i>
                      New Chat
                    </Button>
                  </div>
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <motion.button
                      key={conversation.id}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`w-full p-4 text-left border-b border-slate-100 transition-colors ${
                        selectedChat === conversation.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={conversation.user.avatar}
                              alt={conversation.user.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {conversation.user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-slate-800 truncate">
                              {conversation.user.fullName}
                            </h3>
                            <span className="text-xs text-slate-500">{conversation.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600 truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={selectedConversation.user.avatar}
                                alt={selectedConversation.user.fullName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {selectedConversation.user.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">
                              {selectedConversation.user.fullName}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {selectedConversation.user.isOnline ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="whitespace-nowrap">
                            <i className="ri-phone-line"></i>
                          </Button>
                          <Button variant="outline" size="sm" className="whitespace-nowrap">
                            <i className="ri-video-line"></i>
                          </Button>
                          <Button variant="outline" size="sm" className="whitespace-nowrap">
                            <i className="ri-more-line"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-100' : 'text-slate-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-slate-200">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          <i className="ri-attachment-line"></i>
                        </Button>
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          />
                          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <i className="ri-emotion-line text-lg"></i>
                          </button>
                        </div>
                        <Button
                          onClick={sendMessage}
                          className="whitespace-nowrap"
                          disabled={!newMessage.trim()}
                        >
                          <i className="ri-send-plane-line"></i>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <i className="ri-message-3-line text-6xl text-slate-400 mb-4"></i>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-slate-600">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <AuthProvider>
      <MessagesPageContent />
    </AuthProvider>
  );
}
