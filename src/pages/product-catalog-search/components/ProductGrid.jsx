import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ products, loading, hasMore, onLoadMore, onAddToCart, onToggleWishlist }) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-card border border-border rounded-lg card-elevation animate-pulse">
      <div className="aspect-square bg-muted rounded-t-lg"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-1/3"></div>
        <div className="h-8 bg-muted rounded"></div>
      </div>
    </div>
  );

  if (loading && products?.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <Button variant="outline" className="mt-4">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loadingMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More Products'}
          </Button>
        </div>
      )}
      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-4">
          {Array.from({ length: 10 }, (_, i) => (
            <ProductSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;