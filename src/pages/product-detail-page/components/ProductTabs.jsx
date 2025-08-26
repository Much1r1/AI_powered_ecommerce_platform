import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'returns', label: 'Returns', icon: 'RotateCcw' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose max-w-none">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
              {product?.features && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'specifications':
        return (
          <div className="space-y-4">
            {product?.specifications && Object.entries(product?.specifications)?.map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        );
      
      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Icon name="Truck" size={18} className="mr-2" />
                  Shipping Options
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Standard Shipping</span>
                    <span className="font-medium">5-7 business days - Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Express Shipping</span>
                    <span className="font-medium">2-3 business days - $9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Day Delivery</span>
                    <span className="font-medium">1 business day - $19.99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Delivery Information
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Free shipping on orders over $50</p>
                  <p>• Ships from our warehouse in California</p>
                  <p>• Tracking information provided via email</p>
                  <p>• Signature required for orders over $200</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'returns':
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Shield" size={18} className="mr-2" />
                30-Day Return Policy
              </h4>
              <p className="text-muted-foreground text-sm">
                We offer a hassle-free 30-day return policy. Items must be in original condition with tags attached.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Return Process:</h4>
              <div className="space-y-2">
                {[
                  "Contact our customer service team",
                  "Receive return authorization and shipping label",
                  "Package item securely with original packaging",
                  "Drop off at any authorized shipping location",
                  "Refund processed within 5-7 business days"
                ]?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="min-h-[200px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;