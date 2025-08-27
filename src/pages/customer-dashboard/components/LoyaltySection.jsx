import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LoyaltySection = ({ loyaltyData }) => {
  const [points, setPoints] = useState(loyaltyData?.currentPoints || 0);

  const progressPercentage = (points / loyaltyData?.nextTierPoints) * 100;

  const tierColors = {
    Gold: "from-yellow-400 to-yellow-600",
    Silver: "from-gray-300 to-gray-500",
    Diamond: "from-indigo-400 to-purple-600",
    Platinum: "from-teal-400 to-blue-600",
    Normal: "from-slate-400 to-slate-600",
  };

  const bgClass = tierColors[loyaltyData?.currentTier] || tierColors.Normal;

  const handleRefer = () => {
    const referralLink = `https://aicommercehub.com/referral/${loyaltyData?.userId || "guest"}`;
    navigator.clipboard.writeText(referralLink);
    alert(`Your referral link has been copied!\n\n${referralLink}`);
  };

  const handleRedeem = () => {
    if (points >= 100) {
      setPoints(points - 100);
      alert("🎉 You redeemed 100 points for rewards!");
    } else {
      alert("⚠️ You need at least 100 points to redeem.");
    }
  };

  return (
    <div className={`bg-gradient-to-r ${bgClass} text-white rounded-lg p-6 mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Loyalty Rewards</h3>
          <p className="text-white/90 text-sm">
            Current Tier: {loyaltyData?.currentTier}
          </p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Award" size={24} color="white" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{points} points</span>
          <span className="text-sm text-white/80">
            Next tier: {loyaltyData?.nextTierPoints}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats */}
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

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={handleRedeem}
        >
          <Icon name="Gift" size={14} className="mr-1" />
          Redeem Points
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefer}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Icon name="Share" size={14} className="mr-1" />
          Refer Friends
        </Button>
      </div>
    </div>
  );
};

export default LoyaltySection;
