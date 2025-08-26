import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltySection = ({ loyaltyData }) => {
  const progressPercentage = (loyaltyData?.currentPoints / loyaltyData?.nextTierPoints) * 100;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Loyalty Rewards</h3>
          <p className="text-white/90 text-sm">Current Tier: {loyaltyData?.currentTier}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Award" size={24} color="white" />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{loyaltyData?.currentPoints} points</span>
          <span className="text-sm text-white/80">Next tier: {loyaltyData?.nextTierPoints}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{loyaltyData?.totalSaved}</p>
          <p className="text-xs text-white/80">Total Saved</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{loyaltyData?.referrals}</p>
          <p className="text-xs text-white/80">Referrals</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="secondary" size="sm" className="flex-1">
          <Icon name="Gift" size={14} className="mr-1" />
          Redeem Points
        </Button>
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Icon name="Share" size={14} className="mr-1" />
          Refer Friends
        </Button>
      </div>
    </div>
  );
};

export default LoyaltySection;