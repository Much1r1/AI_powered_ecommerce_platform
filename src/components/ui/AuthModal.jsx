import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const router = useRouter();
  const [mode, setMode] = useState(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        agreeToTerms: false
      });
      setErrors({});
    }
  }, [isOpen, defaultMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData?.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router?.push('/customer-dashboard');
    }, 1500);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    // Simulate social auth
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router?.push('/customer-dashboard');
    }, 1000);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-lg card-elevation animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'login' ?'Sign in to your account to continue' :'Join AI Commerce Hub today'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('google')}
              disabled={isLoading}
              className="justify-center"
            >
              <Icon name="Chrome" size={18} className="mr-2" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialAuth('facebook')}
              disabled={isLoading}
              className="justify-center"
            >
              <Icon name="Facebook" size={18} className="mr-2" />
              Continue with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  error={errors?.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                  error={errors?.lastName}
                  required
                />
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
            />

            {mode === 'register' && (
              <>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  required
                />

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData?.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors?.agreeToTerms && (
                  <p className="text-sm text-error">{errors?.agreeToTerms}</p>
                )}
              </>
            )}

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="mt-6"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;