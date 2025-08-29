export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'dosen' | 'mahasiswa';
  nim?: string;
  nip?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
}

export interface LoginCredentials {
  login: string; // email or phone
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role: 'admin' | 'dosen' | 'mahasiswa';
  nim?: string;
  nip?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}