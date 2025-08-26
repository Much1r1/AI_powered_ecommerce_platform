import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, recentOrder }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {user?.firstName}!
          </h1>
          <p className="text-white/90 mb-4">
            Welcome back to your AI Commerce Hub dashboard
          </p>
          {recentOrder && (
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Package" size={20} color="white" />
                </div>
                <div>
                  <p className="font-medium">Recent Order #{recentOrder?.id}</p>
                  <p className="text-sm text-white/80">{recentOrder?.status} • {recentOrder?.items} items</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="User" size={40} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;