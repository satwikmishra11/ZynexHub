import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../LoadingSpinner';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (!supabase) {
          navigate('/');
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/?error=auth_callback_failed');
          return;
        }

        if (data.session) {
          // User is now authenticated
          navigate('/?confirmed=true');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <span className="text-2xl font-bold text-white">Z</span>
        </div>
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 mt-4">Confirming your email...</p>
      </div>
    </div>
  );
};