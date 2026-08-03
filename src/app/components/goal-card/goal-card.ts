import { Component, input, output } from '@angular/core';
import { HealthGoal } from '../../models/fruit.model';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.html',
  styleUrl: './goal-card.css',
})
export class GoalCard {
  goal = input.required<HealthGoal>();
  selected = input<boolean>(false);
  goalSelected = output<string>();

  onSelect(): void {
    this.goalSelected.emit(this.goal().id);
  }
}
