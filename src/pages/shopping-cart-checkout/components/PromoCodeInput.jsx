import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PromoCodeInput = ({ onApplyPromo, appliedPromo, onRemovePromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApplyPromo = async (e) => {
    e?.preventDefault();
    if (!promoCode?.trim()) return;

    setIsApplying(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      const validCodes = ['SAVE10', 'WELCOME20', 'FREESHIP'];
      
      if (validCodes?.includes(promoCode?.toUpperCase())) {
        const discount = promoCode?.toUpperCase() === 'SAVE10' ? 10 : 
                        promoCode?.toUpperCase() === 'WELCOME20' ? 20 : 0;
        const freeShipping = promoCode?.toUpperCase() === 'FREESHIP';
        
        onApplyPromo({
          code: promoCode?.toUpperCase(),
          discount,
          freeShipping,
          description: promoCode?.toUpperCase() === 'SAVE10' ? '10% off your order' :
                      promoCode?.toUpperCase() === 'WELCOME20'? '20% off your order' : 'Free shipping on your order'
        });
        
        setSuccess('Promo code applied successfully!');
        setPromoCode('');
      } else {
        setError('Invalid promo code. Please try again.');
      }
      
      setIsApplying(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    onRemovePromo();
    setSuccess('');
    setError('');
  };

  if (appliedPromo) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-success">
            <Icon name="Tag" size={16} className="mr-2" />
            <div>
              <span className="font-medium text-sm">
                {appliedPromo?.code}
              </span>
              <p className="text-xs text-success/80">
                {appliedPromo?.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemovePromo}
            className="text-success hover:text-success hover:bg-success/10"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Icon name="Tag" size={16} className="mr-2 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          Have a promo code?
        </span>
      </div>
      <form onSubmit={handleApplyPromo} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
            className="flex-1"
            error={error}
          />
          <Button
            type="submit"
            variant="outline"
            loading={isApplying}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>

        {error && (
          <div className="flex items-center text-error text-sm">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center text-success text-sm">
            <Icon name="CheckCircle" size={14} className="mr-1" />
            {success}
          </div>
        )}
      </form>
      {/* Available Promo Codes Hint */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Try these codes:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">
            SAVE10
          </span>
          <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">
            WELCOME20
          </span>
          <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">
            FREESHIP
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeInput;