import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const { session, loading, setSession, setLoading, fetchProfile } = useAuthStore();

  useEffect(() => {
    // This single listener handles the initial state check AND any subsequent
    // auth changes (login, logout, token refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // 1. Update the session in the store.
      setSession(session);
      
      // 2. If the user is logged in, fetch their profile data.
      if (session) {
        fetchProfile(session.user);
      }
      
      // 3. Stop the main loading spinner once the initial auth state is known.
      setLoading(false);
    });

    // 4. Clean up the listener when the component unmounts.
    return () => {
      subscription?.unsubscribe();
    };
    
    // The dependency array now correctly includes all external functions used
    // inside the effect, fixing the hidden dependency error.
  }, [setSession, setLoading, fetchProfile]);

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
