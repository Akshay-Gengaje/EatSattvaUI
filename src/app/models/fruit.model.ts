export interface Fruit {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  nutrients: string[];
  season: string[];
  pricePerKg: number;
  quantityGrams: number;
  goals: string[];
  deficiencies: string[];
  color: string;
}

export interface HealthGoal {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Deficiency {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface FruitBox {
  id: string;
  goal: HealthGoal | Deficiency;
  fruits: Fruit[];
  totalPrice: number;
  deliveryFee: number;
  totalWeight: number;
  nutrientsCovered: NutrientCoverage[];
}

export interface NutrientCoverage {
  name: string;
  percentage: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  goal: string;
  city: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceSubtext: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}
