import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  loginMethod = signal<'email' | 'phone'>('email');
  rememberMe = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  switchLoginMethod(method: 'email' | 'phone'): void {
    this.loginMethod.set(method);
    this.email.set('');
    this.errorMessage.set('');
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');

    const identifier = this.email().trim();
    const password = this.password();

    // Validation
    if (!identifier) {
      this.errorMessage.set(
        this.loginMethod() === 'email' ? 'Please enter your email address' : 'Please enter your phone number',
      );
      return;
    }

    if (this.loginMethod() === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        this.errorMessage.set('Please enter a valid email address');
        return;
      }
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(identifier)) {
        this.errorMessage.set('Please enter a valid 10-digit phone number');
        return;
      }
    }

    if (!password) {
      this.errorMessage.set('Please enter your password');
      return;
    }

    if (password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    this.isLoading.set(true);

    try {
      await this.authService.login({
        emailOrPhone: identifier,
        password,
      });
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Login failed. Please check your credentials.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
