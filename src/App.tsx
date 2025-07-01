import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { AuthPage } from './components/auth/AuthPage';
import { MainApp } from './components/MainApp';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold text-white">Z</span>
          </div>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return authState.isAuthenticated ? <MainApp /> : <AuthPage />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;