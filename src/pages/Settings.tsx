import React from 'react'
import { Bell, Shield, User, Palette, Globe, HelpCircle } from 'lucide-react'

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Account',
      icon: User,
      items: [
        { name: 'Profile Information', description: 'Update your profile details' },
        { name: 'Privacy Settings', description: 'Control who can see your content' },
        { name: 'Account Security', description: 'Password and authentication settings' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Push Notifications', description: 'Manage your notification preferences' },
        { name: 'Email Notifications', description: 'Control email alerts and updates' },
        { name: 'SMS Notifications', description: 'Text message notification settings' },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { name: 'Data & Privacy', description: 'Manage your data and privacy settings' },
        { name: 'Blocked Users', description: 'View and manage blocked accounts' },
        { name: 'Two-Factor Authentication', description: 'Add extra security to your account' },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { name: 'Theme', description: 'Switch between light and dark mode' },
        { name: 'Language', description: 'Change your preferred language' },
        { name: 'Accessibility', description: 'Customize accessibility options' },
      ]
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <group.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{group.title}</h2>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {group.items.map((item) => (
                <button
                  key={item.name}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Support</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium text-gray-900">Help Center</h3>
              <p className="text-sm text-gray-500 mt-1">Find answers to common questions</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium text-gray-900">Contact Us</h3>
              <p className="text-sm text-gray-500 mt-1">Get in touch with our support team</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings