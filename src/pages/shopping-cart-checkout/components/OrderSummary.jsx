import React from 'react';
import Icon from '../../../components/AppIcon';


const OrderSummary = ({ 
  items, 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  promoCode, 
  isSticky = false 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const summaryClass = isSticky 
    ? "sticky top-24 bg-card border border-border rounded-lg p-6 card-elevation" :"bg-card border border-border rounded-lg p-6";

  return (
    <div className={summaryClass}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Order Summary
      </h3>
      {/* Items Count */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
        <span className="text-sm text-muted-foreground">
          {items?.length} {items?.length === 1 ? 'item' : 'items'}
        </span>
        <span className="text-sm font-medium text-foreground">
          {formatPrice(subtotal)}
        </span>
      </div>
      {/* Cost Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-sm font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Shipping</span>
          <span className="text-sm font-medium text-foreground">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tax</span>
          <span className="text-sm font-medium text-foreground">
            {formatPrice(tax)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <div className="flex items-center">
              <Icon name="Tag" size={14} className="mr-1" />
              <span className="text-sm">
                Discount {promoCode && `(${promoCode})`}
              </span>
            </div>
            <span className="text-sm font-medium">
              -{formatPrice(discount)}
            </span>
          </div>
        )}
      </div>
      {/* Total */}
      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-foreground">
            {formatPrice(total)}
          </span>
        </div>

        {/* Savings */}
        {discount > 0 && (
          <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center text-success">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              <span className="text-sm font-medium">
                You saved {formatPrice(discount)}!
              </span>
            </div>
          </div>
        )}

        {/* Free Shipping Threshold */}
        {shipping > 0 && subtotal < 75 && (
          <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center text-accent">
              <Icon name="Truck" size={16} className="mr-2" />
              <span className="text-sm">
                Add {formatPrice(75 - subtotal)} more for free shipping
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Trust Signals */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center text-muted-foreground">
            <Icon name="Shield" size={14} className="mr-2" />
            <span className="text-xs">Secure SSL encrypted checkout</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Icon name="RotateCcw" size={14} className="mr-2" />
            <span className="text-xs">30-day money-back guarantee</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Icon name="Truck" size={14} className="mr-2" />
            <span className="text-xs">Free returns on all orders</span>
          </div>
        </div>
      </div>
      {/* Payment Icons */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} />
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">PP</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">MP</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Secure payment processing
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;