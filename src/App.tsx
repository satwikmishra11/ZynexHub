import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { AuthPage } from './components/auth/AuthPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { MainApp } from './components/MainApp';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { authState } = useAuth();

  console.log('App render - Auth State:', {
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    hasUser: !!authState.user,
    username: authState.user?.username
  });

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold text-white">Z</span>
          </div>
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Loading ZynexHub...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/*"
        element={
          authState.isAuthenticated ? (
            <MainApp />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/auth"
        element={
          !authState.isAuthenticated ? (
            <AuthPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
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
