import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount] = useState(3);
  const [isAuthenticated] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      router?.push(`/product-catalog-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = () => {
    router?.push('/product-catalog-search');
  };

  const handleCartClick = () => {
    router?.push('/shopping-cart-checkout');
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      router?.push('/customer-dashboard');
    } else {
      router?.push('/login-registration');
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border nav-shadow">
        <div className="flex items-center h-16 lg:h-20 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 micro-scale"
              aria-label="AI Commerce Hub - Go to home"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg lg:text-xl font-semibold text-foreground">
                  AI Commerce Hub
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4"
                />
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileSearch}
              className="md:hidden"
              aria-label="Toggle search"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative micro-scale"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAccountClick}
              className="micro-scale"
              aria-label={isAuthenticated ? "Go to account dashboard" : "Sign in to your account"}
            >
              <Icon name={isAuthenticated ? "User" : "LogIn"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="md:hidden border-t border-border bg-card p-4 animate-slide-in-from-top">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-12"
                  autoFocus
                />
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  aria-label="Close search"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </form>
          </div>
        )}
      </header>
      {/* Header Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;