import React from 'react';
import { useRouter } from 'next/router';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ products }) => {
  const router = useRouter();

  if (!products || products?.length === 0) {
    return null;
  }

  const handleProductClick = (productId) => {
    router?.push(`/product-detail-page?id=${productId}`);
  };

  const handleClearHistory = () => {
    // In real app, this would clear the recently viewed history
    console.log('Clear recently viewed history');
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Recently Viewed</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="flex-shrink-0 w-20 cursor-pointer group"
              onClick={() => handleProductClick(product?.id)}
            >
              <div className="aspect-square overflow-hidden rounded-lg border border-border mb-1">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 text-center">
                {product?.name}
              </p>
              <p className="text-xs font-medium text-foreground text-center mt-1">
                ${product?.price?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;