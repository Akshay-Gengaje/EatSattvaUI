import { Injectable, signal } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE = 'http://localhost:8080/api/auth';

  isAuthenticated = signal(false);

  /**
   * Register a new customer.
   * Connects to Spring Boot backend POST /api/auth/register
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
   * Authenticate customer with email/phone and password.
   * Connects to Spring Boot backend POST /api/auth/login
   * Backend verifies credentials and returns JWT + authenticated flag.
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed. Please try again.' }));
      throw new Error(error.message || 'Invalid email/phone or password');
    }

    const data: LoginResponse = await response.json();

    if (data.authenticated) {
      this.isAuthenticated.set(true);

      // Store JWT token for authenticated requests
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }
    }

    return data;
  }

  /**
   * Logout current customer
   */
  logout(): void {
    this.isAuthenticated.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
}
