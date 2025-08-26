import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Users',
      title: '50,000+ Happy Customers',
      description: 'Join thousands of satisfied shoppers worldwide'
    },
    {
      icon: 'Award',
      title: 'Trusted Platform',
      description: 'Verified by leading security organizations'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              {feature?.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;