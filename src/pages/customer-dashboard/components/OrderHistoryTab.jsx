import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderHistoryTab = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' },
    { value: '365', label: 'Last Year' }
  ];

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         order?.id?.toString()?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order?.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          <Select
            options={dateOptions}
            value={dateFilter}
            onChange={setDateFilter}
            placeholder="Filter by date"
          />
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' ?'Try adjusting your filters' :'You haven\'t placed any orders yet'
              }
            </p>
            <Button>
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Start Shopping
            </Button>
          </div>
        ) : (
          filteredOrders?.map((order) => (
            <div key={order?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order?.id}</h3>
                  <p className="text-muted-foreground">Placed on {order?.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
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
                  <h4 className="font-medium">{order?.productName}</h4>
                  <p className="text-muted-foreground">{order?.items} items</p>
                  <p className="font-semibold text-primary">${order?.total}</p>
                </div>
              </div>

              {order?.trackingNumber && (
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Tracking Number</p>
                      <p className="font-mono text-sm text-muted-foreground">{order?.trackingNumber}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-1" />
                      Track
                    </Button>
                  </div>
                  {order?.estimatedDelivery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimated delivery: {order?.estimatedDelivery}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={14} className="mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={14} className="mr-1" />
                  Invoice
                </Button>
                {order?.status?.toLowerCase() === 'delivered' && (
                  <Button variant="outline" size="sm">
                    <Icon name="RotateCcw" size={14} className="mr-1" />
                    Reorder
                  </Button>
                )}
                {order?.status?.toLowerCase() !== 'cancelled' && order?.status?.toLowerCase() !== 'delivered' && (
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    Support
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryTab;