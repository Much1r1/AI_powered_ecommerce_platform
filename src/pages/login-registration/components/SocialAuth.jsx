import React, { useState } from 'react';
import { useNavigate as useRouter } from "react-router-dom";
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialAuth = () => {
  const router = useRouter();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      name: 'google',
      label: 'Continue with Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      name: 'facebook',
      label: 'Continue with Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      name: 'apple',
      label: 'Continue with Apple',
      icon: 'Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider);
    
    // Simulate social authentication
    setTimeout(() => {
      setLoadingProvider(null);
      router?.push('/customer-dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.name}
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth(provider?.name)}
          loading={loadingProvider === provider?.name}
          disabled={loadingProvider && loadingProvider !== provider?.name}
          className={`h-12 justify-center ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} hover:opacity-90 transition-opacity`}
        >
          <Icon name={provider?.icon} size={20} className="mr-3" />
          {provider?.label}
        </Button>
      ))}
    </div>
  );
};

export default SocialAuth;