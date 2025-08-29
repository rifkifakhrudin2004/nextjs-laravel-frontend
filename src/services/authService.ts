import { apiClient } from '@/lib/api';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  User,
  ApiResponse 
} from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  async me(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/logout');
    return response.data;
  },

  async logoutAll(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/logout-all');
    return response.data;
  },

  async getDashboard(): Promise<ApiResponse<{ message: string; user: User }>> {
    const response = await apiClient.get<ApiResponse<{ message: string; user: User }>>('/dashboard');
    return response.data;
  }
};
