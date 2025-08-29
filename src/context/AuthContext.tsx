'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '@/types/auth';
import { authService } from '@/services/authService';
import { 
  setAuthToken, 
  getAuthToken, 
  removeAuthToken, 
  setUser, 
  getUser, 
  removeUser 
} from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  isAuthenticated: boolean;
}

// Export the AuthContext so it can be imported elsewhere
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      const cachedUser = getUser();

      if (token && cachedUser) {
        setUserState(cachedUser);
        try {
          // Verify token is still valid
          const response = await authService.me();
          if (response.success && response.data) {
            setUserState(response.data);
            setUser(response.data);
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          removeAuthToken();
          removeUser();
          setUserState(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        setUserState(response.data.user);
        
        // Redirect based on role
        const redirectPath = getRoleRedirectPath(response.data.user.role);
        router.push(redirectPath);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authService.register(userData);
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        setUserState(response.data.user);
        
        // Redirect based on role
        const redirectPath = getRoleRedirectPath(response.data.user.role);
        router.push(redirectPath);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeAuthToken();
      removeUser();
      setUserState(null);
      router.push('/login');
    }
  };

  const logoutAll = async () => {
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      removeAuthToken();
      removeUser();
      setUserState(null);
      router.push('/login');
    }
  };

  const getRoleRedirectPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'dosen':
        return '/dosen';
      case 'mahasiswa':
        return '/mahasiswa';
      default:
        return '/';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    logoutAll,
    isAuthenticated: !!user && !!getAuthToken(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};