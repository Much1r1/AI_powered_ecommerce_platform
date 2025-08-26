import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthForm from './components/AuthForm';
import SocialAuth from './components/SocialAuth';
import TrustSignals from './components/TrustSignals';
import HeroSection from './components/HeroSection';
import AuthTabs from './components/AuthTabs';

const LoginRegistration = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState('login');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check URL parameters for initial mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams?.get('mode');
    if (mode === 'register') {
      setAuthMode('register');
    }
  }, []);

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    // Update URL without page reload
    const newUrl = mode === 'register' ? '?mode=register' : '/login-registration';
    window.history?.replaceState({}, '', newUrl);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const handleLogoClick = () => {
    router?.push('/product-catalog-search');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 micro-scale"
            aria-label="AI Commerce Hub - Go to home"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              AI Commerce Hub
            </span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageChange('en')}
              className={currentLanguage === 'en' ? 'bg-primary/10 text-primary' : ''}
            >
              EN
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageChange('es')}
              className={currentLanguage === 'es' ? 'bg-primary/10 text-primary' : ''}
            >
              ES
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="lg:grid lg:grid-cols-12 lg:min-h-[calc(100vh-4rem)]">
          {/* Hero Section - Desktop Only */}
          <div className="lg:col-span-6">
            <HeroSection />
          </div>

          {/* Authentication Section */}
          <div className="lg:col-span-6 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Mobile Hero Info */}
              <div className="lg:hidden text-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShoppingBag" size={32} color="white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  AI Commerce Hub
                </h1>
                <p className="text-muted-foreground">
                  Your intelligent shopping companion
                </p>
              </div>

              {/* Auth Tabs */}
              <AuthTabs 
                activeMode={authMode} 
                onModeChange={handleModeChange} 
              />

              {/* Social Authentication */}
              <div className="mb-6">
                <SocialAuth />
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Auth Form */}
              <AuthForm 
                mode={authMode} 
                onModeChange={() => handleModeChange(authMode === 'login' ? 'register' : 'login')} 
              />

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <a href="#" className="hover:text-foreground transition-colors">
                Help Center
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} AI Commerce Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginRegistration;