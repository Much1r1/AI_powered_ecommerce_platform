import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemove(item?.id);
    setShowRemoveConfirm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">
              {item?.name}
            </h3>
            {item?.variant && (
              <p className="text-sm text-muted-foreground mt-1">
                {item?.variant}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              SKU: {item?.sku}
            </p>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold text-foreground">
              {formatPrice(item?.price)}
            </p>
            {item?.originalPrice && item?.originalPrice > item?.price && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(item?.originalPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Quantity Controls and Actions */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1 || isUpdating}
              className="h-8 w-8 p-0"
              aria-label="Decrease quantity"
            >
              <Icon name="Minus" size={16} />
            </Button>
            
            <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
              {isUpdating ? '...' : item?.quantity}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity + 1)}
              disabled={isUpdating || item?.quantity >= item?.maxQuantity}
              className="h-8 w-8 p-0"
              aria-label="Increase quantity"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          {/* Remove Button */}
          <div className="relative">
            {!showRemoveConfirm ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRemoveConfirm(true)}
                className="text-error hover:text-error hover:bg-error/10"
                aria-label="Remove item"
              >
                <Icon name="Trash2" size={16} className="mr-1" />
                Remove
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                >
                  Confirm
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stock Status */}
        {item?.stock <= 5 && item?.stock > 0 && (
          <div className="mt-2 flex items-center text-warning">
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            <span className="text-xs">Only {item?.stock} left in stock</span>
          </div>
        )}

        {/* Total Price */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="font-semibold text-foreground">
              {formatPrice(item?.price * item?.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;