import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyBottomBar = ({ product, onAddToCart, onBuyNow, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex items-center p-4 space-x-3">
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              ${product?.price}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {product?.name}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddToCart}
            className="flex-shrink-0"
          >
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            onClick={onBuyNow}
            className="flex-shrink-0"
          >
            <Icon name="Zap" size={16} className="mr-1" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;