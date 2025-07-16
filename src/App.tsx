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
    const initializeApp = async () => {
      // 1. Fetch the current session
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      
      // 2. If a session exists, fetch the user profile
      if (initialSession) {
        await fetchProfile(initialSession.user);
      }
      
      // 3. Update the session state in the store
      setSession(initialSession);
      
      // 4. Stop loading
      setLoading(false);

      // 5. Set up a listener for future auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session) {
          await fetchProfile(session.user);
        }
        setLoading(false);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    initializeApp();
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
