import React from 'react';
import { ShieldCheck, Zap, FileText, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <RefreshCw size={24} className="text-primary-500" />,
    title: 'AI Humanizer',
    description: 'Transform robotic AI-generated text into natural, human-like content that connects with your audience.'
  },
  {
    icon: <ShieldCheck size={24} className="text-primary-500" />,
    title: 'Bypass AI Detectors',
    description: 'Our humanized content naturally passes through AI detection tools while maintaining your original message.'
  },
  {
    icon: <Zap size={24} className="text-primary-500" />,
    title: 'Instant Results',
    description: 'Get humanized content in seconds, allowing you to focus on creating rather than editing.'
  },
  {
    icon: <FileText size={24} className="text-primary-500" />,
    title: 'Save Your Work',
    description: 'Store all your humanized content in your personal dashboard for easy access and future reference.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose HumanifyAI?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our powerful tools help you create content that sounds authentically human.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;