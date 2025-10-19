import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle, FaFacebook, FaTiktok } from 'react-icons/fa';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { AuthAPI } from '../../apis';
import { toast } from 'react-hot-toast';

interface SocialAuthProps {
  socialLoginMutation: any; // Adjust type as needed
}

const SocialAuth: React.FC<SocialAuthProps> = ({ socialLoginMutation }) => {

  const handleFacebookLogin = async (response: any) => {
    if (response.accessToken) {
      try {
        const result = await socialLoginMutation.mutate(
          (vars: { token: string; provider: string }) => AuthAPI.socialLogin(vars.token, vars.provider),
          { token: response.accessToken, provider: 'facebook' }
        );
        if (result) {
          toast.success('Facebook login successful!');
          // Handle successful login (e.g., redirect, update auth context)
        } else {
          toast.error('Facebook login failed on backend.');
        }
      } catch (error) {
        toast.error('Facebook login failed.');
        console.error('Facebook login error:', error);
      }
    } else {
      toast.error('Facebook login failed: No access token.');
    }
  };

  const onFacebookFail = (error: any) => {
    console.log('Facebook Login Failed!', error);
    toast.error('Facebook login failed.');
  };

  const handleTikTokLogin = () => {
    const clientKey = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    const redirectUri = "http://localhost:5173/auth/tiktok/callback"; // This should match the redirect_uri in your TikTok App settings
    const scope = "user.info.basic"; // Adjust scope as needed
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // CSRF protection

    const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientKey}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <GoogleLogin
        onSuccess={async credentialResponse => {
          if (credentialResponse.credential) {
            const result = await socialLoginMutation.mutate(
              (vars: { token: string; provider: string }) => AuthAPI.socialLogin(vars.token, vars.provider),
              { token: credentialResponse.credential, provider: 'google' }
            );
            if (result) {
              toast.success('Google login successful!');
            } else {
              toast.error('Google login failed on backend.');
            }
          }
        }}
        onError={() => {
          console.log('Google Login Failed');
          toast.error('Google login failed.');
        }}
        render={({ onClick }) => (
          <button onClick={onClick} className="bg-red-600 text-white font-bold p-2 rounded-full flex items-center justify-center w-10 h-10">
            <FaGoogle size={20} />
          </button>
        )}
      />
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID || ''}
        onSuccess={handleFacebookLogin}
        onFail={onFacebookFail}
        render={({ onClick }) => (
          <button onClick={onClick} className="bg-blue-600 text-white font-bold p-2 rounded-full flex items-center justify-center w-10 h-10">
            <FaFacebook size={24} />
          </button>
        )}
      />
      <button
        onClick={handleTikTokLogin}
        title="Login with TikTok"
        className="bg-black text-white font-bold p-2 rounded-full flex items-center justify-center w-10 h-10"
      >
        <FaTiktok size={24} />
      </button>
    </div>
  );
};

export default SocialAuth;