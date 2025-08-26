import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderStatusCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-emerald-600 bg-emerald-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-amber-600 bg-amber-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">Order #{order?.id}</h3>
          <p className="text-sm text-muted-foreground">{order?.date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
          <Icon name={getStatusIcon(order?.status)} size={12} className="inline mr-1" />
          {order?.status}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
          <img 
            src={order?.image} 
            alt={order?.productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{order?.productName}</p>
          <p className="text-xs text-muted-foreground">{order?.items} items • ${order?.total}</p>
        </div>
      </div>
      {order?.trackingNumber && (
        <div className="bg-muted rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Tracking Number</p>
              <p className="font-mono text-sm font-medium">{order?.trackingNumber}</p>
            </div>
            <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
          </div>
          {order?.estimatedDelivery && (
            <p className="text-xs text-muted-foreground mt-2">
              Estimated delivery: {order?.estimatedDelivery}
            </p>
          )}
        </div>
      )}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Icon name="Eye" size={14} className="mr-1" />
          View Details
        </Button>
        {order?.status?.toLowerCase() !== 'cancelled' && order?.status?.toLowerCase() !== 'delivered' && (
          <Button variant="ghost" size="sm">
            <Icon name="MessageCircle" size={14} className="mr-1" />
            Support
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderStatusCard;