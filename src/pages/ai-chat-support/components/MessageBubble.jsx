import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, onProductAction, onFileDownload }) => {
  const isUser = message?.type === 'user';
  const isSystem = message?.type === 'system';

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessageContent = () => {
    if (message?.attachment) {
      switch (message?.attachment?.type) {
        case 'image':
          return (
            <div className="space-y-2">
              <Image
                src={message?.attachment?.url}
                alt={message?.attachment?.name || 'Uploaded image'}
                className="max-w-xs rounded-lg"
              />
              {message?.content && <p className="text-sm">{message?.content}</p>}
            </div>
          );
        
        case 'file':
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <Icon name="FileText" size={16} />
                <span className="text-sm font-medium">{message?.attachment?.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onFileDownload?.(message?.attachment)}
                  className="ml-auto"
                >
                  <Icon name="Download" size={14} />
                </Button>
              </div>
              {message?.content && <p className="text-sm">{message?.content}</p>}
            </div>
          );
        
        case 'product':
          return (
            <div className="space-y-2">
              {message?.content && <p className="text-sm">{message?.content}</p>}
              <div className="border border-border rounded-lg p-3 bg-card">
                <div className="flex space-x-3">
                  <Image
                    src={message?.attachment?.image}
                    alt={message?.attachment?.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {message?.attachment?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${message?.attachment?.price}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProductAction?.('view', message?.attachment)}
                      >
                        View
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onProductAction?.('add-to-cart', message?.attachment)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        
        default:
          return <p className="text-sm">{message?.content}</p>;
      }
    }

    return <p className="text-sm whitespace-pre-wrap">{message?.content}</p>;
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs">
          {message?.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={12} color="white" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              AI Assistant
            </span>
          </div>
        )}
        
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {renderMessageContent()}
          
          <div className={`flex items-center justify-between mt-2 ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
          }`}>
            <span className="text-xs">{formatTime(message?.timestamp)}</span>
            {message?.rating && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={message?.rating === 'helpful' ? 'ThumbsUp' : 'ThumbsDown'} 
                  size={12} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;