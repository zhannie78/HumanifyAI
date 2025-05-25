import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { pricingTiers } from '../data/pricing';
import { CreditCard, Lock } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { user, profile, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedPlan, setSelectedPlan] = useState(location.state?.planId || 'basic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { returnTo: '/payment' } });
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get selected plan details
      const plan = pricingTiers.find(p => p.id === selectedPlan);
      
      if (plan && profile) {
        // Update user's profile with the new plan and credits
        await updateProfile({
          plan: plan.id,
          credits: profile.credits + plan.credits
        });
      }
      
      setIsComplete(true);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Get current plan details
  const currentPlan = pricingTiers.find(p => p.id === profile?.plan);
  const planDetails = pricingTiers.find(p => p.id === selectedPlan);
  
  // Show success page after payment
  if (isComplete) {
    return (
      <Layout>
        <div className="bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
                <p className="mt-2 text-gray-600">
                  Thank you for your purchase. Your credits have been added to your account.
                </p>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Your current plan</p>
                  <p className="text-lg font-bold text-gray-900">{planDetails?.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You now have {profile?.credits} credits available
                  </p>
                </div>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Purchase Credits</h1>
            <p className="mt-2 text-lg text-gray-600">
              Select a plan and enter your payment details to add credits to your account.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Plan
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={handlePlanChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    >
                      {pricingTiers.filter(plan => plan.id !== 'free').map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} - ${plan.price}/{plan.priceUnit} ({plan.credits} credits)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Card Information
                      </label>
                      <div className="flex items-center text-sm text-gray-500">
                        <Lock size={14} className="mr-1" />
                        Secure payment
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        leftIcon={<CreditCard size={16} />}
                      />
                      
                      <Input
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="Name on card"
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM / YY"
                          required
                        />
                        <Input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="CVV"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isProcessing}
                  >
                    Pay ${planDetails?.price}
                  </Button>
                  
                  <p className="mt-4 text-center text-xs text-gray-500">
                    This is a demo payment form. No actual payment will be processed.
                  </p>
                </form>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-24">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{planDetails?.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${planDetails?.price}/{planDetails?.priceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credits:</span>
                    <span className="font-medium">{planDetails?.credits}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${planDetails?.price}</span>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600">
                    Current balance: <span className="font-medium">{profile?.credits} credits</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Current plan: <span className="font-medium">{currentPlan?.name || 'Free'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;