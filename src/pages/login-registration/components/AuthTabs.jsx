import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeMode, onModeChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', description: 'Access your account' },
    { id: 'register', label: 'Sign Up', description: 'Create new account' }
  ];

  return (
    <div className="mb-8">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeMode === tab?.id ? "default" : "ghost"}
            onClick={() => onModeChange(tab?.id)}
            className={`flex-1 h-12 transition-all duration-200 ${
              activeMode === tab?.id 
                ? 'shadow-sm' 
                : 'hover:bg-background/50'
            }`}
          >
            <div className="text-center">
              <div className="font-medium">{tab?.label}</div>
              <div className="text-xs opacity-80">{tab?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;