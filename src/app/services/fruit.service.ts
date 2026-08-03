import { Injectable } from '@angular/core';
import {
  Fruit,
  HealthGoal,
  Deficiency,
  Testimonial,
  PricingPlan,
} from '../models/fruit.model';

@Injectable({ providedIn: 'root' })
export class FruitService {

  readonly fruits: Fruit[] = [
    {
      id: 'mango', name: 'Alphonso Mango', emoji: '🥭',
      tagline: 'King of fruits, rich in Vitamin A',
      nutrients: ['Vitamin A', 'Vitamin C', 'Fiber'],
      season: ['Apr', 'May', 'Jun'], pricePerKg: 350, quantityGrams: 500,
      goals: ['glowing-skin', 'energy-boost', 'immunity'],
      deficiencies: ['vitamin-a', 'vitamin-c'],
      color: '#FFB347'
    },
    {
      id: 'pomegranate', name: 'Pomegranate', emoji: '🍎',
      tagline: 'Antioxidant powerhouse',
      nutrients: ['Antioxidants', 'Iron', 'Vitamin C'],
      season: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'], pricePerKg: 180, quantityGrams: 500,
      goals: ['heart-health', 'immunity', 'glowing-skin'],
      deficiencies: ['iron', 'antioxidants', 'vitamin-c'],
      color: '#C41E3A'
    },
    {
      id: 'banana', name: 'Elaichi Banana', emoji: '🍌',
      tagline: 'Instant energy, potassium rich',
      nutrients: ['Potassium', 'Fiber', 'Vitamin B6'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 60, quantityGrams: 1000,
      goals: ['energy-boost', 'digestion', 'weight-loss'],
      deficiencies: ['potassium', 'fiber'],
      color: '#FFE135'
    },
    {
      id: 'orange', name: 'Nagpur Orange', emoji: '🍊',
      tagline: 'Immunity shield, Vitamin C bomb',
      nutrients: ['Vitamin C', 'Fiber', 'Folate'],
      season: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'], pricePerKg: 100, quantityGrams: 750,
      goals: ['immunity', 'glowing-skin', 'weight-loss'],
      deficiencies: ['vitamin-c', 'fiber'],
      color: '#FF8C00'
    },
    {
      id: 'papaya', name: 'Red Papaya', emoji: '🍈',
      tagline: 'Digestive champion, enzyme-rich',
      nutrients: ['Vitamin C', 'Vitamin A', 'Papain enzyme'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 50, quantityGrams: 1000,
      goals: ['digestion', 'glowing-skin', 'immunity'],
      deficiencies: ['vitamin-a', 'vitamin-c'],
      color: '#FF6347'
    },
    {
      id: 'guava', name: 'Pink Guava', emoji: '🍐',
      tagline: '4x more Vitamin C than oranges',
      nutrients: ['Vitamin C', 'Fiber', 'Potassium'],
      season: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'], pricePerKg: 80, quantityGrams: 750,
      goals: ['immunity', 'weight-loss', 'digestion'],
      deficiencies: ['vitamin-c', 'fiber', 'potassium'],
      color: '#90EE90'
    },
    {
      id: 'apple', name: 'Shimla Apple', emoji: '🍎',
      tagline: 'Daily health, keeps the doctor away',
      nutrients: ['Fiber', 'Vitamin C', 'Antioxidants'],
      season: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'], pricePerKg: 200, quantityGrams: 750,
      goals: ['heart-health', 'weight-loss', 'digestion'],
      deficiencies: ['fiber', 'antioxidants'],
      color: '#DC143C'
    },
    {
      id: 'watermelon', name: 'Watermelon', emoji: '🍉',
      tagline: 'Hydration hero, lycopene rich',
      nutrients: ['Lycopene', 'Vitamin A', 'Hydration'],
      season: ['Mar', 'Apr', 'May', 'Jun', 'Jul'], pricePerKg: 30, quantityGrams: 2000,
      goals: ['glowing-skin', 'energy-boost', 'weight-loss'],
      deficiencies: ['vitamin-a', 'antioxidants'],
      color: '#FF6B6B'
    },
    {
      id: 'grapes', name: 'Black Grapes', emoji: '🍇',
      tagline: 'Heart-friendly, resveratrol packed',
      nutrients: ['Antioxidants', 'Vitamin K', 'Resveratrol'],
      season: ['Feb', 'Mar', 'Apr', 'May'], pricePerKg: 120, quantityGrams: 500,
      goals: ['heart-health', 'glowing-skin', 'energy-boost'],
      deficiencies: ['antioxidants', 'iron'],
      color: '#6B2D7B'
    },
    {
      id: 'kiwi', name: 'Green Kiwi', emoji: '🥝',
      tagline: 'Vitamin C champion, gut friendly',
      nutrients: ['Vitamin C', 'Vitamin K', 'Fiber'],
      season: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], pricePerKg: 250, quantityGrams: 500,
      goals: ['immunity', 'digestion', 'glowing-skin'],
      deficiencies: ['vitamin-c', 'fiber'],
      color: '#7CFC00'
    },
    {
      id: 'chikoo', name: 'Chikoo (Sapota)', emoji: '🫘',
      tagline: 'Natural sweetness, iron rich',
      nutrients: ['Iron', 'Fiber', 'Vitamin A'],
      season: ['Jan', 'Feb', 'Oct', 'Nov', 'Dec'], pricePerKg: 100, quantityGrams: 500,
      goals: ['energy-boost', 'digestion'],
      deficiencies: ['iron', 'fiber', 'vitamin-a'],
      color: '#D2691E'
    },
    {
      id: 'pineapple', name: 'Pineapple', emoji: '🍍',
      tagline: 'Bromelain enzyme, anti-inflammatory',
      nutrients: ['Vitamin C', 'Bromelain', 'Manganese'],
      season: ['Mar', 'Apr', 'May', 'Jun', 'Jul'], pricePerKg: 60, quantityGrams: 1000,
      goals: ['digestion', 'immunity', 'glowing-skin'],
      deficiencies: ['vitamin-c'],
      color: '#FFD700'
    },
    {
      id: 'strawberry', name: 'Mahabaleshwar Strawberry', emoji: '🍓',
      tagline: 'Antioxidant berry, skin glow',
      nutrients: ['Vitamin C', 'Antioxidants', 'Folate'],
      season: ['Dec', 'Jan', 'Feb', 'Mar'], pricePerKg: 300, quantityGrams: 250,
      goals: ['glowing-skin', 'immunity', 'heart-health'],
      deficiencies: ['vitamin-c', 'antioxidants'],
      color: '#FF4757'
    },
    {
      id: 'coconut', name: 'Tender Coconut', emoji: '🥥',
      tagline: 'Electrolyte balance, nature\'s sports drink',
      nutrients: ['Potassium', 'Electrolytes', 'Healthy fats'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 45, quantityGrams: 1000,
      goals: ['energy-boost', 'heart-health'],
      deficiencies: ['potassium'],
      color: '#8B7355'
    },
    {
      id: 'jamun', name: 'Jamun (Java Plum)', emoji: '🫐',
      tagline: 'Blood sugar regulator, iron booster',
      nutrients: ['Iron', 'Antioxidants', 'Vitamin C'],
      season: ['Jun', 'Jul', 'Aug'], pricePerKg: 150, quantityGrams: 500,
      goals: ['heart-health', 'immunity'],
      deficiencies: ['iron', 'antioxidants'],
      color: '#2E1A47'
    },
    {
      id: 'lychee', name: 'Lychee', emoji: '🫕',
      tagline: 'Sweet immunity, vitamin rich',
      nutrients: ['Vitamin C', 'Copper', 'Potassium'],
      season: ['May', 'Jun', 'Jul'], pricePerKg: 200, quantityGrams: 500,
      goals: ['immunity', 'glowing-skin', 'energy-boost'],
      deficiencies: ['vitamin-c', 'potassium'],
      color: '#FF69B4'
    },
  ];

  readonly healthGoals: HealthGoal[] = [
    { id: 'immunity', name: 'Boost Immunity', icon: '🛡️', description: 'Strengthen your body\'s natural defenses with Vitamin C & antioxidant-rich fruits', color: '#4A7C59' },
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️', description: 'Low-calorie, high-fiber fruits to support healthy weight management', color: '#E8805A' },
    { id: 'glowing-skin', name: 'Glowing Skin', icon: '✨', description: 'Vitamin A, C & E rich fruits for radiant, youthful skin', color: '#F0C27A' },
    { id: 'digestion', name: 'Better Digestion', icon: '🌿', description: 'Enzyme & fiber-packed fruits for a happy, healthy gut', color: '#7BC67E' },
    { id: 'energy-boost', name: 'Energy Boost', icon: '⚡', description: 'Natural sugars & potassium to power through your day', color: '#FFB347' },
    { id: 'heart-health', name: 'Heart Health', icon: '❤️', description: 'Antioxidant & potassium-rich fruits to keep your heart strong', color: '#E05C5C' },
  ];

  readonly deficiencies: Deficiency[] = [
    { id: 'vitamin-c', name: 'Vitamin C', icon: '🍊', description: 'Essential for immunity, skin repair, and iron absorption', color: '#FF8C00' },
    { id: 'iron', name: 'Iron', icon: '💪', description: 'Vital for oxygen transport and energy levels', color: '#C41E3A' },
    { id: 'potassium', name: 'Potassium', icon: '🔋', description: 'Key for muscle function, heart rhythm, and fluid balance', color: '#FFE135' },
    { id: 'fiber', name: 'Fiber', icon: '🌾', description: 'Essential for digestive health and blood sugar control', color: '#90EE90' },
    { id: 'vitamin-a', name: 'Vitamin A', icon: '👁️', description: 'Critical for vision, skin health, and immune function', color: '#FFB347' },
    { id: 'antioxidants', name: 'Antioxidants', icon: '🫐', description: 'Protect cells from damage, slow aging, reduce inflammation', color: '#6B2D7B' },
  ];

  readonly testimonials: Testimonial[] = [
    { id: '1', name: 'Priya Sharma', avatar: '👩‍💼', rating: 5, review: 'EatSattva changed my mornings! The immunity box helped me stay flu-free all winter. The fruits are always fresh and perfectly ripe.', goal: 'Immunity Boost', city: 'Mumbai' },
    { id: '2', name: 'Rahul Verma', avatar: '👨‍💻', rating: 5, review: 'As a developer, I needed sustained energy. The energy boost box is perfect — no more afternoon crashes! Love the banana + coconut combo.', goal: 'Energy Boost', city: 'Bangalore' },
    { id: '3', name: 'Anita Desai', avatar: '👩‍🎨', rating: 4, review: 'The glowing skin box is my secret! After 3 weeks of papaya + kiwi + strawberry, my skin has never looked better. Friends keep asking my routine.', goal: 'Glowing Skin', city: 'Pune' },
    { id: '4', name: 'Vikram Patel', avatar: '👨‍⚕️', rating: 5, review: 'I recommended EatSattva to my patients. The nutritionist consultation with the monthly plan is genuine and helpful. Great concept!', goal: 'Heart Health', city: 'Delhi' },
  ];

  readonly pricingPlans: PricingPlan[] = [
    {
      id: 'weekly',
      name: 'Weekly Box',
      description: 'Pay per box, no commitment',
      price: '₹299–599',
      priceSubtext: 'per box · varies by selection',
      features: [
        'Nutritionist-curated fruit selection',
        'Fresh seasonal fruits',
        '5–7 varieties per box',
        'Goal-based personalization',
        'Delivery fee: ₹49/order',
      ],
      highlighted: false,
      cta: 'Order This Week'
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      description: 'Subscribe & save more',
      price: '₹999',
      priceSubtext: 'per month · 4 boxes included',
      features: [
        'Everything in Weekly +',
        '✨ Free delivery on all boxes',
        '🧑‍⚕️ Free nutritionist consultation',
        'Priority seasonal picks',
        'Pause or cancel anytime',
        'Save up to ₹400/month',
      ],
      highlighted: true,
      badge: 'Best Value',
      cta: 'Start Subscription'
    }
  ];

  getFruitsByGoal(goalId: string): Fruit[] {
    return this.fruits.filter(f => f.goals.includes(goalId));
  }

  getFruitsByDeficiency(defId: string): Fruit[] {
    return this.fruits.filter(f => f.deficiencies.includes(defId));
  }

  getSeasonalFruits(): Fruit[] {
    const currentMonth = new Date().toLocaleString('en', { month: 'short' });
    return this.fruits.filter(f => f.season.includes(currentMonth));
  }

  calculateBoxPrice(fruits: Fruit[]): number {
    return fruits.reduce((sum, f) => sum + (f.pricePerKg * f.quantityGrams / 1000), 0);
  }
}
