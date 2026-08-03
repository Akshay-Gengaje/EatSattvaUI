import { Injectable, signal, computed } from '@angular/core';
import { Fruit, HealthGoal, Deficiency, NutrientCoverage } from '../models/fruit.model';
import { FruitService } from './fruit.service';

@Injectable({ providedIn: 'root' })
export class BoxService {
  private fruitService: FruitService;

  // State signals
  readonly selectionType = signal<'goal' | 'deficiency' | null>(null);
  readonly selectedGoalId = signal<string | null>(null);
  readonly selectedGoal = signal<HealthGoal | Deficiency | null>(null);
  readonly curatedFruits = signal<Fruit[]>([]);
  readonly isMonthlyPlan = signal(false);

  // Customer info
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly customerAddress = signal('');
  readonly customerPincode = signal('');
  readonly deliverySlot = signal('morning');

  // Delivery fee
  readonly deliveryFee = 49;

  constructor(fruitService: FruitService) {
    this.fruitService = fruitService;
  }

  readonly boxPrice = computed(() => {
    return this.fruitService.calculateBoxPrice(this.curatedFruits());
  });

  readonly totalPrice = computed(() => {
    const base = this.boxPrice();
    const delivery = this.isMonthlyPlan() ? 0 : this.deliveryFee;
    return base + delivery;
  });

  readonly totalWeight = computed(() => {
    return this.curatedFruits().reduce((sum, f) => sum + f.quantityGrams, 0);
  });

  readonly nutrientsCovered = computed((): NutrientCoverage[] => {
    const fruits = this.curatedFruits();
    const nutrientMap = new Map<string, number>();

    fruits.forEach(f => {
      f.nutrients.forEach(n => {
        const current = nutrientMap.get(n) || 0;
        nutrientMap.set(n, Math.min(current + 30, 100));
      });
    });

    const icons: Record<string, string> = {
      'Vitamin C': '🍊', 'Vitamin A': '🥕', 'Iron': '💪', 'Fiber': '🌾',
      'Potassium': '🔋', 'Antioxidants': '🫐', 'Vitamin B6': '⚡',
      'Folate': '🧬', 'Vitamin K': '🥬', 'Lycopene': '🍅',
      'Manganese': '🔩', 'Copper': '🪙', 'Resveratrol': '🍷',
      'Bromelain': '🍍', 'Papain enzyme': '🧪', 'Hydration': '💧',
      'Electrolytes': '⚡', 'Healthy fats': '🥑',
    };

    return Array.from(nutrientMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, percentage]) => ({
        name,
        percentage,
        icon: icons[name] || '✦',
      }));
  });

  selectGoal(type: 'goal' | 'deficiency', id: string): void {
    this.selectionType.set(type);
    this.selectedGoalId.set(id);

    if (type === 'goal') {
      const goal = this.fruitService.healthGoals.find(g => g.id === id) || null;
      this.selectedGoal.set(goal);
      this.curatedFruits.set(this.fruitService.getFruitsByGoal(id));
    } else {
      const def = this.fruitService.deficiencies.find(d => d.id === id) || null;
      this.selectedGoal.set(def);
      this.curatedFruits.set(this.fruitService.getFruitsByDeficiency(id));
    }
  }

  togglePlan(): void {
    this.isMonthlyPlan.update(v => !v);
  }

  setPlan(monthly: boolean): void {
    this.isMonthlyPlan.set(monthly);
  }

  reset(): void {
    this.selectionType.set(null);
    this.selectedGoalId.set(null);
    this.selectedGoal.set(null);
    this.curatedFruits.set([]);
    this.isMonthlyPlan.set(false);
  }
}
