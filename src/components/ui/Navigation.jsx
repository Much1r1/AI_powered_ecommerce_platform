import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Button from './Button';

const Navigation = () => {
  const router = useRouter();
  const [cartItemCount] = useState(3);

  const navigationItems = [
    {
      label: 'Shop',
      path: '/product-catalog-search',
      icon: 'Store',
      tooltip: 'Browse products and search'
    },
    {
      label: 'Cart',
      path: '/shopping-cart-checkout',
      icon: 'ShoppingCart',
      tooltip: 'View cart and checkout',
      badge: cartItemCount
    },
    {
      label: 'Account',
      path: '/customer-dashboard',
      icon: 'User',
      tooltip: 'Manage your account'
    }
  ];

  const handleNavigation = (path) => {
    router?.push(path);
  };

  const isActivePath = (path) => {
    if (path === '/product-catalog-search') {
      return router?.pathname === '/product-catalog-search' || router?.pathname === '/product-detail-page';
    }
    return router?.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-16 lg:top-20 left-0 right-0 z-90 bg-card border-b border-border nav-shadow">
        <div className="flex items-center justify-center px-6 py-3">
          <div className="flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="relative micro-scale"
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
                {item?.badge && item?.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {item?.badge > 9 ? '9+' : item?.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </nav>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-90 bg-card border-t border-border nav-shadow">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className={`relative flex-col h-auto py-2 px-3 micro-scale ${
                isActivePath(item?.path) 
                  ? 'text-primary bg-primary/10' :'text-muted-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className="text-xs mt-1 font-medium">
                {item?.label}
              </span>
              {item?.badge && item?.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {item?.badge > 9 ? '9+' : item?.badge}
                </span>
              )}
            </Button>
          ))}
        </div>
      </nav>
      {/* Navigation Spacers */}
      <div className="hidden md:block h-14" />
      <div className="md:hidden h-16" />
    </>
  );
};

export default Navigation;