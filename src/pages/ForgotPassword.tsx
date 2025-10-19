import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/forms/Input';
import { toast } from 'react-hot-toast';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success(`Password reset link sent! If an account with ${email} exists, you will receive a password reset link.`);
    setEmail('');
  };

  return (
    <div className="container mx-auto px-4 py-12 text-copy">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light">
        <h1 className="text-2xl font-bold text-main mb-6 text-center">Forgot Your Password?</h1>
        <p className="text-copy-light text-center mb-6">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition-colors flex justify-center items-center"
            disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-copy-light">
          Remember your password? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};