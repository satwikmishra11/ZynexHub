import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;
