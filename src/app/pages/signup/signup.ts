import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  firstName = signal('');
  lastName = signal('');
  phoneNumber = signal('');
  password = signal('');
  confirmPassword = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  agreeTerms = signal(false);

  // Password strength
  passwordStrength = signal<'weak' | 'fair' | 'strong' | ''>('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  onPasswordChange(value: string): void {
    this.password.set(value);
    this.evaluatePasswordStrength(value);
  }

  private evaluatePasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrength.set('');
      return;
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      this.passwordStrength.set('weak');
    } else if (score <= 3) {
      this.passwordStrength.set('fair');
    } else {
      this.passwordStrength.set('strong');
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');

    const firstName = this.firstName().trim();
    const lastName = this.lastName().trim();
    const phoneNumber = this.phoneNumber().trim();
    const password = this.password();
    const confirmPassword = this.confirmPassword();

    // Validations
    if (!firstName) {
      this.errorMessage.set('Please enter your first name');
      return;
    }

    if (!lastName) {
      this.errorMessage.set('Please enter your last name');
      return;
    }

    if (!phoneNumber) {
      this.errorMessage.set('Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      this.errorMessage.set('Please enter a valid 10-digit phone number');
      return;
    }

    if (!password) {
      this.errorMessage.set('Please create a password');
      return;
    }

    if (password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    if (!this.agreeTerms()) {
      this.errorMessage.set('Please agree to the Terms & Conditions');
      return;
    }

    this.isLoading.set(true);

    try {
      await this.authService.register({
        firstName,
        lastName,
        phoneNumber,
        password,
      });
      // On successful registration, redirect to login
      this.router.navigate(['/login'], {
        queryParams: { registered: 'true' },
      });
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Registration failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
