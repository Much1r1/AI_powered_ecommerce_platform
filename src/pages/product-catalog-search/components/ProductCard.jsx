import React, { useState } from 'react';
import { useNavigate as useRouter } from "react-router-dom";
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);
  const [showVariants, setShowVariants] = useState(false);

  const handleProductClick = () => {
    router?.push(`/product-detail-page?id=${product?.id}`);
  };

  const handleWishlistToggle = (e) => {
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onToggleWishlist(product?.id, !isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e?.stopPropagation();
    if (product?.variants && product?.variants?.length > 0) {
      setShowVariants(!showVariants);
    } else {
      onAddToCart(product);
    }
  };

  const handleVariantSelect = (variant) => {
    onAddToCart({ ...product, selectedVariant: variant });
    setShowVariants(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg card-elevation hover:card-elevation-hover transition-all duration-200 micro-scale group">
      <div className="relative">
        <div 
          className="aspect-square overflow-hidden rounded-t-lg cursor-pointer"
          onClick={handleProductClick}
        >
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <Icon
            name="Heart"
            size={16}
            className={isWishlisted ? "text-error fill-current" : "text-muted-foreground"}
          />
        </Button>

        {/* Sale Badge */}
        {product?.isOnSale && (
          <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
            Sale
          </div>
        )}

        {/* Stock Badge */}
        {product?.stock <= 5 && product?.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
            Only {product?.stock} left
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="cursor-pointer" onClick={handleProductClick}>
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
            {product?.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {renderStars(product?.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product?.reviewCount})
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="font-semibold text-foreground">
              ${product?.price?.toFixed(2)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickAdd}
            className="w-full"
            disabled={product?.stock === 0}
          >
            {product?.stock === 0 ? 'Out of Stock' : 'Quick Add'}
            {product?.variants && product?.variants?.length > 0 && (
              <Icon name="ChevronDown" size={14} className="ml-1" />
            )}
          </Button>

          {/* Variant Selector */}
          {showVariants && product?.variants && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
              <div className="p-2 space-y-1">
                {product?.variants?.map((variant) => (
                  <Button
                    key={variant?.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVariantSelect(variant)}
                    className="w-full justify-start text-xs"
                  >
                    {variant?.name} - ${variant?.price?.toFixed(2)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;