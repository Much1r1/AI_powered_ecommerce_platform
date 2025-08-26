import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick, isLoading }) => {
  const quickActions = [
    {
      id: 'track-order',
      label: 'Track Order',
      icon: 'Package',
      description: 'Check your order status'
    },
    {
      id: 'return-policy',
      label: 'Returns',
      icon: 'RotateCcw',
      description: 'Return & refund info'
    },
    {
      id: 'product-help',
      label: 'Product Help',
      icon: 'HelpCircle',
      description: 'Product questions'
    },
    {
      id: 'account-help',
      label: 'Account',
      icon: 'User',
      description: 'Account assistance'
    }
  ];

  const commonQueries = [
    "Where is my order?",
    "How do I return an item?",
    "What\'s your shipping policy?",
    "I need help with my account"
  ];

  return (
    <div className="p-4 border-t border-border bg-muted/30">
      <div className="space-y-4">
        {/* Quick Action Buttons */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Help</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions?.map((action) => (
              <Button
                key={action?.id}
                variant="outline"
                size="sm"
                onClick={() => onActionClick(action?.id, action?.label)}
                disabled={isLoading}
                className="flex flex-col items-center p-3 h-auto text-center"
              >
                <Icon name={action?.icon} size={18} className="mb-1" />
                <span className="text-xs font-medium">{action?.label}</span>
                <span className="text-xs text-muted-foreground">
                  {action?.description}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Common Queries */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">
            Common Questions
          </h4>
          <div className="space-y-2">
            {commonQueries?.map((query, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => onActionClick('query', query)}
                disabled={isLoading}
                className="w-full justify-start text-left h-auto p-2"
              >
                <Icon name="MessageSquare" size={14} className="mr-2 flex-shrink-0" />
                <span className="text-xs">{query}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;