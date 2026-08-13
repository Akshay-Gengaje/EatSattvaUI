import { Component, input, inject, signal } from '@angular/core';
import { Fruit } from '../../models/fruit.model';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-fruit-card',
  templateUrl: './fruit-card.html',
  styleUrl: './fruit-card.css',
})
export class FruitCard {
  fruit = input.required<Fruit>();
  readonly boxService = inject(BoxService);
  addedCount = signal(0);

  toggleAdd(): void {
    if (this.addedCount() === 0) {
      this.addedCount.set(1);
    } else {
      this.addedCount.set(0);
    }
  }

  increment(): void {
    this.addedCount.update(c => c + 1);
  }

  decrement(): void {
    this.addedCount.update(c => Math.max(0, c - 1));
  }
}
