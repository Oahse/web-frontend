/**
 * TikTok OAuth Callback Handler
 * Handles the callback from TikTok OAuth flow
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiClient } from '../../apis';
import { useAuth } from '../../contexts/AuthContext';

const TikTokCallback: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleTikTokCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const storedState = localStorage.getItem('tiktok_oauth_state');

        // Verify state parameter
        if (!state || state !== storedState) {
          throw new Error('Invalid state parameter');
        }

        // Clear stored state
        localStorage.removeItem('tiktok_oauth_state');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange code for access token via backend
        const response = await apiClient.post('/auth/social/tiktok', {
          code,
          redirect_uri: `${window.location.origin}/auth/tiktok/callback`
        });

        if (response.success) {
          // Store tokens and user data
          localStorage.setItem('banwee_access_token', response.data.access_token);
          localStorage.setItem('banwee_user', JSON.stringify(response.data.user));
          
          toast.success('Successfully authenticated with TikTok!');
          
          // Redirect to dashboard or intended page
          const redirectPath = localStorage.getItem('auth_redirect_path') || '/dashboard';
          localStorage.removeItem('auth_redirect_path');
          navigate(redirectPath);
        } else {
          throw new Error(response.message || 'Authentication failed');
        }
      } catch (error: any) {
        console.error('TikTok OAuth error:', error);
        setError(error.message || 'Authentication failed');
        toast.error(error.message || 'TikTok authentication failed');
        
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleTikTokCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Authenticating with TikTok
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please wait while we complete your authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Authentication Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {error}
            </p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TikTokCallback;