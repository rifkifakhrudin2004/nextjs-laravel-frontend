import { User } from './auth';

export enum UserRole {
  ADMIN = 'admin',
  DOSEN = 'dosen',
  MAHASISWA = 'mahasiswa'
}

export interface UserProfile extends User {
  identifier?: string;
}

export interface UsersListResponse {
  success: boolean;
  data: User[];
}