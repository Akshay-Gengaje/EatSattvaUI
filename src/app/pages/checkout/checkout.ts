import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  imports: [FormsModule, DecimalPipe],
})
export class CheckoutComponent {
  readonly boxService = inject(BoxService);
  private router = inject(Router);

  readonly selectedGoal = this.boxService.selectedGoal;
  readonly curatedFruits = this.boxService.curatedFruits;
  readonly boxPrice = this.boxService.boxPrice;
  readonly totalPrice = this.boxService.totalPrice;
  readonly totalWeight = this.boxService.totalWeight;
  readonly isMonthlyPlan = this.boxService.isMonthlyPlan;
  readonly deliveryFee = this.boxService.deliveryFee;

  // Form fields
  name = '';
  phone = '';
  address = '';
  pincode = '';
  deliverySlot = 'morning';
  paymentMethod = 'upi';

  // State
  readonly orderPlaced = signal(false);
  readonly showConfetti = signal(false);

  readonly deliverySlots = [
    { value: 'morning', label: '🌅 Morning (7am – 10am)' },
    { value: 'afternoon', label: '☀️ Afternoon (12pm – 3pm)' },
    { value: 'evening', label: '🌇 Evening (5pm – 8pm)' },
  ];

  readonly paymentMethods = [
    { value: 'upi', label: '📱 UPI (GPay / PhonePe)', icon: '📱' },
    { value: 'card', label: '💳 Credit / Debit Card', icon: '💳' },
    { value: 'cod', label: '💵 Cash on Delivery', icon: '💵' },
  ];

  get isFormValid(): boolean {
    return this.name.trim().length > 1
      && /^[6-9]\d{9}$/.test(this.phone.trim())
      && this.address.trim().length > 5
      && /^\d{6}$/.test(this.pincode.trim());
  }

  placeOrder(): void {
    if (!this.isFormValid) return;
    this.showConfetti.set(true);
    setTimeout(() => {
      this.orderPlaced.set(true);
    }, 600);
  }

  goHome(): void {
    this.boxService.reset();
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/box-preview']);
  }
}
