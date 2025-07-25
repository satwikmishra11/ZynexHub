
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'like',
      user: {
        id: '2',
        username: 'sarah_designer',
        fullName: 'Sarah Johnson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20UI%20UX%20designer%20with%20creative%20background%2C%20friendly%20expression%2C%20design%20studio%20themed%20portrait&width=200&height=200&seq=notif1&orientation=squarish'
      },
      content: 'liked your post',
      timestamp: '2m',
      isRead: false
    },
    {
      id: '2',
      type: 'comment',
      user: {
        id: '3',
        username: 'mike_photo',
        fullName: 'Mike Chen',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20photographer%20with%20camera%20equipment%20background%2C%20artistic%20expression%2C%20photography%20studio%20themed%20portrait&width=200&height=200&seq=notif2&orientation=squarish'
      },
      content: 'commented on your post: "This is amazing work!"',
      timestamp: '15m',
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      user: {
        id: '4',
        username: 'emma_writer',
        fullName: 'Emma Davis',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20content%20writer%20with%20book%20background%2C%20intellectual%20expression%2C%20writing%20workspace%20themed%20portrait&width=200&height=200&seq=notif3&orientation=squarish'
      },
      content: 'started following you',
      timestamp: '1h',
      isRead: false
    },
    {
      id: '4',
      type: 'mention',
      user: {
        id: '5',
        username: 'david_dev',
        fullName: 'David Wilson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20software%20developer%20with%20coding%20background%2C%20focused%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=notif4&orientation=squarish'
      },
      content: 'mentioned you in a post',
      timestamp: '2h',
      isRead: true
    },
    {
      id: '5',
      type: 'share',
      user: {
        id: '6',
        username: 'lisa_marketing',
        fullName: 'Lisa Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20marketing%20specialist%20with%20business%20background%2C%20professional%20expression%2C%20office%20themed%20portrait&width=200&height=200&seq=notif5&orientation=squarish'
      },
      content: 'shared your post',
      timestamp: '3h',
      isRead: true
    },
    {
      id: '6',
      type: 'like',
      user: {
        id: '7',
        username: 'john_design',
        fullName: 'John Smith',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20graphic%20designer%20with%20creative%20background%2C%20artistic%20expression%2C%20design%20studio%20themed%20portrait&width=200&height=200&seq=notif6&orientation=squarish'
      },
      content: 'liked your comment',
      timestamp: '4h',
      isRead: true
    },
    {
      id: '7',
      type: 'comment',
      user: {
        id: '8',
        username: 'anna_product',
        fullName: 'Anna Thompson',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20product%20manager%20with%20modern%20office%20background%2C%20confident%20expression%2C%20business%20themed%20portrait&width=200&height=200&seq=notif7&orientation=squarish'
      },
      content: 'replied to your comment: "Great insights!"',
      timestamp: '6h',
      isRead: true
    },
    {
      id: '8',
      type: 'follow',
      user: {
        id: '9',
        username: 'tech_guru',
        fullName: 'Robert Martinez',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20tech%20expert%20with%20modern%20background%2C%20experienced%20expression%2C%20technology%20themed%20portrait&width=200&height=200&seq=notif8&orientation=squarish'
      },
      content: 'started following you',
      timestamp: '1d',
      isRead: true
    },
    {
      id: '9',
      type: 'mention',
      user: {
        id: '10',
        username: 'creative_mind',
        fullName: 'Maya Patel',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20creative%20professional%20with%20artistic%20background%2C%20inspiring%20expression%2C%20creative%20workspace%20themed%20portrait&width=200&height=200&seq=notif9&orientation=squarish'
      },
      content: 'mentioned you in a comment',
      timestamp: '1d',
      isRead: true
    },
    {
      id: '10',
      type: 'like',
      user: {
        id: '11',
        username: 'startup_founder',
        fullName: 'Kevin Zhang',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20male%20entrepreneur%20with%20business%20background%2C%20determined%20expression%2C%20startup%20office%20themed%20portrait&width=200&height=200&seq=notif10&orientation=squarish'
      },
      content: 'liked your post about startup tips',
      timestamp: '2d',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return 'ri-heart-fill text-red-500';
      case 'comment':
        return 'ri-message-3-fill text-blue-500';
      case 'follow':
        return 'ri-user-add-fill text-green-500';
      case 'mention':
        return 'ri-at-fill text-purple-500';
      case 'share':
        return 'ri-share-fill text-orange-500';
      default:
        return 'ri-notification-fill text-slate-500';
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'mention').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'mentions') return notification.type === 'mention';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Notifications</h1>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="whitespace-nowrap"
                    >
                      <i className="ri-check-double-line mr-2"></i>
                      Mark all as read
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <i className="ri-settings-line"></i>
                    </Button>
                  </div>
                </div>
                
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={notification.user.avatar}
                              alt={notification.user.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                            <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm">
                              <span className="font-medium text-slate-800 dark:text-slate-200">
                                {notification.user.fullName}
                              </span>
                              <span className="text-slate-600 dark:text-slate-400 ml-1">
                                {notification.content}
                              </span>
                            </p>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                              {notification.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <div className="flex items-center gap-1 ml-auto">
                              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm">
                                <i className="ri-more-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <i className="ri-notification-off-line text-6xl text-slate-400 mb-4"></i>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      No notifications
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {activeTab === 'unread' 
                        ? 'You have no unread notifications' 
                        : activeTab === 'mentions'
                        ? 'No mentions yet'
                        : 'You\'re all caught up!'}
                    </p>
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
