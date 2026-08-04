import { Injectable } from '@angular/core';
import {
  Fruit,
  HealthGoal,
  Deficiency,
  Testimonial,
  PricingPlan,
  PersonaTarget,
} from '../models/fruit.model';

@Injectable({ providedIn: 'root' })
export class FruitService {

  readonly fruits: Fruit[] = [
    {
      id: 'chicken-quinoa-bowl',
      name: 'Smoked Chicken & Quinoa Macro Bowl',
      emoji: '🍗',
      tagline: 'High lean protein with complex smart carbs for active muscle build & daily energy',
      nutrients: ['48g Protein', 'Complex Carbs', 'Essential Amino Acids'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 350,
      quantityGrams: 450,
      goals: ['muscle-gain', 'daily-energy', 'fat-loss'],
      deficiencies: ['protein-deficiency', 'b12-deficiency'],
      color: '#E87A5D',
      proteinGrams: 48,
      carbsGrams: 35,
      fatGrams: 9,
      calories: 410,
      dietaryType: 'non-veg',
      tier: 'pro'
    },
    {
      id: 'paneer-tikka-protein-box',
      name: 'Herb Grilled Paneer & Millet Power Box',
      emoji: '🧀',
      tagline: 'Rich vegetarian protein packed with calcium & slow-release clean energy carbs',
      nutrients: ['38g Protein', 'Calcium', 'Dietary Fiber'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 299,
      quantityGrams: 420,
      goals: ['muscle-gain', 'daily-energy', 'maintenance'],
      deficiencies: ['protein-deficiency', 'calcium'],
      color: '#FFB347',
      proteinGrams: 38,
      carbsGrams: 40,
      fatGrams: 14,
      calories: 435,
      dietaryType: 'veg',
      tier: 'essential'
    },
    {
      id: 'tofu-edamame-buddha-bowl',
      name: 'Asian Tofu & Edamame Muscle Bowl',
      emoji: '🫛',
      tagline: '100% Plant-powered protein hero with sesame ginger glaze for active lifestyles',
      nutrients: ['42g Protein', 'BCAA', 'Omega-3'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 320,
      quantityGrams: 400,
      goals: ['fat-loss', 'daily-energy', 'maintenance'],
      deficiencies: ['protein-deficiency', 'fiber'],
      color: '#7BC67E',
      proteinGrams: 42,
      carbsGrams: 28,
      fatGrams: 11,
      calories: 380,
      dietaryType: 'veg',
      tier: 'pro'
    },
    {
      id: 'egg-white-avocado-box',
      name: 'Egg White Scramble & Avocado Toast Box',
      emoji: '🥚',
      tagline: 'Zero-fat pure egg whites with healthy avocado fats & multigrain toast',
      nutrients: ['40g Protein', 'Healthy Monounsaturated Fats', 'Vitamin E'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 280,
      quantityGrams: 380,
      goals: ['fat-loss', 'daily-energy', 'maintenance'],
      deficiencies: ['protein-deficiency', 'healthy-fats'],
      color: '#F0C27A',
      proteinGrams: 40,
      carbsGrams: 24,
      fatGrams: 8,
      calories: 328,
      dietaryType: 'eggetarian',
      tier: 'essential'
    },
    {
      id: 'salmon-asparagus-elite-box',
      name: 'Pan-Seared Atlantic Salmon & Asparagus',
      emoji: '🐟',
      tagline: 'Gourmet superfood meal with high Omega-3 and premium organic protein',
      nutrients: ['52g Protein', 'High Omega-3 EPA/DHA', 'Antioxidants'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 500,
      quantityGrams: 450,
      goals: ['muscle-gain', 'daily-energy'],
      deficiencies: ['protein-deficiency', 'omega3'],
      color: '#E05C5C',
      proteinGrams: 52,
      carbsGrams: 18,
      fatGrams: 16,
      calories: 424,
      dietaryType: 'non-veg',
      tier: 'elite'
    },
    {
      id: 'chana-sprout-power-box',
      name: 'Sprouted Chana & Peanut High-Protein Salad Box',
      emoji: '🥗',
      tagline: 'Wholesome raw protein booster packed with gut-friendly enzymes & fiber',
      nutrients: ['35g Protein', 'High Fiber', 'Iron'],
      season: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pricePerKg: 220,
      quantityGrams: 400,
      goals: ['daily-energy', 'fat-loss', 'maintenance'],
      deficiencies: ['protein-deficiency', 'iron', 'fiber'],
      color: '#90EE90',
      proteinGrams: 35,
      carbsGrams: 42,
      fatGrams: 7,
      calories: 370,
      dietaryType: 'veg',
      tier: 'essential'
    }
  ];

  readonly healthGoals: HealthGoal[] = [
    { id: 'daily-energy', name: 'Sustained Daily Energy & Focus', icon: '⚡', description: 'Clean macro-balanced meals to power your day without feeling sluggish or heavy', color: '#4A7C59' },
    { id: 'muscle-gain', name: 'High Protein & Muscle Strength', icon: '💪', description: 'High-protein meals (35g-55g per box) tailored for active muscle build & recovery', color: '#E05C5C' },
    { id: 'fat-loss', name: 'Weight Management & Fat Loss', icon: '🔥', description: 'Low-carb, high-protein thermal meals to support lean body composition', color: '#E8805A' },
    { id: 'maintenance', name: 'Clean Everyday Wellness', icon: '🌿', description: 'Optimal 40/30/30 protein-carb-fat balance for total body vitality', color: '#FFB347' },
  ];

  readonly deficiencies: Deficiency[] = [
    { id: 'protein-deficiency', name: 'Daily Protein Requirement', icon: '🥩', description: 'Fulfills your daily protein intake requirement easily with gourmet chef meals', color: '#C41E3A' },
    { id: 'b12-deficiency', name: 'Vitamin B12 & Vitality', icon: '⚡', description: 'Boosts red blood cells and keeps energy levels high all day', color: '#FF8C00' },
    { id: 'omega3', name: 'Omega-3 & Joint Mobility', icon: '🐟', description: 'Protects joints, brain function, and reduces daily cellular inflammation', color: '#6B2D7B' },
    { id: 'iron', name: 'Iron & Blood Oxygenation', icon: '🩸', description: 'Improves stamina and prevents daily fatigue', color: '#DC143C' },
    { id: 'calcium', name: 'Calcium & Bone Health', icon: '🦴', description: 'Fortifies bone density and supports strength for daily activities', color: '#FFE135' },
    { id: 'fiber', name: 'Digestive Fiber & Gut Health', icon: '🌾', description: 'Ensures optimal digestion & gut microbiome health', color: '#90EE90' },
  ];

  readonly personas: PersonaTarget[] = [
    {
      id: 'ai-consultation',
      title: 'AI & Expert Nutritionist Customization',
      icon: '🧑‍⚕️',
      badge: '100% Personalized Meal Plan',
      subtitle: 'Our intelligent AI engine combined with expert nutritionists custom-curates your daily meal boxes based on your weight, activity, and health targets.',
      benefits: [
        'Free 1-on-1 Nutritionist macro assessment',
        'AI automated daily protein & calorie calculation',
        'Custom Veg, Non-Veg, & Eggetarian meal swapping',
        'Pause, adjust macros, or skip days anytime'
      ],
      suggestedPlan: '5-Day Trial / Monthly Plan',
      bgGradient: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
    },
    {
      id: 'fresh-daily',
      title: 'Chef-Cooked Freshness Delivered Daily',
      icon: '🥗',
      badge: 'Zero Cooking · Zero Prep',
      subtitle: 'No more meal prepping, grocery shopping, or washing dishes. Hot, delicious protein meal boxes delivered directly to your doorstep.',
      benefits: [
        'Freshly cooked daily by certified gourmet chefs',
        'Choice of Lunch, Dinner, or Morning delivery slots',
        '100% natural, high-quality ingredients & lean proteins',
        'Hassle-free subscription management'
      ],
      suggestedPlan: '5-Day Trial (₹1,495)',
      bgGradient: 'linear-gradient(135deg, #0F5132 0%, #0A3622 100%)'
    }
  ];

  readonly testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Balaji S.',
      role: 'Working Professional',
      incomeSegment: 'Essential Plan Subscriber',
      avatar: '👨‍💼',
      rating: 5,
      review: 'I tried the 5-Day Trial at ₹1,495 (₹299/day). The food taste is amazing and the protein portion is massive! Saved me so much time cooking every evening.',
      goal: 'Sustained Daily Energy',
      city: 'Pune'
    },
    {
      id: '2',
      name: 'Akshay K.',
      role: 'Fitness Enthusiast',
      incomeSegment: 'Essential Plan Subscriber',
      avatar: '🏋️‍♂️',
      rating: 5,
      review: 'EatSattva gives me 40g+ protein per meal effortlessly. The AI nutritionist consultation tailored my carb ratio perfectly for fat loss.',
      goal: 'High Protein & Fat Loss',
      city: 'Bangalore'
    },
    {
      id: '3',
      name: 'Rahul C.',
      role: 'Senior Project Lead',
      incomeSegment: 'Pro Plan Subscriber',
      avatar: '👔',
      rating: 5,
      review: 'The Pro Performance plan is a game changer! 48g clean protein every day right at lunch time. Zero slumps, pure energy.',
      goal: 'Lean Shred & Energy',
      city: 'Mumbai'
    },
    {
      id: '4',
      name: 'Danny P.',
      role: 'Business Consultant',
      incomeSegment: 'Elite Gourmet Plan Subscriber',
      avatar: '💼',
      rating: 5,
      review: 'The Atlantic Salmon and smoked chicken boxes are gourmet restaurant quality. Having an AI + nutritionist plan means my macros are always 100% on point.',
      goal: 'Gourmet High Protein',
      city: 'Delhi'
    }
  ];

  readonly pricingPlans: PricingPlan[] = [
    {
      id: '5-day-trial',
      name: '5-Day Trial Plan',
      description: 'Experience Gourmet High-Protein Quality for 5 Days',
      price: '₹1,495',
      priceSubtext: '₹299 / day × 5 days · Zero commitment',
      dailyPrice: '₹299/day',
      features: [
        '🔥 5 High-Protein Chef Gourmet Meal Boxes',
        '💪 Guaranteed 35g – 48g Protein per meal box',
        '🧑‍⚕️ Free AI & Nutritionist Meal Customization',
        '🥗 Veg, Non-Veg & Eggetarian options available',
        '🚚 Apply Scratch Code at checkout for Free Delivery!',
        '⚡ Convert to monthly subscription anytime'
      ],
      highlighted: true,
      badge: 'Flagship Starter Trial',
      cta: 'Claim 5-Day Trial (₹1,495)',
      targetedAudience: 'Everyone seeking high protein & healthy meals',
      isTrial: true
    },
    {
      id: 'essential-plan',
      name: 'Essential Protein Plan',
      description: 'Wholesome High-Protein Daily Meals for Everyone',
      price: '₹6,999',
      priceSubtext: 'per month (~₹233/day) · 30 Days',
      dailyPrice: '₹233/day',
      features: [
        '30 High-Protein Macro Meals (35g–40g Protein)',
        'Wholesome Paneer, Soya, Egg & Chicken combos',
        '🧑‍⚕️ 1-on-1 Expert Nutritionist Consultation',
        'Weekly menu rotation (never boring)',
        'Pause & resume delivery anytime'
      ],
      highlighted: false,
      badge: 'Popular Everyday Plan',
      cta: 'Subscribe Essential (₹6,999)',
      targetedAudience: 'Everyday Health Seekers',
      salaryRange: '₹50k to ₹80k budget'
    },
    {
      id: 'pro-plan',
      name: 'Pro Performance Plan',
      description: 'Optimized High Protein & Custom Macro Splits',
      price: '₹9,999',
      priceSubtext: 'per month (~₹333/day) · 30 Days',
      dailyPrice: '₹333/day',
      features: [
        '30 Premium Protein Meals (45g–50g Protein)',
        '🤖 AI-Powered Custom Carb & Protein Macro Ratios',
        '⚡ Priority lunch or dinner delivery slot',
        '🧑‍⚕️ Dedicated Nutritionist macro tracking',
        'Free BCAA & Protein shake booster on Saturdays'
      ],
      highlighted: false,
      badge: 'Advanced Macro Plan',
      cta: 'Subscribe Pro (₹9,999)',
      targetedAudience: 'Active Lifestyle & Fitness Enthusiasts',
      salaryRange: '₹80k to ₹1.30L budget'
    },
    {
      id: 'elite-plan',
      name: 'Elite Gourmet Plan',
      description: 'Gourmet Organic Protein & Dedicated Nutritionist',
      price: '₹14,999',
      priceSubtext: 'per month (~₹500/day) · 30 Days',
      dailyPrice: '₹500/day',
      features: [
        '30 Gourmet Organic Protein Meals (55g+ Protein)',
        'Atlantic Salmon, Smoked Turkey, Organic Tofu & Quinoa',
        '👑 VIP Priority Delivery Slot Window',
        'Zero-sugar high protein gourmet desserts included',
        'Dedicated Personal AI + Human Nutritionist Team'
      ],
      highlighted: false,
      badge: 'Gourmet Superfood Plan',
      cta: 'Subscribe Elite (₹14,999)',
      targetedAudience: 'Premium Health & Gourmet Seekers',
      salaryRange: '₹1.50L+ budget'
    }
  ];

  getFruitsByGoal(goalId: string): Fruit[] {
    return this.fruits.filter(f => f.goals.includes(goalId));
  }

  getFruitsByDeficiency(defId: string): Fruit[] {
    return this.fruits.filter(f => f.deficiencies.includes(defId));
  }

  getSeasonalFruits(): Fruit[] {
    return this.fruits;
  }

  calculateBoxPrice(fruits: Fruit[]): number {
    return fruits.reduce((sum, f) => sum + f.pricePerKg, 0);
  }
}
