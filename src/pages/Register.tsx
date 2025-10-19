import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Input } from '../components/forms/Input';
import { Checkbox } from '../components/forms/Checkbox';
// import { Radio } from '../components/forms/Radio';
import { useMutation } from '../hooks/useApi';
import SocialAuth from '../components/auth/SocialAuth';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated, isAdmin, isSupplier } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLoginMutation = useMutation<any, { token: string; provider: string }>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Get redirect path from URL params or default based on user role
      const getRedirectPath = () => {
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        if (redirect) return redirect;
        if (isAdmin) return '/admin';
        if (isSupplier) return '/account/products';
        return '/';
      };
      navigate(getRedirectPath());
    }
  }, [isAuthenticated, navigate, location.search, isAdmin, isSupplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }
    try {
      setLoading(true);
      await register(name, email, password, userType);
      toast.success('Registration successful! Welcome to Banwee Organics.');
      // Navigate will happen automatically due to the useEffect
    } catch (error) {
      toast.error('Registration failed. Please try again with different credentials.');
      setLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'customer', label: 'Customer', description: 'Shop for organic products' },
    { value: 'supplier', label: 'Supplier', description: 'Sell your products on our platform' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 text-copy">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light">
        <h1 className="text-2xl font-bold text-main mb-6 text-center">Create an Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-main mb-1">
              Account Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {userTypeOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setUserType(option.value as UserRole)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    userType === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-main">{option.label}</h3>
                    {userType === option.value && <CheckCircle size={16} className="text-primary" />}
                  </div>
                  <p className="text-xs text-copy-light">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-main mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="mt-1">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    password.length === 0
                      ? 'w-0'
                      : password.length < 6
                      ? 'w-1/4 bg-red-500'
                      : password.length < 8
                      ? 'w-2/4 bg-yellow-500'
                      : password.length < 10
                      ? 'w-3/4 bg-blue-500'
                      : 'w-full bg-green-500'
                  }`}>
                </div>
              </div>
              <p className="text-xs text-copy-light mt-1">Password should be at least 8 characters</p>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-main mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-copy-lighter" />
                ) : (
                  <Eye size={18} className="text-copy-lighter" />
                )}
              </button>
            </div>
          </div>
          <Checkbox
            label={
              <>
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </>
            }
            id="terms"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
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
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-border-light w-full"></div>
          <span className="bg-surface px-3 text-sm text-copy-light absolute">Or sign up with</span>
        </div>
        <SocialAuth socialLoginMutation={socialLoginMutation} />
        <p className="text-center mt-6 text-sm text-copy-light">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;