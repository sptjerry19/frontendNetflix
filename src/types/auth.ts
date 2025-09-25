export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  level?: string;
  preferred_sports?: number[];
  preferred_position?: string[];
  avatar?: string;
  roles: string[];
  permissions?: string[];
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  device_name?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  level?: string;
  preferred_sports?: number[];
  preferred_position?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
