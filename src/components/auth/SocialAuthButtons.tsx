/**
 * Social Authentication Buttons Component
 * Supports Google, Facebook, and TikTok OAuth
 */

import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { apiClient } from '../../apis';

interface SocialAuthButtonsProps {
  mode?: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface SocialAuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  mode = 'login',
  onSuccess,
  onError
}) => {

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await apiClient.post<SocialAuthResponse>('/auth/social/google', {
        credential: credentialResponse.credential,
        mode
      });

      if (response.success) {
        // Store tokens and user data
        localStorage.setItem('banwee_access_token', response.data.access_token);
        localStorage.setItem('banwee_user', JSON.stringify(response.data.user));
        
        toast.success(`Successfully ${mode === 'login' ? 'logged in' : 'registered'} with Google!`);
        onSuccess?.();
      }
    } catch (error) {
      const errorMessage = (error as Error).message || `Failed to ${mode} with Google`;
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  };

  // Google OAuth Error Handler
  const handleGoogleError = () => {
    const errorMessage = `Google ${mode} failed`;
    toast.error(errorMessage);
    onError?.(errorMessage);
  };

  // Facebook OAuth Success Handler
  const handleFacebookSuccess = async (response: { accessToken: string; userID: string }) => {
    try {
      if (response.accessToken) {
        const apiResponse = await apiClient.post<SocialAuthResponse>('/auth/social/facebook', {
          access_token: response.accessToken,
          user_id: response.userID,
          mode
        });

        if (apiResponse.success) {
          // Store tokens and user data
          localStorage.setItem('banwee_access_token', apiResponse.data.access_token);
          localStorage.setItem('banwee_user', JSON.stringify(apiResponse.data.user));
          
          toast.success(`Successfully ${mode === 'login' ? 'logged in' : 'registered'} with Facebook!`);
          onSuccess?.();
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message || `Failed to ${mode} with Facebook`;
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  };

  // Facebook OAuth Error Handler
  const handleFacebookError = () => {
    const errorMessage = `Facebook ${mode} failed`;
    toast.error(errorMessage);
    onError?.(errorMessage);
  };

  // TikTok OAuth Handler (Custom implementation)
  const handleTikTokAuth = async () => {
    try {
      // TikTok OAuth flow - redirect to backend endpoint
      const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID;
      const redirectUri = `${window.location.origin}/auth/tiktok/callback`;
      const state = Math.random().toString(36).substring(7);
      
      // Store state for verification
      localStorage.setItem('tiktok_oauth_state', state);
      
      const tiktokAuthUrl = `https://www.tiktok.com/auth/authorize/` +
        `?client_key=${clientId}` +
        `&scope=user.info.basic` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;
      
      // Redirect to TikTok OAuth
      window.location.href = tiktokAuthUrl;
    } catch (error) {
      const errorMessage = (error as Error).message || `Failed to ${mode} with TikTok`;
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        Or {mode} with
      </div>

      {/* Google OAuth */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme="outline"
        size="large"
        width="100%"
        text={mode === 'login' ? 'signin_with' : 'signup_with'}
      />

      {/* Facebook OAuth */}
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID || ''}
        onSuccess={handleFacebookSuccess}
        onFail={handleFacebookError}
        onProfileSuccess={(response: Record<string, unknown>) => {
          // Handle profile data if needed
          console.log('Facebook profile:', response);
        }}
        className="w-full"
        render={({ onClick }) => (
          <button
            onClick={onClick}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FaFacebook className="w-5 h-5 text-blue-600 mr-3" />
            {mode === 'login' ? 'Sign in' : 'Sign up'} with Facebook
          </button>
        )}
      />

      {/* TikTok OAuth */}
      <button
        onClick={handleTikTokAuth}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
      >
        <FaTiktok className="w-5 h-5 text-black dark:text-white mr-3" />
        {mode === 'login' ? 'Sign in' : 'Sign up'} with TikTok
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Or continue with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthButtons;