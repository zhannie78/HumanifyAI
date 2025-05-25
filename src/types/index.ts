export interface User {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
}

export interface UserProfile extends User {
  credits: number;
  plan: SubscriptionPlan;
}

export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';

export interface Project {
  id: string;
  userId: string;
  title: string;
  originalText: string;
  humanizedText: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingTier {
  id: SubscriptionPlan;
  name: string;
  price: number;
  priceUnit: string;
  description: string;
  features: string[];
  credits: number;
  recommended?: boolean;
}