import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Input } from '../components/forms/Input';
import { Checkbox } from '../components/forms/Checkbox';
import { SkeletonLoginForm } from '../components/ui/SkeletonForm';
import { useSkeleton } from '../hooks/useSkeleton';
import { useMutation } from '../hooks/useApi';
import SocialAuth from '../components/auth/SocialAuth';

interface LoginProps {
  isInitialLoading?: boolean;
}

export const Login: React.FC<LoginProps> = ({ isInitialLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isAdmin, isSupplier, redirectPath, setRedirectPath } = useAuth();
  const skeleton = useSkeleton(isInitialLoading, { showOnMount: false });
  const navigate = useNavigate();
  const location = useLocation();

  const socialLoginMutation = useMutation<unknown, { token: string; provider: string }>();

  // Get redirect path from URL params or default based on user role
  const getRedirectPath = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) return redirect;
    if (isAdmin) return '/admin';
    if (isSupplier) return '/account/products';
    return '/';
  }, [location.search, isAdmin, isSupplier]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const path = redirectPath || getRedirectPath();
      navigate(path);
      setRedirectPath(null); // Clear redirect path after navigation
    }
  }, [getRedirectPath, isAuthenticated, navigate, redirectPath, setRedirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      const path = await login(email, password);
      toast.success('Login successful! Welcome back to Banwee Organics.');
      if (path) {
        navigate(path);
      } else {
        navigate(getRedirectPath());
      }
    } catch (error) {
      toast.error('Login failed. Please check your email and password.');
      setLoading(false);
    }
  };

  // Show skeleton if initial loading
  if (skeleton.showSkeleton) {
    return (
      <div className="container mx-auto px-4 py-12 text-copy">
        <div className="max-w-md mx-auto">
          <SkeletonLoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-copy">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light">
        <h1 className="text-2xl font-bold text-main mb-6 text-center">Login to Your Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-main">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} className="text-copy-lighter" />
                ) : (
                  <Eye size={18} className="text-copy-lighter" />
                )}
              </button>
            </div>
          </div>
          <Checkbox
            label="Remember me"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
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
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-border-light w-full"></div>
          <span className="bg-surface px-3 text-sm text-copy-light absolute">Login with</span>
        </div>



        <SocialAuth socialLoginMutation={socialLoginMutation} />
        <p className="text-center mt-6 text-sm text-copy-light">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;