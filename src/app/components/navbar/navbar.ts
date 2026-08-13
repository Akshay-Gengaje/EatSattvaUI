import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly boxService = inject(BoxService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLocationModalOpen = signal(false);

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
}
