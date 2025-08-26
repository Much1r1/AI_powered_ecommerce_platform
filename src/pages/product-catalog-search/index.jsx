import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Component imports
import CategoryChips from './components/CategoryChips';

import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import QuickFilters from './components/QuickFilters';
import RecentlyViewed from './components/RecentlyViewed';
import ProductGrid from './components/ProductGrid';

const ProductCatalogSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({});
  const [quickFilters, setQuickFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [resultsCount, setResultsCount] = useState(0);

  // Mock data
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'sports', name: 'Sports' },
    { id: 'books', name: 'Books' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'automotive', name: 'Automotive' }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 234,
      isOnSale: true,
      stock: 15,
      isWishlisted: false,
      variants: [
        { id: 'black', name: 'Black', price: 199.99 },
        { id: 'white', name: 'White', price: 199.99 },
        { id: 'blue', name: 'Blue', price: 209.99 }
      ]
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 189,
      isOnSale: false,
      stock: 8,
      isWishlisted: true
    },
    {
      id: 3,
      name: "Premium Coffee Maker with Grinder",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      isOnSale: true,
      stock: 3,
      isWishlisted: false
    },
    {
      id: 4,
      name: "Ergonomic Office Chair with Lumbar Support",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.2,
      reviewCount: 98,
      isOnSale: false,
      stock: 12,
      isWishlisted: false
    },
    {
      id: 5,
      name: "Wireless Charging Pad for Smartphones",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d7b6b8e3c9e?w=400&h=400&fit=crop",
      rating: 4.1,
      reviewCount: 267,
      isOnSale: true,
      stock: 25,
      isWishlisted: false
    },
    {
      id: 6,
      name: "4K Ultra HD Smart TV 55 Inch",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 145,
      isOnSale: false,
      stock: 0,
      isWishlisted: true
    },
    {
      id: 7,
      name: "Professional DSLR Camera with Lens Kit",
      price: 899.99,
      originalPrice: 1099.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 89,
      isOnSale: true,
      stock: 6,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Gaming Mechanical Keyboard RGB Backlit",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 312,
      isOnSale: false,
      stock: 18,
      isWishlisted: false
    }
  ];

  const recentlyViewedProducts = [
    {
      id: 101,
      name: "Laptop Stand",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
    },
    {
      id: 102,
      name: "Wireless Mouse",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop"
    },
    {
      id: 103,
      name: "USB-C Hub",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"
    },
    {
      id: 104,
      name: "Phone Case",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop"
    }
  ];

  // Initialize products on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setResultsCount(mockProducts?.length);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockProducts?.filter(product =>
        product?.name?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setProducts(filtered);
      setResultsCount(filtered?.length);
      setLoading(false);
    }, 500);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setLoading(true);
    
    setTimeout(() => {
      let filtered = mockProducts;
      if (categoryId !== 'all') {
        // In real app, filter by category
        filtered = mockProducts?.filter((_, index) => index % 2 === 0); // Mock filtering
      }
      setProducts(filtered);
      setResultsCount(filtered?.length);
      setLoading(false);
    }, 500);
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setLoading(true);
    
    setTimeout(() => {
      let sorted = [...products];
      switch (sortValue) {
        case 'price-low':
          sorted?.sort((a, b) => a?.price - b?.price);
          break;
        case 'price-high':
          sorted?.sort((a, b) => b?.price - a?.price);
          break;
        case 'rating':
          sorted?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'newest':
          sorted?.reverse();
          break;
        default:
          break;
      }
      setProducts(sorted);
      setLoading(false);
    }, 300);
  };

  // Handle quick filter toggle
  const handleQuickFilterToggle = (filterId) => {
    const updatedFilters = quickFilters?.includes(filterId)
      ? quickFilters?.filter(id => id !== filterId)
      : [...quickFilters, filterId];
    
    setQuickFilters(updatedFilters);
    
    // Apply quick filters
    setLoading(true);
    setTimeout(() => {
      let filtered = mockProducts;
      
      if (updatedFilters?.includes('onSale')) {
        filtered = filtered?.filter(product => product?.isOnSale);
      }
      if (updatedFilters?.includes('inStock')) {
        filtered = filtered?.filter(product => product?.stock > 0);
      }
      
      setProducts(filtered);
      setResultsCount(filtered?.length);
      setLoading(false);
    }, 300);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // In real app, this would add to cart state/API
  };

  // Handle wishlist toggle
  const handleToggleWishlist = (productId, isWishlisted) => {
    setProducts(prev => prev?.map(product => 
      product?.id === productId 
        ? { ...product, isWishlisted }
        : product
    ));
  };

  // Handle load more
  const handleLoadMore = async () => {
    // Simulate loading more products
    return new Promise(resolve => {
      setTimeout(() => {
        const moreProducts = mockProducts.map(product => ({
          ...product,
          id: product.id + 1000
        }));
        setProducts(prev => [...prev, ...moreProducts]);
        setResultsCount(prev => prev + moreProducts.length);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header with Search */}
      <div className="lg:hidden bg-card border-b border-border sticky top-0 z-30">
        <div className="p-4">
          <SearchBar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      {/* Desktop Header with Search */}
      <div className="hidden lg:block bg-card border-b border-border sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="ml-6">
              <Button
                variant="outline"
                onClick={() => router?.push('/shopping-cart-checkout')}
                className="relative"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Cart
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Category Chips */}
      <CategoryChips
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      {/* Quick Filters */}
      <QuickFilters
        activeFilters={quickFilters}
        onQuickFilterToggle={handleQuickFilterToggle}
      />
      {/* Recently Viewed */}
      <RecentlyViewed products={recentlyViewedProducts} />
      {/* Main Content */}
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Products Section */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <Icon name="Filter" size={18} className="mr-2" />
                  Filters
                </Button>
              </div>
              
              <SortDropdown
                sortBy={sortBy}
                onSortChange={handleSortChange}
                resultsCount={resultsCount}
              />
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogSearch;