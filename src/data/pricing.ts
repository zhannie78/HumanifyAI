import { PricingTier } from '../types';

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceUnit: 'forever',
    description: 'Perfect for trying out our services',
    features: [
      '5 Credits',
      'Basic AI Humanizer',
      'Limited History (7 days)',
      'Standard Support'
    ],
    credits: 5
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    priceUnit: 'month',
    description: 'Great for occasional use',
    features: [
      '150 Credits per month',
      'Advanced AI Humanizer',
      'Full History',
      'Priority Support',
      'Download as PDF',
      'Plagiarism Detection (5/mo)'
    ],
    credits: 150
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    priceUnit: 'month',
    description: 'Ideal for regular content creators',
    features: [
      '500 Credits per month',
      'Premium AI Humanizer',
      'Full History',
      'Priority Support',
      'Download in multiple formats',
      'Unlimited Plagiarism Detection',
      'Advanced Style Controls',
      'Tone Adjustment'
    ],
    credits: 500,
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    priceUnit: 'month',
    description: 'For professional and business use',
    features: [
      '2000 Credits per month',
      'Enterprise AI Humanizer',
      'Unlimited History',
      'Dedicated Support',
      'API Access',
      'Advanced Analytics',
      'Team Collaboration',
      'Custom Branding',
      'Priority Processing',
      'Custom Style Guides'
    ],
    credits: 2000
  }
];