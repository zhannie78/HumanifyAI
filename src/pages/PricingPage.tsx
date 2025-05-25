import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Check } from 'lucide-react';
import { pricingTiers } from '../data/pricing';
import { useAuthStore } from '../store/authStore';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate('/payment', { state: { planId } });
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your needs. All plans include access to our AI Humanizer tool.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                  tier.recommended ? 'border-primary-500' : 'border-gray-200'
                } transform hover:scale-105 transition-transform duration-300`}
              >
                {tier.recommended && (
                  <div className="bg-primary-500 text-white text-center py-1 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                    <span className="ml-1 text-xl font-medium text-gray-500">/{tier.priceUnit}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">{tier.description}</p>
                  
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={20} className="flex-shrink-0 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button
                      variant={tier.recommended ? "primary" : "outline"}
                      fullWidth
                      onClick={() => handleSelectPlan(tier.id)}
                    >
                      {user 
                        ? profile?.plan === tier.id 
                          ? 'Current Plan' 
                          : 'Select Plan'
                        : 'Get Started'
                      }
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What happens when I run out of credits?
                </h3>
                <p className="text-gray-600">
                  You can purchase additional credits or upgrade your plan at any time. Your saved projects will always remain accessible.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do credits roll over?
                </h3>
                <p className="text-gray-600">
                  Credits expire at the end of your billing cycle. Each new billing cycle resets your available credits to your plan's allocation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes! Our free plan includes 3 credits so you can try our service before committing to a paid plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;