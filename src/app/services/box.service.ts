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
  readonly selectedPlanId = signal<string>('5-day-trial');
  readonly isTrialPlan = signal(true);

  // Smart Consultation Monetization State
  readonly consultationType = signal<'ai' | 'human'>('ai'); // 'ai' = free, 'human' = ₹299 or FREE on sub

  // Scratch Coupon & Delivery Fee State
  readonly isCouponApplied = signal(false);
  readonly couponCode = signal<string | null>(null);
  readonly isScratchRevealed = signal(false);

  // Customer info
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly customerAddress = signal('');
  readonly customerPincode = signal('');
  readonly deliverySlot = signal('lunch');

  constructor(fruitService: FruitService) {
    this.fruitService = fruitService;
  }

  readonly selectedPlan = computed(() => {
    return this.fruitService.pricingPlans.find(p => p.id === this.selectedPlanId()) || this.fruitService.pricingPlans[0];
  });

  readonly baseDeliveryFee = computed(() => {
    if (this.isCouponApplied() || this.isTrialPlan() || this.isMonthlyPlan()) {
      return 0;
    }
    return 49;
  });

  readonly deliveryFee = computed(() => {
    return this.baseDeliveryFee();
  });

  readonly nutritionistConsultationFee = computed(() => {
    // Included FREE on 5-Day Trial & Monthly Subscriptions
    if (this.isTrialPlan() || this.isMonthlyPlan()) {
      return 0;
    }
    // If human nutritionist is selected on regular order -> ₹299
    return this.consultationType() === 'human' ? 299 : 0;
  });

  readonly totalProteinGrams = computed(() => {
    return this.curatedFruits().reduce((sum, f) => sum + (f.proteinGrams || 35), 0);
  });

  readonly avgProteinPerMeal = computed(() => {
    const fruits = this.curatedFruits();
    if (fruits.length === 0) return 42;
    return Math.round(this.totalProteinGrams() / fruits.length);
  });

  readonly totalCalories = computed(() => {
    return this.curatedFruits().reduce((sum, f) => sum + (f.calories || 400), 0);
  });

  readonly boxPrice = computed(() => {
    const plan = this.selectedPlan();
    if (plan.id === '5-day-trial') return 1495;
    if (plan.id === 'essential-plan') return 6999;
    if (plan.id === 'pro-plan') return 9999;
    if (plan.id === 'elite-plan') return 14999;
    return this.fruitService.calculateBoxPrice(this.curatedFruits());
  });

  readonly totalPrice = computed(() => {
    return this.boxPrice() + this.deliveryFee() + this.nutritionistConsultationFee();
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
        nutrientMap.set(n, Math.min(current + 35, 100));
      });
    });

    const icons: Record<string, string> = {
      '48g Protein': '🥩', '38g Protein': '🧀', '42g Protein': '🫛',
      '40g Protein': '🥚', '52g Protein': '🐟', '35g Protein': '🥗',
      '50g Protein': '🦃', '46g Protein': '🍛', 'Complex Carbs': '🌾',
      'Essential Amino Acids': '⚡', 'Calcium': '🦴', 'Dietary Fiber': '🥬',
      'BCAA': '🧪', 'Omega-3': '🐟', 'Vitamin E': '🥑', 'Antioxidants': '🫐',
      'Isoflavones': '🌱'
    };

    return Array.from(nutrientMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, percentage]) => ({
        name,
        percentage,
        icon: icons[name] || '💪',
      }));
  });

  setConsultationType(type: 'ai' | 'human'): void {
    this.consultationType.set(type);
  }

  selectPlan(planId: string): void {
    this.selectedPlanId.set(planId);
    this.isTrialPlan.set(planId === '5-day-trial');
  }

  applyScratchCoupon(code: string = 'FREEDEL'): void {
    this.couponCode.set(code.toUpperCase());
    this.isCouponApplied.set(true);
    this.isScratchRevealed.set(true);
  }

  revealScratchCard(): void {
    this.isScratchRevealed.set(true);
    this.applyScratchCoupon('FREEDEL');
  }

  selectGoal(type: 'goal' | 'deficiency', id: string): void {
    this.selectionType.set(type);
    this.selectedGoalId.set(id);

    if (type === 'goal') {
      const goal = this.fruitService.healthGoals.find(g => g.id === id) || null;
      this.selectedGoal.set(goal);
      const matched = this.fruitService.getFruitsByGoal(id);
      this.curatedFruits.set(matched.length > 0 ? matched : this.fruitService.fruits.slice(0, 5));
    } else {
      const def = this.fruitService.deficiencies.find(d => d.id === id) || null;
      this.selectedGoal.set(def);
      const matched = this.fruitService.getFruitsByDeficiency(id);
      this.curatedFruits.set(matched.length > 0 ? matched : this.fruitService.fruits.slice(0, 5));
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
    this.selectedPlanId.set('5-day-trial');
    this.isTrialPlan.set(true);
    this.consultationType.set('ai');
    this.isCouponApplied.set(false);
    this.couponCode.set(null);
    this.isScratchRevealed.set(false);
  }
}
