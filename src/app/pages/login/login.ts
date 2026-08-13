import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  phoneNumber = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  rememberMe = signal(false);

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        setTimeout(() => {
          this.toastService.success('Registration successful! Please sign in.');
        }, 100);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }



  async onSubmit(): Promise<void> {
    this.errorMessage.set('');

    const identifier = this.phoneNumber().trim();
    const password = this.password();

    // Validation
    if (!identifier) {
      this.errorMessage.set('Please enter your phone number');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(identifier)) {
      this.errorMessage.set('Please enter a valid 10-digit phone number');
      return;
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
        phoneNumber: identifier,
        password,
      });
      this.toastService.success('Welcome back! Login successful.');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Login failed. Please check your credentials.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
