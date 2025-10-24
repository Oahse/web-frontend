import React from 'react';
import SocialAuthButtons from './SocialAuthButtons';

interface SocialAuthProps {
  mode?: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const SocialAuth: React.FC<SocialAuthProps> = ({ mode = 'login', onSuccess, onError }) => {
  return <SocialAuthButtons mode={mode} onSuccess={onSuccess} onError={onError} />;
};

export default SocialAuth;