import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardSidebar = ({ activeTab, onTabChange, notificationCounts }) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      count: null
    },
    {
      id: 'orders',
      label: 'Order History',
      icon: 'Package',
      count: notificationCounts?.orders
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'Heart',
      count: notificationCounts?.wishlist
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin',
      count: null
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: 'CreditCard',
      count: null
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      count: notificationCounts?.notifications
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'Settings',
      count: null
    },  
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-fit sticky top-6">
      <div className="space-y-2">
        {menuItems?.map((item) => (
          <Button
            key={item?.id}
            variant={activeTab === item?.id ? "default" : "ghost"}
            onClick={() => onTabChange(item?.id)}
            className="w-full justify-start relative"
          >
            <Icon name={item?.icon} size={18} className="mr-3" />
            <span className="flex-1 text-left">{item?.label}</span>
            {item?.count && item?.count > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center ml-2">
                {item?.count > 99 ? '99+' : item?.count}
              </span>
            )}
          </Button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Headphones" size={24} className="text-primary" />
          </div>
          <h4 className="font-medium mb-2">Need Help?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Our AI assistant is here to help you 24/7
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Icon name="MessageCircle" size={14} className="mr-2" />
            Chat Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;