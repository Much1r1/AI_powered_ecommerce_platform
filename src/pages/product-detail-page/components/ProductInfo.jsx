import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantType, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: value
    }));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const isInStock = product?.stock > 0;
  const canAddToCart = isInStock && Object.keys(product?.variants || {})?.every(
    variantType => selectedVariants?.[variantType]
  );

  return (
    <div className="space-y-6">
      {/* Product Name and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={`${
                    i < Math.floor(product?.rating)
                      ? 'text-yellow-400 fill-current' :'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.rating} ({product?.reviewCount} reviews)
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            SKU: {product?.sku}
          </span>
        </div>
      </div>
      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground">
            ${product?.price}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-lg text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
          {product?.discount && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        {product?.originalPrice && product?.originalPrice > product?.price && (
          <p className="text-sm text-success">
            You save ${(product?.originalPrice - product?.price)?.toFixed(2)}
          </p>
        )}
      </div>
      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon
          name={isInStock ? "CheckCircle" : "XCircle"}
          size={20}
          className={isInStock ? "text-success" : "text-error"}
        />
        <span className={`font-medium ${isInStock ? "text-success" : "text-error"}`}>
          {isInStock ? `In Stock (${product?.stock} available)` : "Out of Stock"}
        </span>
      </div>
      {/* Variants */}
      {product?.variants && Object.keys(product?.variants)?.map(variantType => (
        <div key={variantType} className="space-y-3">
          <h3 className="font-medium text-foreground capitalize">
            {variantType}: {selectedVariants?.[variantType] || 'Select'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product?.variants?.[variantType]?.map(option => (
              <button
                key={option?.value}
                onClick={() => handleVariantChange(variantType, option?.value)}
                disabled={!option?.inStock}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                  selectedVariants?.[variantType] === option?.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : option?.inStock
                    ? 'border-border hover:border-primary' :'border-border bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {option?.label}
                {!option?.inStock && (
                  <span className="ml-1 text-xs">(Out of stock)</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-r-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="w-10 h-10 rounded-l-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stock} available
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onAddToCart(product, selectedVariants, quantity)}
          disabled={!canAddToCart}
          fullWidth
          className="h-12"
        >
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="secondary"
          onClick={() => onBuyNow(product, selectedVariants, quantity)}
          disabled={!canAddToCart}
          fullWidth
          className="h-12"
        >
          <Icon name="Zap" size={20} className="mr-2" />
          Buy Now
        </Button>
      </div>
      {/* Additional Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="ghost" size="sm">
          <Icon name="Heart" size={18} className="mr-2" />
          Add to Wishlist
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Share2" size={18} className="mr-2" />
          Share
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="BarChart3" size={18} className="mr-2" />
          Compare
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;