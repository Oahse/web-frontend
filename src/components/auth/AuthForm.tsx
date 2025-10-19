import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SocialAuth } from './SocialAuth';

interface AuthFormProps {
  mode: 'login' | 'signup';
  allowEmailPhone?: boolean;
  socialAuth?: boolean;
  onSubmit: (credentials: AuthCredentials) => void;
  onSocialSuccess?: (provider: string, userData: User) => void;
  onToggleMode?: () => void;
  loading?: boolean;
  error?: string;
}

interface AuthCredentials {
  identifier?: string; // email or phone
  email?: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
  acceptTerms?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  allowEmailPhone = true,
  socialAuth = true,
  onSubmit,
  onSocialSuccess,
  onToggleMode,
  loading = false,
  error
}) => {
  const [formData, setFormData] = useState<AuthCredentials>({
    identifier: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    acceptTerms: false
  });

  const [identifierType, setIdentifierType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof AuthCredentials, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-detect identifier type
    if (field === 'identifier' && typeof value === 'string') {
      const isEmail = value.includes('@');
      setIdentifierType(isEmail ? 'email' : 'phone');
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate identifier
    if (!formData.identifier?.trim()) {
      errors.identifier = 'Email or phone number is required';
    } else if (identifierType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.identifier)) {
        errors.identifier = 'Please enter a valid email address';
      }
    } else {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.identifier.replace(/[\s\-()]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        errors.identifier = 'Please enter a valid phone number';
      }
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    // Validate signup fields
    if (mode === 'signup') {
      if (!formData.firstname?.trim()) {
        errors.firstname = 'First name is required';
      }
      if (!formData.lastname?.trim()) {
        errors.lastname = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        errors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleSocialAuthSuccess = (provider: string, userData: User) => {
    if (onSocialSuccess) {
      onSocialSuccess(provider, userData);
    }
  };

  const handleSocialAuthError = (error: unknown) => {
    console.error('Social auth error:', error);
    // Handle social auth errors
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {mode === 'login' 
              ? 'Welcome back! Please sign in to your account.' 
              : 'Join us today! Create your account to get started.'
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Social Authentication */}
        {socialAuth && (
          <div className="mb-6">
            <SocialAuth
              mode={mode}
              onSuccess={handleSocialAuthSuccess}
              onError={handleSocialAuthError}
            />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with {identifierType}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name fields for signup */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First Name"
                  type="text"
                  value={formData.firstname || ''}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  error={validationErrors.firstname}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  type="text"
                  value={formData.lastname || ''}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  error={validationErrors.lastname}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          )}

          {/* Email/Phone Input */}
          <div>
            <Input
              label={allowEmailPhone ? "Email or Phone" : "Email"}
              type={identifierType === 'email' ? 'email' : 'tel'}
              value={formData.identifier || ''}
              onChange={(e) => handleInputChange('identifier', e.target.value)}
              error={validationErrors.identifier}
              placeholder={identifierType === 'email' ? 'john@example.com' : '+1 (555) 123-4567'}
              required
            />
            {allowEmailPhone && (
              <p className="text-xs text-gray-500 mt-1">
                You can use either your email address or phone number
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={validationErrors.password}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Confirm Password for signup */}
          {mode === 'signup' && (
            <div>
              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={validationErrors.confirmPassword}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {/* Terms acceptance for signup */}
          {mode === 'signup' && (
            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms || false}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-400">
                I accept the{' '}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
              {validationErrors.acceptTerms && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.acceptTerms}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>

          {/* Forgot Password Link */}
          {mode === 'login' && (
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Toggle Mode */}
          {onToggleMode && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};