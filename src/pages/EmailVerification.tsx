import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('No verification token found.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/v1/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(data.detail || 'Failed to verify email.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('An error occurred while verifying your email.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Email Verification</h1>
      {verificationStatus === 'pending' && <p>Verifying your email...</p>}
      {verificationStatus === 'success' && (
        <div>
          <p>{message}</p>
          <Link to="/login">Go to Login</Link>
        </div>
      )}
      {verificationStatus === 'error' && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};
