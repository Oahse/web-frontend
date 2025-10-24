import React, { useEffect, useState, createContext, useContext, useCallback } from 'react'; // Import useCallback
import { TokenManager, AuthAPI } from '../apis';
import { User } from '../types';
import { toast } from 'react-hot-toast';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  register: (firstname: string, lastname: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<void>;
  isAdmin: boolean;
  isSupplier: boolean;
  isCustomer: boolean;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => Promise<void>; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Transform API user to local user format
  const transformUser = (apiUser: any): User => ({
    id: apiUser.id,
    created_at: apiUser.created_at,
    updated_at: apiUser.updated_at,
    email: apiUser.email,
    firstname: apiUser.firstname,
    lastname: apiUser.lastname,
    full_name: apiUser.full_name || `${apiUser.firstname} ${apiUser.lastname}`,
    role: apiUser.role,
    verified: apiUser.verified || false,
    active: apiUser.active || true,
    phone: apiUser.phone,
    avatar_url: apiUser.avatar_url,
    preferences: apiUser.preferences, // Include preferences
  });

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      if (TokenManager.isAuthenticated()) {
        try {
          console.log('AuthContext: Checking authentication with AuthAPI.getProfile()');
          const response = await AuthAPI.getProfile();
          const transformedUser = transformUser(response.data);
          setUser(transformedUser);
          setIsAuthenticated(true);
        } catch (error) {
          // Token might be expired, clear it
          TokenManager.clearTokens();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<string | undefined> => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.login({ email, password });
      const transformedUser = transformUser(response.data.user);

      setUser(transformedUser);
      setIsAuthenticated(true);

      toast.success('Login successful!');
      const path = redirectPath || undefined;
      setRedirectPath(null);
      return path;
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstname: string, lastname: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.register({
        email,
        password,
        firstname,
        lastname,
        phone,
      });

      const transformedUser = transformUser(response.data.user);
      setUser(transformedUser);
      setIsAuthenticated(true);

      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      await AuthAPI.verifyEmail(code);
      if (user) {
        setUser({ ...user, verified: true });
      }
      toast.success('Email verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Email verification failed');
      throw error;
    }
  };

  // New function to update user preferences
  const updateUserPreferences = useCallback(async (preferences: Partial<User['preferences']>) => {
    if (!user) return;

    try {
      // Optimistically update UI
      setUser(prevUser => prevUser ? { ...prevUser, preferences: { ...prevUser.preferences, ...preferences } } : null);

      // Persist to backend
      const response = await AuthAPI.updateProfile({ preferences }); // Assuming backend has an endpoint to update preferences
      const transformedUser = transformUser(response.data);
      setUser(transformedUser); // Update with actual data from backend

      toast.success('Preferences updated successfully!');
    } catch (error: any) {
      console.error('Failed to update user preferences:', error);
      toast.error(error.message || 'Failed to update preferences');
      // Revert optimistic update if API call fails (optional, but good for UX)
      // setUser(originalUser);
      throw error;
    }
  }, [user]); // Dependency on user to ensure we have the latest user object

  const isAdmin = user?.role === 'Admin';
  const isSupplier = user?.role === 'Supplier';
  const isCustomer = user?.role === 'Customer';

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    isAdmin,
    isSupplier,
    isCustomer,
    redirectPath,
    setRedirectPath,
    updateUserPreferences, // Add this line
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};