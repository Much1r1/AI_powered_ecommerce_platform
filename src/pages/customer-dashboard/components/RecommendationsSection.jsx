import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = ({ recommendations }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product-detail-page?id=${productId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold">AI Recommendations</h3>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="RefreshCw" size={14} className="mr-1" />
          Refresh
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your purchase history and browsing behavior
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.map((product) => (
          <div 
            key={product?.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
              <img 
                src={product?.image} 
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{product?.name}</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary">${product?.price}</span>
              {product?.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product?.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex">
                {[...Array(5)]?.map((_, i) => (
                  <Icon 
                    key={i}
                    name="Star" 
                    size={12} 
                    className={i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product?.reviews})</span>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleProductClick(product?.id);
                }}
              >
                <Icon name="Eye" size={12} className="mr-1" />
                View
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Add to cart logic
                }}
              >
                <Icon name="ShoppingCart" size={12} />
              </Button>
            </div>

            {product?.reason && (
              <div className="mt-3 p-2 bg-primary/5 rounded text-xs text-primary">
                <Icon name="Info" size={10} className="inline mr-1" />
                {product?.reason}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button 
          variant="outline"
          onClick={() => navigate('/product-catalog-search?recommended=true')}
        >
          View All Recommendations
          <Icon name="ArrowRight" size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsSection;