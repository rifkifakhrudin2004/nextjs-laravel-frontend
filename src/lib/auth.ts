import Cookies from 'js-cookie';
import { User } from '@/types/auth';

export const setAuthToken = (token: string) => {
  Cookies.set('auth_token', token, { 
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('auth_token');
};

export const removeAuthToken = () => {
  Cookies.remove('auth_token');
};

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken() && !!getUser();
};