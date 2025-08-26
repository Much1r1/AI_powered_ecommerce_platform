import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({ activeFilters, onQuickFilterToggle }) => {
  const quickFilters = [
    {
      id: 'onSale',
      label: 'On Sale',
      icon: 'Tag',
      count: 156
    },
    {
      id: 'freeShipping',
      label: 'Free Shipping',
      icon: 'Truck',
      count: 234
    },
    {
      id: 'inStock',
      label: 'In Stock',
      icon: 'Package',
      count: 567
    },
    {
      id: 'newArrivals',
      label: 'New Arrivals',
      icon: 'Sparkles',
      count: 89
    },
    {
      id: 'topRated',
      label: 'Top Rated',
      icon: 'Star',
      count: 123
    }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">
            Quick Filters:
          </span>
          {quickFilters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={activeFilters?.includes(filter?.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onQuickFilterToggle(filter?.id)}
              className="whitespace-nowrap flex-shrink-0"
            >
              <Icon name={filter?.icon} size={14} className="mr-1" />
              {filter?.label}
              <span className="ml-1 text-xs opacity-75">
                ({filter?.count})
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;