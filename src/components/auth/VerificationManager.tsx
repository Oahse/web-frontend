import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircleIcon, XCircleIcon, MailIcon, PhoneIcon } from 'lucide-react';

interface VerificationManagerProps {
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  onVerifyEmail: (code: string) => Promise<void>;
  onVerifyPhone: (code: string) => Promise<void>;
  onResendEmailCode: () => Promise<void>;
  onResendPhoneCode: () => Promise<void>;
  loading?: boolean;
}

export const VerificationManager: React.FC<VerificationManagerProps> = ({
  email,
  phone,
  emailVerified,
  phoneVerified,
  onVerifyEmail,
  onVerifyPhone,
  onResendEmailCode,
  onResendPhoneCode,
  loading = false
}) => {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleVerifyEmail = async () => {
    if (!emailCode.trim()) {
      setEmailError('Please enter the verification code');
      return;
    }

    setIsVerifyingEmail(true);
    setEmailError('');
    
    try {
      await onVerifyEmail(emailCode);
      setEmailCode('');
      setEmailCodeSent(false);
    } catch (error: unknown) {
      setEmailError((error as Error).message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (!phoneCode.trim()) {
      setPhoneError('Please enter the verification code');
      return;
    }

    setIsVerifyingPhone(true);
    setPhoneError('');
    
    try {
      await onVerifyPhone(phoneCode);
      setPhoneCode('');
      setPhoneCodeSent(false);
    } catch (error: unknown) {
      setPhoneError((error as Error).message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const handleResendEmailCode = async () => {
    try {
      await onResendEmailCode();
      setEmailCodeSent(true);
      setEmailError('');
    } catch (error: unknown) {
      setEmailError((error as Error).message || 'Failed to send verification code');
    }
  };

  const handleResendPhoneCode = async () => {
    try {
      await onResendPhoneCode();
      setPhoneCodeSent(true);
      setPhoneError('');
    } catch (error: unknown) {
      setPhoneError((error as Error).message || 'Failed to send verification code');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Account Verification
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Verify your email and phone number to secure your account and enable all features.
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Verification */}
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MailIcon size={20} className="text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Email Verification</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
              </div>
            </div>
            <div className="flex items-center">
              {emailVerified ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircleIcon size={20} />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircleIcon size={20} />
                  <span className="text-sm font-medium">Unverified</span>
                </div>
              )}
            </div>
          </div>

          {!emailVerified && (
            <div className="space-y-3">
              {emailCodeSent && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Verification code sent to {email}. Please check your inbox and spam folder.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={emailCode}
                    onChange={(e) => {
                      setEmailCode(e.target.value);
                      setEmailError('');
                    }}
                    error={emailError}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifyEmail}
                  disabled={loading || isVerifyingEmail || !emailCode.trim()}
                >
                  {isVerifyingEmail ? 'Verifying...' : 'Verify'}
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendEmailCode}
                  disabled={loading}
                >
                  Resend Code
                </Button>
                <p className="text-xs text-gray-500">
                  Code expires in 10 minutes
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Phone Verification */}
        {phone && (
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <PhoneIcon size={20} className="text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Phone Verification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                {phoneVerified ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircleIcon size={20} />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircleIcon size={20} />
                    <span className="text-sm font-medium">Unverified</span>
                  </div>
                )}
              </div>
            </div>

            {!phoneVerified && (
              <div className="space-y-3">
                {phoneCodeSent && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Verification code sent to {phone} via SMS.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={phoneCode}
                      onChange={(e) => {
                        setPhoneCode(e.target.value);
                        setPhoneError('');
                      }}
                      error={phoneError}
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handleVerifyPhone}
                    disabled={loading || isVerifyingPhone || !phoneCode.trim()}
                  >
                    {isVerifyingPhone ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendPhoneCode}
                    disabled={loading}
                  >
                    Resend SMS
                  </Button>
                  <p className="text-xs text-gray-500">
                    Code expires in 10 minutes
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Verification Benefits */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Benefits of Verification
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Enhanced account security
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Password recovery options
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Order and shipping notifications
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Access to premium features
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};