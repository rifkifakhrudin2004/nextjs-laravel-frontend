import { useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { useAuth } from './useAuth';

export const useApiClient = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Add any additional interceptors or configuration here
    // based on the current user
  }, [user]);

  return apiClient;
};