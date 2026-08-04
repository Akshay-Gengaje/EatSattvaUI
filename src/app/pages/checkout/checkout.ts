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
  readonly deliveryFee = this.boxService.deliveryFee;
  readonly selectedPlan = this.boxService.selectedPlan;
  readonly isTrialPlan = this.boxService.isTrialPlan;
  readonly avgProteinPerMeal = this.boxService.avgProteinPerMeal;
  readonly isCouponApplied = this.boxService.isCouponApplied;
  readonly couponCode = this.boxService.couponCode;
  readonly isScratchRevealed = this.boxService.isScratchRevealed;

  // Coupon input
  inputCouponCode = '';
  couponError = signal<string | null>(null);

  // Form fields
  name = '';
  phone = '';
  companyOrBuilding = '';
  address = '';
  pincode = '';
  deliverySlot = 'lunch';
  paymentMethod = 'upi';

  // State
  readonly orderPlaced = signal(false);
  readonly showConfetti = signal(false);

  readonly deliverySlots = [
    { value: 'lunch', label: '☀️ Afternoon Lunch Slot (12:30 PM – 1:30 PM)' },
    { value: 'dinner', label: '🌙 Evening Dinner Slot (7:30 PM – 8:30 PM)' },
    { value: 'morning', label: '🌅 Morning Breakfast Slot (7:30 AM – 9:00 AM)' },
  ];

  readonly paymentMethods = [
    { value: 'upi', label: '📱 Instant UPI (GPay / PhonePe / Paytm)', icon: '📱' },
    { value: 'card', label: '💳 Credit / Debit Card', icon: '💳' },
    { value: 'cod', label: '💵 Pay on Delivery', icon: '💵' },
  ];

  get isFormValid(): boolean {
    return this.name.trim().length > 1
      && /^[6-9]\d{9}$/.test(this.phone.trim())
      && this.address.trim().length > 5
      && /^\d{6}$/.test(this.pincode.trim());
  }

  scratchCard(): void {
    this.boxService.revealScratchCard();
    this.showConfetti.set(true);
    setTimeout(() => this.showConfetti.set(false), 2500);
  }

  applyManualCoupon(): void {
    const code = this.inputCouponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'FREEDEL' || code === 'SATTVATRIAL' || code === 'SCRATCH500') {
      this.boxService.applyScratchCoupon(code);
      this.couponError.set(null);
      this.showConfetti.set(true);
      setTimeout(() => this.showConfetti.set(false), 2500);
    } else {
      this.couponError.set('Invalid coupon code. Try scratching the card above!');
    }
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
