import { Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE = 'http://localhost:8080/api/auth';

  readonly isAuthenticated = signal(false);
  readonly userPhone = signal<string>('');
  readonly isLoginDrawerOpen = signal(false);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedPhone = localStorage.getItem('user_phone');
      const token = localStorage.getItem('auth_token');
      if (storedPhone && token) {
        this.userPhone.set(storedPhone);
        this.isAuthenticated.set(true);
      }
    }
  }

  openLoginDrawer(): void {
    this.isLoginDrawerOpen.set(true);
  }

  closeLoginDrawer(): void {
    this.isLoginDrawerOpen.set(false);
  }

  /**
   * Phone Number OTP Login (Swiggy Style)
   */
  async loginWithPhone(phone: string): Promise<boolean> {
    this.userPhone.set(phone);
    this.isAuthenticated.set(true);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user_phone', phone);
      localStorage.setItem('auth_token', 'jwt_token_' + Date.now());
    }

    this.closeLoginDrawer();
    return true;
  }

  /**
   * Register a new customer.
   */
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${this.API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed. Please try again.' }));
      throw new Error(error.message || 'Registration failed');
    }

    const data: RegisterResponse = await response.json();
    return data;
  }

  /**
   * Authenticate customer with phone number and password.
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed. Please try again.' }));
      throw new Error(error.message || 'Invalid phone number or password');
    }

    const data: LoginResponse = await response.json();

    if (data.message === 'Login Successful' || data.authenticated) {
      this.isAuthenticated.set(true);
      this.userPhone.set(request.phoneNumber);

      if (typeof localStorage !== 'undefined') {
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        } else {
          localStorage.setItem('auth_token', 'mock_token_for_now'); 
        }
        localStorage.setItem('user_phone', request.phoneNumber);
      }
      this.closeLoginDrawer();
    }

    return data;
  }

  /**
   * Logout current customer
   */
  logout(): void {
    this.isAuthenticated.set(false);
    this.userPhone.set('');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_phone');
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}
