import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FruitService } from '../../services/fruit.service';
import { BoxService } from '../../services/box.service';
import { FruitCard } from '../../components/fruit-card/fruit-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RouterLink, FruitCard],
})
export class HomeComponent {
  private fruitService = inject(FruitService);
  readonly boxService = inject(BoxService);
  private router = inject(Router);

  readonly fruits = this.fruitService.fruits;
  readonly healthGoals = this.fruitService.healthGoals;
  readonly pricingPlans = this.fruitService.pricingPlans;
  readonly testimonials = this.fruitService.testimonials;
  readonly personas = this.fruitService.personas;

  // Swiggy Search & Category Filter State
  readonly searchQuery = signal('');
  readonly activeCategory = signal('all');
  readonly activeFilterTab = signal('all');

  // Swiggy "What's on your mind?" Health Categories
  readonly swiggyCategories = [
    { id: 'all', name: 'All Meals', icon: '🍱' },
    { id: 'high-protein', name: 'High Protein', icon: '💪' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: '🥩' },
    { id: 'weight-loss', name: 'Weight Loss', icon: '🥗' },
    { id: 'keto', name: 'Keto Bowls', icon: '🥑' },
    { id: 'pure-veg', name: 'Pure Veg 🟢', icon: '🫘' },
    { id: 'detox', name: 'Detox Juices', icon: '🥤' }
  ];

  readonly filteredMeals = computed(() => {
    let result = this.fruits;

    // Filter by Swiggy circular category
    const cat = this.activeCategory();
    if (cat === 'high-protein') {
      result = result.filter(f => (f.proteinGrams || 0) >= 42);
    } else if (cat === 'muscle-gain') {
      result = result.filter(f => f.goals.includes('muscle_building') || (f.proteinGrams || 0) >= 45);
    } else if (cat === 'weight-loss') {
      result = result.filter(f => f.goals.includes('weight_loss') || (f.calories || 500) <= 450);
    } else if (cat === 'keto') {
      result = result.filter(f => (f.carbsGrams || 30) <= 25);
    } else if (cat === 'pure-veg') {
      result = result.filter(f => f.dietaryType === 'veg' || !f.dietaryType);
    } else if (cat === 'detox') {
      result = result.filter(f => f.deficiencies.length > 0 || f.name.toLowerCase().includes('juice') || f.name.toLowerCase().includes('salad'));
    }

    // Filter by text search query
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      result = result.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.tagline.toLowerCase().includes(q) ||
        f.nutrients.some(n => n.toLowerCase().includes(q))
      );
    }

    return result;
  });

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  selectCategory(catId: string): void {
    this.activeCategory.set(catId);
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  selectPlanAndCheckout(planId: string): void {
    this.boxService.selectPlan(planId);
    this.router.navigate(['/select-goal']);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
