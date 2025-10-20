import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthAPI, TokenManager } from '../apis';
import { User as APIUser } from '../apis/types';
import { toast } from 'react-hot-toast';

export type UserRole = 'customer' | 'supplier' | 'admin';
export type ThemeMode = 'light' | 'dark' | 'system';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  preferences?: {
    theme: ThemeMode;
    notifications: {
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
      telegram: boolean;
    };
  };
  addresses?: Address[]; // Add addresses
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  verifyEmail: (code: string) => Promise<void>;
  verifyPhone: (code: string) => Promise<void>;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
  isAdmin: boolean;
  isSupplier: boolean;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
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
  const transformUser = (apiUser: APIUser): User => ({
    id: apiUser.id,
    name: `${apiUser.firstname} ${apiUser.lastname}`,
    email: apiUser.email,
    phone: apiUser.phone,
    role: apiUser.role as UserRole,
    emailVerified: apiUser.verified,
    phoneVerified: false, // This would come from API
    preferences: {
      theme: 'system' as ThemeMode,
      notifications: {
        email: true,
        sms: false,
        whatsapp: false,
        telegram: false
      }
    },
    addresses: apiUser.addresses, // Map addresses
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

  const register = async (name: string, email: string, password: string, role: UserRole = 'customer') => {
    setIsLoading(true);
    try {
      const [firstname, ...lastnameParts] = name.split(' ');
      const lastname = lastnameParts.join(' ') || '';
      
      const response = await AuthAPI.register({
        email,
        password,
        firstname,
        lastname,
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
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      await AuthAPI.verifyEmail(code);
      if (user) {
        setUser({ ...user, emailVerified: true });
      }
      toast.success('Email verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Email verification failed');
      throw error;
    }
  };

  const verifyPhone = async (code: string) => {
    try {
      // This would be implemented when phone verification is added to the API
      if (user) {
        setUser({ ...user, phoneVerified: true });
      }
      toast.success('Phone verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Phone verification failed');
      throw error;
    }
  };

  const updateUserPreferences = async (preferences: Partial<User['preferences']>) => {
    try {
      // This would be implemented when user preferences are added to the API
      if (user && user.preferences) {
        const updatedUser = {
          ...user,
          preferences: { ...user.preferences, ...preferences } as User['preferences']
        };
        setUser(updatedUser);
      }
      toast.success('Preferences updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update preferences');
      throw error;
    }
  };

  const isAdmin = user?.role === 'admin';
  const isSupplier = user?.role === 'supplier';

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    verifyPhone,
    updateUserPreferences,
    isAdmin,
    isSupplier,
    redirectPath,
    setRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};