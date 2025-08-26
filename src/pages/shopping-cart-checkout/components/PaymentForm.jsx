import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentForm = ({ onSubmit, orderTotal }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'mpesa', name: 'M-Pesa', icon: 'Smartphone' }
  ];

  const handleCardInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value?.replace(/\s/g, '')?.replace(/(.{4})/g, '$1 ')?.trim();
      if (formattedValue?.length > 19) return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value?.replace(/\D/g, '')?.replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue?.length > 5) return;
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value?.replace(/\D/g, '');
      if (formattedValue?.length > 4) return;
    }

    setCardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardData?.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
      if (!cardData?.cardNumber || cardData?.cardNumber?.replace(/\s/g, '')?.length < 16) {
        newErrors.cardNumber = 'Valid card number is required';
      }
      if (!cardData?.expiryDate || cardData?.expiryDate?.length < 5) {
        newErrors.expiryDate = 'Valid expiry date is required';
      }
      if (!cardData?.cvv || cardData?.cvv?.length < 3) {
        newErrors.cvv = 'Valid CVV is required';
      }

      if (!billingAddress?.sameAsShipping) {
        if (!billingAddress?.address) newErrors.billingAddress = 'Billing address is required';
        if (!billingAddress?.city) newErrors.billingCity = 'City is required';
        if (!billingAddress?.zipCode) newErrors.billingZip = 'ZIP code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validatePayment()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      onSubmit({
        paymentMethod,
        cardData: paymentMethod === 'card' ? cardData : null,
        billingAddress
      });
      setIsProcessing(false);
    }, 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Icon name="CreditCard" size={20} className="mr-3 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Payment Information
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentMethods?.map((method) => (
              <button
                key={method?.id}
                type="button"
                onClick={() => setPaymentMethod(method?.id)}
                className={`
                  p-4 border rounded-lg text-left transition-all micro-scale
                  ${paymentMethod === method?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center">
                  <Icon 
                    name={method?.icon} 
                    size={20} 
                    className={paymentMethod === method?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className="ml-3 font-medium text-sm">
                    {method?.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <Input
              label="Cardholder Name"
              name="cardholderName"
              value={cardData?.cardholderName}
              onChange={handleCardInputChange}
              error={errors?.cardholderName}
              placeholder="Name on card"
              required
            />

            <Input
              label="Card Number"
              name="cardNumber"
              value={cardData?.cardNumber}
              onChange={handleCardInputChange}
              error={errors?.cardNumber}
              placeholder="1234 5678 9012 3456"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                name="expiryDate"
                value={cardData?.expiryDate}
                onChange={handleCardInputChange}
                error={errors?.expiryDate}
                placeholder="MM/YY"
                required
              />
              <Input
                label="CVV"
                name="cvv"
                value={cardData?.cvv}
                onChange={handleCardInputChange}
                error={errors?.cvv}
                placeholder="123"
                required
              />
            </div>

            <Checkbox
              label="Save this card for future purchases"
              checked={cardData?.saveCard}
              onChange={(e) => setCardData(prev => ({ 
                ...prev, 
                saveCard: e?.target?.checked 
              }))}
            />
          </div>
        )}

        {/* PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="p-6 bg-muted/50 rounded-lg text-center">
            <Icon name="Wallet" size={48} className="mx-auto mb-4 text-primary" />
            <p className="text-foreground font-medium mb-2">
              Pay with PayPal
            </p>
            <p className="text-sm text-muted-foreground">
              You'll be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}

        {/* M-Pesa */}
        {paymentMethod === 'mpesa' && (
          <div className="space-y-4">
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <Icon name="Smartphone" size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-foreground font-medium mb-2">
                Pay with M-Pesa
              </p>
              <p className="text-sm text-muted-foreground">
                Enter your M-Pesa number to receive a payment prompt.
              </p>
            </div>
            <Input
              label="M-Pesa Phone Number"
              type="tel"
              placeholder="+254 700 000 000"
              required
            />
          </div>
        )}

        {/* Billing Address */}
        {paymentMethod === 'card' && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-4">
              Billing Address
            </h3>
            
            <Checkbox
              label="Same as shipping address"
              checked={billingAddress?.sameAsShipping}
              onChange={(e) => setBillingAddress(prev => ({ 
                ...prev, 
                sameAsShipping: e?.target?.checked 
              }))}
              className="mb-4"
            />

            {!billingAddress?.sameAsShipping && (
              <div className="space-y-4">
                <Input
                  label="Address"
                  name="address"
                  value={billingAddress?.address}
                  onChange={handleBillingChange}
                  error={errors?.billingAddress}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={billingAddress?.city}
                    onChange={handleBillingChange}
                    error={errors?.billingCity}
                    required
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={billingAddress?.zipCode}
                    onChange={handleBillingChange}
                    error={errors?.billingZip}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Notice */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start">
            <Icon name="Shield" size={16} className="mr-2 mt-0.5 text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Your payment is secure
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We use industry-standard encryption to protect your payment information.
                Your card details are never stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          loading={isProcessing}
          className="text-lg py-3"
        >
          {isProcessing 
            ? 'Processing Payment...' 
            : `Complete Order - ${formatPrice(orderTotal)}`
          }
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;