import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Make Your AI Text Sound Human Again
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-50 max-w-lg">
              HumanifyAI instantly transforms robotic AI-generated content into natural, 
              human-like text that engages readers and bypasses AI detection.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => navigate('/auth')}
                rightIcon={<ArrowRight size={18} />}
              >
                Try for Free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const element = document.getElementById('rewriter-tool');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Try Demo
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-1 animate-slideUp">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">TextEase Editor</div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded p-4 text-gray-800">
                  <p className="text-sm">
                    <span className="text-gray-400">// AI-generated text</span><br />
                    The utilization of artificial intelligence in content creation has witnessed a significant surge in recent years, with numerous organizations adopting these technologies to enhance productivity and streamline operations.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-green-50 rounded p-4 text-gray-800 border-l-4 border-green-500">
                  <p className="text-sm">
                    <span className="text-green-500">// Human-like text</span><br />
                    AI for content creation has boomed lately. Many companies now use these tools to work faster and more efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;