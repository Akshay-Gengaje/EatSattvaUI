import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FruitService } from '../../services/fruit.service';
import { BoxService } from '../../services/box.service';
import { GoalCard } from '../../components/goal-card/goal-card';

@Component({
  selector: 'app-select-goal',
  templateUrl: './select-goal.html',
  styleUrl: './select-goal.css',
  imports: [GoalCard],
})
export class SelectGoalComponent {
  private fruitService = inject(FruitService);
  readonly boxService = inject(BoxService);
  private router = inject(Router);

  readonly healthGoals = this.fruitService.healthGoals;
  readonly deficiencies = this.fruitService.deficiencies;
  readonly pricingPlans = this.fruitService.pricingPlans;

  readonly currentStep = signal(1);
  readonly category = signal<'goal' | 'deficiency' | null>('goal');
  readonly selectedGoalId = signal<string | null>('muscle-gain');
  readonly selectedPlanId = signal<string>(this.boxService.selectedPlanId());
  readonly consultationChoice = signal<'ai' | 'human'>(this.boxService.consultationType());

  selectCategory(cat: 'goal' | 'deficiency'): void {
    this.category.set(cat);
    this.currentStep.set(2);
  }

  selectGoal(id: string): void {
    this.selectedGoalId.set(id);
  }

  selectConsultation(type: 'ai' | 'human'): void {
    this.consultationChoice.set(type);
    this.boxService.setConsultationType(type);
  }

  selectPlan(planId: string): void {
    this.selectedPlanId.set(planId);
    this.boxService.selectPlan(planId);
  }

  goBack(): void {
    if (this.currentStep() === 2) {
      this.currentStep.set(1);
    }
  }

  proceedToStep2(): void {
    this.currentStep.set(2);
  }

  proceedToBox(): void {
    const cat = this.category() || 'goal';
    const goalId = this.selectedGoalId() || 'muscle-gain';
    this.boxService.selectGoal(cat, goalId);
    this.boxService.selectPlan(this.selectedPlanId());
    this.boxService.setConsultationType(this.consultationChoice());
    this.router.navigate(['/box-preview']);
  }
}
