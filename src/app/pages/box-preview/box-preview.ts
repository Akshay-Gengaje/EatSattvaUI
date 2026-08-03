import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-box-preview',
  templateUrl: './box-preview.html',
  styleUrl: './box-preview.css',
  imports: [DecimalPipe],
})
export class BoxPreviewComponent {
  readonly boxService = inject(BoxService);
  private router = inject(Router);

  readonly selectedGoal = this.boxService.selectedGoal;
  readonly curatedFruits = this.boxService.curatedFruits;
  readonly boxPrice = this.boxService.boxPrice;
  readonly totalPrice = this.boxService.totalPrice;
  readonly totalWeight = this.boxService.totalWeight;
  readonly nutrientsCovered = this.boxService.nutrientsCovered;
  readonly isMonthlyPlan = this.boxService.isMonthlyPlan;
  readonly deliveryFee = this.boxService.deliveryFee;


  togglePlan(): void {
    this.boxService.togglePlan();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  goBack(): void {
    this.router.navigate(['/select-goal']);
  }
}
