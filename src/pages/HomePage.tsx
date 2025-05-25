import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import RewriterTool from '../components/home/RewriterTool';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <RewriterTool />
      <CTASection />
    </Layout>
  );
};

export default HomePage;