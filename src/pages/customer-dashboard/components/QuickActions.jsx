import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ stats }) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'reorder',
      label: 'Reorder Favorites',
      icon: 'RotateCcw',
      color: 'bg-emerald-500',
      onClick: () => navigate('/product-catalog-search?filter=favorites')
    },
    {
      id: 'track',
      label: 'Track Orders',
      icon: 'MapPin',
      color: 'bg-blue-500',
      count: stats?.activeOrders
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      icon: 'Heart',
      color: 'bg-pink-500',
      count: stats?.wishlistItems
    },
    {
      id: 'support',
      label: 'Get Help',
      icon: 'HelpCircle',
      color: 'bg-purple-500',
      onClick: () => navigate('/ai-chat-support')
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {actions?.map((action) => (
        <Button
          key={action?.id}
          variant="outline"
          onClick={action?.onClick}
          className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
        >
          <div className={`w-12 h-12 ${action?.color} rounded-full flex items-center justify-center relative`}>
            <Icon name={action?.icon} size={24} color="white" />
            {action?.count && action?.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {action?.count > 99 ? '99+' : action?.count}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-center">{action?.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;