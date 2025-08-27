import React, { useState, useEffect } from 'react';
import { useNavigate as useRouter } from "react-router-dom";
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import PromoCodeInput from './components/PromoCodeInput';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';

const ShoppingCartCheckout = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones with Active Noise Cancellation",
      variant: "Black, Over-Ear",
      sku: "WH-1000XM4-B",
      price: 299.99,
      originalPrice: 349.99,
      quantity: 1,
      maxQuantity: 10,
      stock: 15,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      variant: "Silver, 44mm",
      sku: "SW-FIT-44-S",
      price: 199.99,
      quantity: 2,
      maxQuantity: 5,
      stock: 3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      variant: "Blue, Waterproof",
      sku: "BT-SPK-WP-B",
      price: 79.99,
      quantity: 1,
      maxQuantity: 20,
      stock: 25,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
    }
  ];

  const mockSavedAddresses = [
    {
      id: 'addr1',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 'addr2',
      firstName: 'John',
      lastName: 'Doe',
      address: '456 Oak Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'US',
      phone: '+1 (555) 987-6543'
    }
  ];

  const checkoutSteps = [
    {
      id: 'cart',
      title: 'Cart',
      description: 'Review items',
      icon: 'ShoppingCart'
    },
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Delivery details',
      icon: 'Truck'
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Payment method',
      icon: 'CreditCard'
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Confirm order',
      icon: 'CheckCircle'
    }
  ];

  useEffect(() => {
    setCartItems(mockCartItems);
  }, []);

  // Calculate order totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const discount = appliedPromo ? 
    (appliedPromo?.discount ? subtotal * (appliedPromo?.discount / 100) : 0) : 0;
  const shipping = appliedPromo?.freeShipping || subtotal >= 75 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setCartItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleApplyPromo = (promoData) => {
    setAppliedPromo(promoData);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleContinueShopping = () => {
    router?.push('/product-catalog-search');
  };

  const handleGuestCheckout = () => {
    setIsGuest(true);
    setCurrentStep(1);
  };

  const handleSignIn = () => {
    router?.push('/login-registration');
  };

  const handleShippingSubmit = (data) => {
    setShippingInfo(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentInfo(data);
    setCurrentStep(3);
  };

  const handleEditStep = (step) => {
    const stepIndex = checkoutSteps?.findIndex(s => s?.id === step);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      router?.push('/customer-dashboard?tab=orders&success=true');
    }, 3000);
  };

  const orderSummaryData = {
    subtotal,
    shipping,
    tax,
    discount,
    total
  };

  if (cartItems?.length === 0 && currentStep === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            
            <Button onClick={handleContinueShopping} className="px-8">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {currentStep === 0 ? 'Shopping Cart' : 'Checkout'}
            </h1>
            {currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Back
              </Button>
            )}
          </div>

          {currentStep > 0 && (
            <CheckoutProgress 
              currentStep={currentStep} 
              steps={checkoutSteps} 
            />
          )}
        </div>

        {/* Cart Step */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="space-y-4 mb-6">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Promo Code */}
              <PromoCodeInput
                onApplyPromo={handleApplyPromo}
                appliedPromo={appliedPromo}
                onRemovePromo={handleRemovePromo}
              />

              {/* Continue Shopping */}
              <div className="mt-6">
                <Button
                  variant="ghost"
                  onClick={handleContinueShopping}
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={appliedPromo?.code}
                isSticky={true}
              />

              {/* Checkout Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  fullWidth
                  onClick={handleGuestCheckout}
                  className="text-lg py-3"
                >
                  Continue as Guest
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleSignIn}
                >
                  Sign In for Faster Checkout
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Shield" size={14} className="mr-2" />
                    Secure checkout with SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="RotateCcw" size={14} className="mr-2" />
                    30-day return policy
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Headphones" size={14} className="mr-2" />
                    24/7 customer support
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Step */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ShippingForm
                onSubmit={handleShippingSubmit}
                savedAddresses={isGuest ? [] : mockSavedAddresses}
                isGuest={isGuest}
              />
            </div>
            <div className="lg:col-span-4">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={appliedPromo?.code}
                isSticky={true}
              />
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                orderTotal={total}
              />
            </div>
            <div className="lg:col-span-4">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={appliedPromo?.code}
                isSticky={true}
              />
            </div>
          </div>
        )}

        {/* Review Step */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <OrderReview
                cartItems={cartItems}
                shippingInfo={shippingInfo}
                paymentInfo={paymentInfo}
                orderSummary={orderSummaryData}
                onEdit={handleEditStep}
                onPlaceOrder={handlePlaceOrder}
                isProcessing={isProcessing}
              />
            </div>
            <div className="lg:col-span-4">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={appliedPromo?.code}
                isSticky={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;