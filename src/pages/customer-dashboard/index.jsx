import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import OrderStatusCard from './components/OrderStatusCard';
import LoyaltySection from './components/LoyaltySection';
import RecommendationsSection from './components/RecommendationsSection';
import DashboardSidebar from './components/DashboardSidebar';
import OrderHistoryTab from './components/OrderHistoryTab';
import WishlistTab from './components/WishlistTab';
import NotificationCenter from './components/NotificationCenter';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock user data
  const userData = {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock stats data
  const statsData = {
    activeOrders: 2,
    wishlistItems: 12,
    totalOrders: 24,
    totalSpent: 2847.50
  };

  // Mock recent order
  const recentOrder = {
    id: "ORD-2024-001",
    status: "Shipped",
    items: 3,
    total: 156.99,
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "Dec 28, 2024"
  };

  // Mock loyalty data
  const loyaltyData = {
    currentTier: "Gold Member",
    currentPoints: 2450,
    nextTierPoints: 5000,
    totalSaved: "$247",
    referrals: 3
  };

  // Mock orders data
  const ordersData = [
    {
      id: "ORD-2024-001",
      date: "Dec 22, 2024",
      status: "Shipped",
      productName: "Wireless Bluetooth Headphones",
      items: 1,
      total: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "Dec 28, 2024"
    },
    {
      id: "ORD-2024-002",
      date: "Dec 18, 2024",
      status: "Delivered",
      productName: "Smart Fitness Watch",
      items: 1,
      total: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "Delivered Dec 20, 2024"
    },
    {
      id: "ORD-2024-003",
      date: "Dec 15, 2024",
      status: "Processing",
      productName: "Laptop Stand with Cooling",
      items: 2,
      total: 67.00,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop"
    }
  ];

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Noise Cancelling Headphones",
      currentPrice: 299.99,
      originalPrice: 349.99,
      priceChange: -15.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 1247,
      inStock: true,
      addedDate: "2 weeks ago"
    },
    {
      id: 2,
      name: "Smart Home Security Camera",
      currentPrice: 129.99,
      originalPrice: 129.99,
      priceChange: 0,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 892,
      inStock: false,
      addedDate: "1 month ago"
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      currentPrice: 449.99,
      originalPrice: 399.99,
      priceChange: 50.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 2156,
      inStock: true,
      addedDate: "3 days ago"
    }
  ]);

  // Mock recommendations data
  const recommendationsData = [
    {
      id: 1,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1609592806596-b43dafe50b4d?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 567,
      reason: "Based on your recent electronics purchases"
    },
    {
      id: 2,
      name: "Blue Light Blocking Glasses",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop",
      rating: 4.1,
      reviews: 234,
      reason: "Perfect for your home office setup"
    },
    {
      id: 3,
      name: "Portable Phone Stand",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 1089,
      reason: "Frequently bought with similar items"
    }
  ];

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-001 has been shipped and is on its way!',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/orders/ORD-2024-001',
      actionText: 'Track Order'
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on electronics this weekend. Limited time offer!',
      timestamp: '1 day ago',
      read: false,
      actionUrl: '/promotions/weekend-sale',
      actionText: 'Shop Now'
    },
    {
      id: 3,
      type: 'account',
      title: 'Profile Updated',
      message: 'Your account information has been successfully updated.',
      timestamp: '3 days ago',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance on Dec 30th from 2-4 AM EST.',
      timestamp: '1 week ago',
      read: true
    }
  ]);

  const notificationCounts = {
    orders: 2,
    wishlist: 1,
    notifications: notifications?.filter(n => !n?.read)?.length
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleMoveToCart = (item) => {
    // Mock move to cart functionality
    console.log('Moving to cart:', item);
    // In real app, this would add to cart and optionally remove from wishlist
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <WelcomeSection user={userData} recentOrder={recentOrder} />
            <QuickActions stats={statsData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {ordersData?.slice(0, 2)?.map((order) => (
                    <OrderStatusCard key={order?.id} order={order} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('orders')}
                    className="w-full"
                  >
                    View All Orders
                    <Icon name="ArrowRight" size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
              
              <div>
                <LoyaltySection loyaltyData={loyaltyData} />
              </div>
            </div>
            <RecommendationsSection recommendations={recommendationsData} />
          </div>
        );
      
      case 'orders':
        return <OrderHistoryTab orders={ordersData} />;
      
      case 'wishlist':
        return (
          <WishlistTab 
            wishlistItems={wishlistItems}
            onRemoveItem={handleRemoveFromWishlist}
            onMoveToCart={handleMoveToCart}
          />
        );
      
      case 'notifications':
        return (
          <NotificationCenter 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        );
      
      case 'addresses':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Address Management</h3>
            <p className="text-muted-foreground mb-4">
              Manage your shipping and billing addresses
            </p>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Add New Address
            </Button>
          </div>
        );
      
      case 'payments':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
            <p className="text-muted-foreground mb-4">
              Manage your saved payment methods
            </p>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Add Payment Method
            </Button>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <p className="text-muted-foreground mb-4">
              Update your profile and preferences
            </p>
            <Button>
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Tab Navigation */}
      {isMobile && (
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex overflow-x-auto px-4 py-2 space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
              { id: 'orders', label: 'Orders', icon: 'Package' },
              { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
              { id: 'notifications', label: 'Alerts', icon: 'Bell' }
            ]?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab?.id)}
                className="flex-shrink-0 relative"
              >
                <Icon name={tab?.icon} size={16} className="mr-1" />
                {tab?.label}
                {tab?.id === 'notifications' && notificationCounts?.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCounts?.notifications}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="lg:col-span-3">
              <DashboardSidebar 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                notificationCounts={notificationCounts}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="lg:col-span-9">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;