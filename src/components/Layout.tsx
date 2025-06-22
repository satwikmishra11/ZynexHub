import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuthStore } from '../store/authStore'

const Layout: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto py-8 px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout