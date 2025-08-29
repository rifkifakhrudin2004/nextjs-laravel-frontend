import { apiClient } from '@/lib/api';
import { User, ApiResponse } from '@/types/auth';

export const userService = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data;
  },

  async getUser(id: number): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  }
};