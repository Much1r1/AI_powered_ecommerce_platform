import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'Package';
      case 'promotion':
        return 'Tag';
      case 'account':
        return 'User';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-blue-600 bg-blue-50';
      case 'promotion':
        return 'text-emerald-600 bg-emerald-50';
      case 'account':
        return 'text-purple-600 bg-purple-50';
      case 'system':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'read') return notification?.read;
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
              <Icon name="CheckCheck" size={14} className="mr-1" />
              Mark All Read
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({notifications?.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Read ({notifications?.length - unreadCount})
          </Button>
        </div>
      </div>
      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ?'You\'re all caught up!' :'You don\'t have any notifications yet'
              }
            </p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div 
              key={notification?.id}
              className={`bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200 ${
                !notification?.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification?.timestamp}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification?.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification?.id)}
                        >
                          <Icon name="Check" size={14} />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </div>

                  {notification?.actionUrl && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm">
                        <Icon name="ExternalLink" size={12} className="mr-1" />
                        {notification?.actionText || 'View Details'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;