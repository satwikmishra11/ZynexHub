
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/AuthProvider';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'ri-user-settings-line' },
    { id: 'privacy', label: 'Privacy', icon: 'ri-shield-check-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
    { id: 'security', label: 'Security', icon: 'ri-lock-line' },
    { id: 'help', label: 'Help', icon: 'ri-question-line' }
  ];

  // Mock data for account settings
  const accountData = {
    fullName: 'Alex Rodriguez',
    username: 'alex_dev',
    email: 'alex@example.com',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Currently working on innovative web applications using React and Node.js.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alexdev.com',
    birthdate: '1992-08-15',
    language: 'English',
    timezone: 'Pacific Time (PT)'
  };

  // Mock data for privacy settings
  const privacySettings = {
    profileVisibility: 'public',
    activityStatus: true,
    messageRequests: 'everyone',
    showEmail: false,
    showPhone: false,
    indexable: true,
    dataDownload: true
  };

  // Mock data for security settings
  const securityData = {
    sessions: [
      {
        id: '1',
        device: 'Desktop - Chrome',
        location: 'San Francisco, CA',
        lastActive: 'Current session',
        isCurrent: true,
        icon: 'ri-computer-line'
      },
      {
        id: '2',
        device: 'Mobile - Safari',
        location: 'San Francisco, CA',
        lastActive: '2 hours ago',
        isCurrent: false,
        icon: 'ri-smartphone-line'
      },
      {
        id: '3',
        device: 'Tablet - Firefox',
        location: 'Oakland, CA',
        lastActive: '1 day ago',
        isCurrent: false,
        icon: 'ri-tablet-line'
      }
    ],
    loginHistory: [
      { date: '2024-01-15', location: 'San Francisco, CA', status: 'success' },
      { date: '2024-01-14', location: 'San Francisco, CA', status: 'success' },
      { date: '2024-01-13', location: 'Unknown Location', status: 'failed' },
      { date: '2024-01-12', location: 'San Francisco, CA', status: 'success' }
    ],
    twoFactorEnabled: false,
    passwordLastChanged: '2024-01-10'
  };

  // Mock data for help resources
  const helpResources = [
    {
      id: '1',
      title: 'Getting Started Guide',
      description: 'Learn the basics of using ZynexHub',
      icon: 'ri-book-open-line',
      category: 'Tutorial'
    },
    {
      id: '2',
      title: 'Privacy & Security',
      description: 'Understand your privacy settings',
      icon: 'ri-shield-check-line',
      category: 'Security'
    },
    {
      id: '3',
      title: 'Community Guidelines',
      description: 'Rules and best practices',
      icon: 'ri-group-line',
      category: 'Community'
    },
    {
      id: '4',
      title: 'Account Management',
      description: 'Manage your account settings',
      icon: 'ri-user-settings-line',
      category: 'Account'
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="flex gap-6">
          <Sidebar />
          
          <div className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex">
                <div className="w-64 border-r border-slate-200">
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-slate-800 mb-6">Settings</h1>
                    <nav className="space-y-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                          }`}
                        >
                          <i className={`${tab.icon} text-lg`}></i>
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  {activeTab === 'account' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Full Name
                            </label>
                            <Input defaultValue={accountData.fullName} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Username
                            </label>
                            <Input defaultValue={accountData.username} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Email Address
                            </label>
                            <Input defaultValue={accountData.email} type="email" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Phone Number
                            </label>
                            <Input defaultValue={accountData.phone} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Location
                            </label>
                            <Input defaultValue={accountData.location} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Website
                            </label>
                            <Input defaultValue={accountData.website} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Bio
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              defaultValue={accountData.bio}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Profile Picture</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden">
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Button variant="outline" className="whitespace-nowrap">
                              <i className="ri-upload-line mr-2"></i>
                              Upload New Photo
                            </Button>
                            <p className="text-sm text-slate-600 mt-1">
                              JPG, PNG or GIF. Maximum file size 2MB.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="whitespace-nowrap">
                          <i className="ri-save-line mr-2"></i>
                          Save Changes
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'privacy' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Privacy Settings</h2>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Profile Visibility</h3>
                              <p className="text-sm text-slate-600">Who can see your profile</p>
                            </div>
                            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                              <option value="public">Public</option>
                              <option value="friends">Friends Only</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Activity Status</h3>
                              <p className="text-sm text-slate-600">Show when you're online</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Message Requests</h3>
                              <p className="text-sm text-slate-600">Who can send you messages</p>
                            </div>
                            <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                              <option value="everyone">Everyone</option>
                              <option value="friends">Friends Only</option>
                              <option value="none">No One</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Show Email</h3>
                              <p className="text-sm text-slate-600">Display email on profile</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'notifications' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Notification Preferences</h2>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Email Notifications</h3>
                              <p className="text-sm text-slate-600">Receive notifications via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notifications.email}
                                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Push Notifications</h3>
                              <p className="text-sm text-slate-600">Receive push notifications</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notifications.push}
                                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">SMS Notifications</h3>
                              <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notifications.sms}
                                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h3 className="font-medium text-slate-800">Marketing Emails</h3>
                              <p className="text-sm text-slate-600">Receive product updates and news</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={notifications.marketing}
                                onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'security' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Security Settings</h2>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Change Password</h3>
                            <p className="text-sm text-slate-600 mb-4">Update your password to keep your account secure</p>
                            <div className="space-y-3">
                              <Input type="password" placeholder="Current password" />
                              <Input type="password" placeholder="New password" />
                              <Input type="password" placeholder="Confirm new password" />
                            </div>
                            <Button className="mt-4 whitespace-nowrap">
                              <i className="ri-lock-line mr-2"></i>
                              Update Password
                            </Button>
                          </div>
                          
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Two-Factor Authentication</h3>
                            <p className="text-sm text-slate-600 mb-4">Add an extra layer of security to your account</p>
                            <Button variant="outline" className="whitespace-nowrap">
                              <i className="ri-shield-check-line mr-2"></i>
                              Enable 2FA
                            </Button>
                          </div>
                          
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Active Sessions</h3>
                            <p className="text-sm text-slate-600 mb-4">Manage your active sessions across devices</p>
                            <div className="space-y-3">
                              {securityData.sessions.map((session) => (
                                <div key={session.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <i className={`${session.icon} text-xl text-slate-600`}></i>
                                    <div>
                                      <p className="font-medium text-slate-800">{session.device}</p>
                                      <p className="text-sm text-slate-600">{session.location} • {session.lastActive}</p>
                                    </div>
                                  </div>
                                  {session.isCurrent ? (
                                    <span className="text-sm text-green-600">Current</span>
                                  ) : (
                                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                                      Revoke
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'help' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Help & Support</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {helpResources.map((resource) => (
                            <div key={resource.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3 mb-2">
                                <i className={`${resource.icon} text-xl text-blue-600`}></i>
                                <div>
                                  <h3 className="font-medium text-slate-800">{resource.title}</h3>
                                  <p className="text-xs text-slate-500">{resource.category}</p>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600">{resource.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Contact Support</h3>
                            <p className="text-sm text-slate-600 mb-4">Get help from our support team</p>
                            <div className="flex gap-2">
                              <Button variant="outline" className="whitespace-nowrap">
                                <i className="ri-mail-line mr-2"></i>
                                Email Support
                              </Button>
                              <Button variant="outline" className="whitespace-nowrap">
                                <i className="ri-chat-3-line mr-2"></i>
                                Live Chat
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Report a Problem</h3>
                            <p className="text-sm text-slate-600 mb-4">Report bugs or issues with the platform</p>
                            <Button variant="outline" className="whitespace-nowrap">
                              <i className="ri-bug-line mr-2"></i>
                              Report Issue
                            </Button>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800 mb-2">Account Data</h3>
                            <p className="text-sm text-slate-600 mb-4">Download or delete your account data</p>
                            <div className="flex gap-2">
                              <Button variant="outline" className="whitespace-nowrap">
                                <i className="ri-download-line mr-2"></i>
                                Download Data
                              </Button>
                              <Button variant="outline" className="whitespace-nowrap text-red-600 hover:bg-red-50">
                                <i className="ri-delete-bin-line mr-2"></i>
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
