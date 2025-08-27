import React, { useState, useEffect } from 'react';
import { useNavigate as useRouter } from "react-router-dom";
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import ReviewSection from './components/ReviewSection';
import RecommendationSection from './components/RecommendationSection';
import StickyBottomBar from './components/StickyBottomBar';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetailPage = () => {
  const router = useRouter();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock product data
  const product = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 1247,
    stock: 15,
    sku: "WH-1000XM5-B",
    description: `Experience premium sound quality with these state-of-the-art wireless headphones. Featuring industry-leading noise cancellation technology, these headphones deliver exceptional audio performance whether you're commuting, working, or relaxing at home.\n\nThe advanced 40mm drivers provide rich, detailed sound across all frequencies, while the adaptive noise control automatically adjusts to your environment. With up to 30 hours of battery life and quick charge capability, these headphones are perfect for all-day use.`,
    features: [
      "Industry-leading Active Noise Cancellation",
      "30-hour battery life with quick charge",
      "Premium 40mm drivers for exceptional sound",
      "Adaptive Sound Control technology",
      "Touch sensor controls for easy operation",
      "Speak-to-Chat technology",
      "Multipoint Bluetooth connection",
      "Comfortable over-ear design"
    ],
    specifications: {
      driverSize: "40mm",
      frequency: "4Hz-40,000Hz",
      batteryLife: "30 hours",
      chargingTime: "3 hours (10 min quick charge = 5 hours)",
      weight: "254g",
      connectivity: "Bluetooth 5.2, NFC",
      noiseCancellation: "Dual Noise Sensor Technology",
      controls: "Touch Sensor"
    },
    variants: {
      color: [
        { value: "black", label: "Midnight Black", inStock: true },
        { value: "silver", label: "Platinum Silver", inStock: true },
        { value: "blue", label: "Silent Blue", inStock: false }
      ]
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=800&fit=crop"
    ]
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      title: "Exceptional sound quality and comfort",
      content: "These headphones exceeded my expectations. The noise cancellation is incredible, and I can wear them for hours without any discomfort. Perfect for my daily commute and work from home setup.",
      date: "2025-01-15",
      verified: true,
      helpfulVotes: 23,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"]
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      title: "Great headphones with minor issues",
      content: "Overall very satisfied with the purchase. Sound quality is excellent and battery life is as advertised. The only minor issue is that the touch controls can be a bit sensitive sometimes.",
      date: "2025-01-10",
      verified: true,
      helpfulVotes: 15
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      rating: 5,
      title: "Perfect for travel",
      content: "I travel frequently for work and these headphones are a game-changer. The noise cancellation makes flights so much more pleasant, and the battery lasts through even the longest trips.",
      date: "2025-01-08",
      verified: true,
      helpfulVotes: 31
    }
  ];

  // Mock recommendation data
  const recommendedProducts = [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Studio Monitor Headphones",
      price: 299.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Gaming Headset RGB",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.2,
      reviewCount: 1203,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      rating: 4.4,
      reviewCount: 678,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
    }
  ];

  const recentlyViewedProducts = [
    {
      id: 6,
      name: "Smart Watch Series 8",
      price: 399.99,
      rating: 4.6,
      reviewCount: 2341,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      price: 29.99,
      rating: 4.1,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "USB-C Hub Adapter",
      price: 49.99,
      rating: 4.3,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Laptop Stand Adjustable",
      price: 39.99,
      rating: 4.5,
      reviewCount: 789,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
    }
  ];

  // Breadcrumb data
  const breadcrumbs = [
    { label: "Home", path: "/product-catalog-search" },
    { label: "Electronics", path: "/product-catalog-search?category=electronics" },
    { label: "Audio", path: "/product-catalog-search?category=audio" },
    { label: "Headphones", path: "/product-catalog-search?category=headphones" },
    { label: product?.name, path: null }
  ];

  // Handle scroll for sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowStickyBar(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (productData, variants = {}, quantity = 1) => {
    console.log('Adding to cart:', { productData, variants, quantity });
    // Add to cart logic here
    alert('Product added to cart!');
  };

  const handleBuyNow = (productData, variants = {}, quantity = 1) => {
    console.log('Buy now:', { productData, variants, quantity });
    router?.push('/shopping-cart-checkout');
  };

  const handleProductClick = (productId) => {
    router?.push(`/product-detail-page?id=${productId}`);
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this amazing product: ${product?.name}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb breadcrumbs={breadcrumbs} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ImageGallery images={product?.images} productName={product?.name} />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <ReviewSection
            reviews={reviews}
            averageRating={product?.rating}
            totalReviews={product?.reviewCount}
          />
        </div>

        {/* AI Recommendations */}
        <div className="mb-12">
          <RecommendationSection
            title="You might also like"
            products={recommendedProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Recently Viewed */}
        <div className="mb-12">
          <RecommendationSection
            title="Recently viewed"
            products={recentlyViewedProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {/* Sticky Bottom Bar (Mobile) */}
      <StickyBottomBar
        product={product}
        onAddToCart={() => handleAddToCart(product)}
        onBuyNow={() => handleBuyNow(product)}
        isVisible={showStickyBar}
      />
      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-20 md:bottom-6 space-y-3 z-40">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleShareProduct}
          className="w-12 h-12 rounded-full shadow-lg"
          aria-label="Share product"
        >
          <Icon name="Share2" size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full shadow-lg bg-card"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;