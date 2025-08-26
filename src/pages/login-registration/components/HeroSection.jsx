import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const features = [
    {
      icon: 'Sparkles',
      title: 'AI-Powered Recommendations',
      description: 'Discover products tailored just for you with our intelligent recommendation engine'
    },
    {
      icon: 'ShoppingBag',
      title: 'Seamless Shopping',
      description: 'Enjoy a smooth, intuitive shopping experience across all your devices'
    },
    {
      icon: 'Headphones',
      title: '24/7 AI Support',
      description: 'Get instant help from our AI chatbot or connect with human support anytime'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center h-full bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
      <div className="max-w-lg">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
            <Icon name="ShoppingBag" size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Welcome to the Future of Shopping
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience AI-powered e-commerce that understands your preferences and delivers personalized shopping experiences like never before.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-64 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Modern shopping experience with AI technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="mt-6 flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span>50K+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-success" />
            <span>Trusted Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;