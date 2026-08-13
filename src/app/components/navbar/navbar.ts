import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BoxService } from '../../services/box.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly boxService = inject(BoxService);
  readonly authService = inject(AuthService);
  readonly toastService = inject(ToastService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLocationModalOpen = signal(false);

  // Swiggy Sign-In / Sign-Up Drawer State
  drawerMode = signal<'login' | 'signup'>('login');
  phoneNumber = signal('');
  password = signal('');
  signUpFirstName = signal('');
  signUpLastName = signal('');
  formError = signal('');
  isSubmitting = signal(false);

  // Swiggy location picker state
  currentLocation = signal('Indiranagar, Bengaluru');
  availableLocations = [
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'HSR Layout, Bengaluru',
    'Whitefield, Bengaluru',
    'BKC, Mumbai',
    'Bandra West, Mumbai',
    'Cyber City, Gurgaon',
    'Gachibowli, Hyderabad'
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 30);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleLocationModal(): void {
    this.isLocationModalOpen.update(v => !v);
  }

  setLocation(loc: string): void {
    this.currentLocation.set(loc);
    this.isLocationModalOpen.set(false);
  }

  openLoginDrawer(mode: 'login' | 'signup' = 'login'): void {
    this.drawerMode.set(mode);
    this.phoneNumber.set('');
    this.password.set('');
    this.signUpFirstName.set('');
    this.signUpLastName.set('');
    this.formError.set('');
    this.authService.openLoginDrawer();
  }

  closeLoginDrawer(): void {
    this.authService.closeLoginDrawer();
  }

  switchDrawerMode(mode: 'login' | 'signup'): void {
    this.drawerMode.set(mode);
    this.formError.set('');
  }

  async submitForm(): Promise<void> {
    const p = this.phoneNumber().trim();
    if (!p || p.length < 10) {
      this.formError.set('Please enter a valid 10-digit mobile number');
      return;
    }

    const pass = this.password();
    if (!pass) {
      this.formError.set('Please enter a password');
      return;
    }

    if (this.drawerMode() === 'signup') {
      const fn = this.signUpFirstName().trim();
      const ln = this.signUpLastName().trim();
      if (!fn || !ln) {
        this.formError.set('Please enter your first and last name');
        return;
      }
    }

    this.formError.set('');
    this.isSubmitting.set(true);

    try {
      if (this.drawerMode() === 'signup') {
        await this.authService.register({
          phoneNumber: p,
          password: pass,
          firstName: this.signUpFirstName().trim(),
          lastName: this.signUpLastName().trim()
        });
        // Automatically log them in after signup is complete
        await this.authService.login({ phoneNumber: p, password: pass });
        this.toastService.success('Account created successfully! Welcome to EatSattva.');
      } else {
        await this.authService.login({ phoneNumber: p, password: pass });
        this.toastService.success('Welcome back! Login successful.');
      }
    } catch (err: any) {
      this.formError.set(err.message || 'Authentication failed. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
