import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold">Ready to Humanize Your AI Content?</h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands of content creators who are already making their AI-generated content sound more authentic.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-secondary-600 hover:bg-gray-100"
            onClick={() => navigate('/signup')}
            rightIcon={<ArrowRight size={18} />}
          >
            Start Free Trial
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate('/pricing')}
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;