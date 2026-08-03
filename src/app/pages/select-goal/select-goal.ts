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
  private boxService = inject(BoxService);
  private router = inject(Router);

  readonly healthGoals = this.fruitService.healthGoals;
  readonly deficiencies = this.fruitService.deficiencies;

  readonly currentStep = signal(1);
  readonly category = signal<'goal' | 'deficiency' | null>(null);
  readonly selectedId = signal<string | null>(null);

  selectCategory(cat: 'goal' | 'deficiency'): void {
    this.category.set(cat);
    this.currentStep.set(2);
  }

  selectGoal(id: string): void {
    this.selectedId.set(id);
  }

  goBack(): void {
    if (this.currentStep() === 2) {
      this.currentStep.set(1);
      this.category.set(null);
      this.selectedId.set(null);
    }
  }

  proceed(): void {
    const cat = this.category();
    const id = this.selectedId();
    if (cat && id) {
      this.boxService.selectGoal(cat, id);
      this.router.navigate(['/box-preview']);
    }
  }
}
