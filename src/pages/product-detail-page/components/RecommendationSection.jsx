import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationSection = ({ title, products, onProductClick, onAddToCart }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <Button variant="ghost" size="sm">
          View All
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map(product => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden card-elevation hover:card-elevation-hover transition-all micro-scale cursor-pointer"
            onClick={() => onProductClick(product?.id)}
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
              {product?.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  -{product?.discount}%
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-md w-8 h-8"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Handle wishlist toggle
                }}
              >
                <Icon name="Heart" size={14} />
              </Button>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <h4 className="font-medium text-foreground text-sm line-clamp-2">
                {product?.name}
              </h4>
              
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={`${
                        i < Math.floor(product?.rating)
                          ? 'text-yellow-400 fill-current' :'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-bold text-foreground">
                  ${product?.price}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                size="sm"
                fullWidth
                onClick={(e) => {
                  e?.stopPropagation();
                  onAddToCart(product);
                }}
                className="mt-2"
              >
                <Icon name="ShoppingCart" size={14} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;