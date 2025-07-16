import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const { session, loading, setSession } = useAuthStore();

  useEffect(() => {
    // Set the initial session state
    setSession(supabase.auth.getSession());

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster richColors />
      <Routes>
        <Route path="/auth" element={!session ? <AuthForm /> : <Navigate to="/" />} />
        
        <Route path="/" element={session ? <Layout><Feed /></Layout> : <Navigate to="/auth" />} />
        <Route path="/profile" element={session ? <Layout><Profile /></Layout> : <Navigate to="/auth" />} />
        <Route path="/messages" element={session ? <Layout><Messages /></Layout> : <Navigate to="/auth" />} />
        <Route path="/settings" element={session ? <Layout><Settings /></Layout> : <Navigate to="/auth" />} />
        
        <Route path="*" element={<Navigate to={session ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
