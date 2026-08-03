import { Component, input } from '@angular/core';
import { Fruit } from '../../models/fruit.model';

@Component({
  selector: 'app-fruit-card',
  templateUrl: './fruit-card.html',
  styleUrl: './fruit-card.css',
})
export class FruitCard {
  fruit = input.required<Fruit>();
}
