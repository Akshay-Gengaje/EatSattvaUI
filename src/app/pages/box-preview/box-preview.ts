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
  readonly nutrientsCovered = this.boxService.nutrientsCovered;
  readonly selectedPlan = this.boxService.selectedPlan;
  readonly isTrialPlan = this.boxService.isTrialPlan;
  readonly totalProteinGrams = this.boxService.totalProteinGrams;
  readonly avgProteinPerMeal = this.boxService.avgProteinPerMeal;
  readonly totalCalories = this.boxService.totalCalories;

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  goBack(): void {
    this.router.navigate(['/select-goal']);
  }
}
