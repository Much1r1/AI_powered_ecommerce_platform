import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderReview = ({ 
  cartItems, 
  shippingInfo, 
  paymentInfo, 
  orderSummary, 
  onEdit, 
  onPlaceOrder,
  isProcessing 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const formatAddress = (address) => {
    return `${address?.address}${address?.apartment ? `, ${address?.apartment}` : ''}, ${address?.city}, ${address?.state} ${address?.zipCode}`;
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'mpesa':
        return 'M-Pesa';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Items Review */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Order Items ({cartItems?.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('cart')}
          >
            <Icon name="Edit" size={16} className="mr-1" />
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm line-clamp-1">
                  {item?.name}
                </h3>
                {item?.variant && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item?.variant}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Qty: {item?.quantity}
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-foreground text-sm">
                  {formatPrice(item?.price * item?.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Shipping Information
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('shipping')}
          >
            <Icon name="Edit" size={16} className="mr-1" />
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-medium text-foreground">
              {shippingInfo?.firstName} {shippingInfo?.lastName}
            </p>
            {shippingInfo?.email && (
              <p className="text-sm text-muted-foreground">
                {shippingInfo?.email}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {shippingInfo?.phone}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {formatAddress(shippingInfo)}
            </p>
          </div>
        </div>
      </div>
      {/* Payment Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Payment Information
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('payment')}
          >
            <Icon name="Edit" size={16} className="mr-1" />
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Icon 
              name={paymentInfo?.paymentMethod === 'card' ? 'CreditCard' : 
                   paymentInfo?.paymentMethod === 'paypal' ? 'Wallet' : 'Smartphone'} 
              size={20} 
              className="mr-3 text-muted-foreground" 
            />
            <span className="font-medium text-foreground">
              {getPaymentMethodDisplay(paymentInfo?.paymentMethod)}
            </span>
          </div>

          {paymentInfo?.paymentMethod === 'card' && paymentInfo?.cardData && (
            <div className="ml-8">
              <p className="text-sm text-muted-foreground">
                •••• •••• •••• {paymentInfo?.cardData?.cardNumber?.slice(-4)}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {paymentInfo?.cardData?.expiryDate}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">
              {formatPrice(orderSummary?.subtotal)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-foreground">
              {orderSummary?.shipping === 0 ? 'Free' : formatPrice(orderSummary?.shipping)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium text-foreground">
              {formatPrice(orderSummary?.tax)}
            </span>
          </div>

          {orderSummary?.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span className="font-medium">
                -{formatPrice(orderSummary?.discount)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(orderSummary?.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="Info" size={16} className="mr-2 mt-0.5 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <p>
              By placing this order, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              You will receive an order confirmation email shortly after your purchase.
            </p>
          </div>
        </div>
      </div>
      {/* Place Order Button */}
      <Button
        onClick={onPlaceOrder}
        fullWidth
        loading={isProcessing}
        className="text-lg py-4"
      >
        {isProcessing ? 'Processing Order...' : `Place Order - ${formatPrice(orderSummary?.total)}`}
      </Button>
    </div>
  );
};

export default OrderReview;