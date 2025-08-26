import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthForm = ({ mode, onModeChange }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: "demo@aicommercehub.com",
    password: "demo123"
  };

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
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Mock authentication check
    if (mode === 'login') {
      if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
        setErrors({ 
          general: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}` 
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router?.push('/customer-dashboard');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'login' ?'Sign in to access your personalized shopping experience' :'Join thousands of satisfied customers today'
          }
        </p>
      </div>
      {errors?.general && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              error={errors?.firstName}
              required
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
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
          placeholder="Enter your email address"
          error={errors?.email}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {mode === 'register' && (
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
        )}

        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={() => {/* Handle forgot password */}}
            >
              Forgot password?
            </button>
          </div>
        )}

        {mode === 'register' && (
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/80 underline">
                  Privacy Policy
                </a>
              </span>
            }
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required
          />
        )}

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          className="h-12"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={onModeChange}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;