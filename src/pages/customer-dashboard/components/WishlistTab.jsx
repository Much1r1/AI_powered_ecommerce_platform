import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WishlistTab = ({ wishlistItems, onRemoveItem, onMoveToCart }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems?.length === wishlistItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems?.map(item => item?.id));
    }
  };

  const handleBulkMoveToCart = () => {
    selectedItems?.forEach(itemId => {
      const item = wishlistItems?.find(item => item?.id === itemId);
      if (item) {
        onMoveToCart(item);
      }
    });
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    selectedItems?.forEach(itemId => {
      onRemoveItem(itemId);
    });
    setSelectedItems([]);
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-emerald-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {wishlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Save items you love to buy them later
          </p>
          <Button onClick={() => navigate('/product-catalog-search')}>
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedItems?.length === wishlistItems?.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                  <span className="text-sm">
                    Select All ({selectedItems?.length} of {wishlistItems?.length})
                  </span>
                </label>
              </div>
              {selectedItems?.length > 0 && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBulkMoveToCart}>
                    <Icon name="ShoppingCart" size={14} className="mr-1" />
                    Move to Cart ({selectedItems?.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBulkRemove}>
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Remove ({selectedItems?.length})
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems?.map((item) => (
              <div key={item?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img 
                      src={item?.image} 
                      alt={item?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                      onClick={() => navigate(`/product-detail-page?id=${item?.id}`)}
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedItems?.includes(item?.id)}
                      onChange={() => handleSelectItem(item?.id)}
                      className="w-5 h-5 rounded bg-white/90 backdrop-blur-sm"
                    />
                  </div>

                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item?.id)}
                      className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>

                  {!item?.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2">{item?.name}</h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary">${item?.currentPrice}</span>
                    {item?.originalPrice && item?.originalPrice !== item?.currentPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>

                  {item?.priceChange && item?.priceChange !== 0 && (
                    <div className={`text-sm mb-3 ${getPriceChangeColor(item?.priceChange)}`}>
                      <Icon 
                        name={item?.priceChange > 0 ? "TrendingUp" : "TrendingDown"} 
                        size={12} 
                        className="inline mr-1" 
                      />
                      {item?.priceChange > 0 ? '+' : ''}${Math.abs(item?.priceChange)} since added
                    </div>
                  )}

                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon 
                          key={i}
                          name="Star" 
                          size={12} 
                          className={i < Math.floor(item?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({item?.reviews})</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      disabled={!item?.inStock}
                      onClick={() => onMoveToCart(item)}
                    >
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/product-detail-page?id=${item?.id}`)}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>

                  {item?.addedDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Added {item?.addedDate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistTab;