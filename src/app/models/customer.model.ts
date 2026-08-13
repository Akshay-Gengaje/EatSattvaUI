export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  authenticated?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  email?: string;
  emailVerified?: boolean;
  success?: boolean;
}

