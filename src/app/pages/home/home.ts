import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FruitService } from '../../services/fruit.service';
import { FruitCard } from '../../components/fruit-card/fruit-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RouterLink, FruitCard],
})
export class HomeComponent {
  private fruitService = inject(FruitService);

  readonly fruits = this.fruitService.fruits;
  readonly healthGoals = this.fruitService.healthGoals;
  readonly pricingPlans = this.fruitService.pricingPlans;
  readonly testimonials = this.fruitService.testimonials;

  readonly seasonalFruits = computed(() => {
    const seasonal = this.fruitService.getSeasonalFruits();
    return seasonal.length >= 4 ? seasonal : this.fruits.slice(0, 8);
  });

  readonly heroEmojis = [
    { emoji: '🥭', top: '10%', left: '5%', size: '3.5rem', delay: '0s' },
    { emoji: '🍇', top: '20%', right: '8%', size: '3rem', delay: '1s' },
    { emoji: '🍊', top: '65%', left: '3%', size: '2.8rem', delay: '2s' },
    { emoji: '🍓', top: '75%', right: '5%', size: '3.2rem', delay: '0.5s' },
    { emoji: '🥝', top: '40%', left: '8%', size: '2.5rem', delay: '1.5s' },
    { emoji: '🍍', top: '50%', right: '10%', size: '3rem', delay: '2.5s' },
  ];

  readonly circleEmojis = ['🥭', '🍎', '🍌', '🍊', '🍇', '🥝', '🍓', '🍉'];

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
