import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatSidebar = ({ 
  isOpen, 
  onClose, 
  chatHistory, 
  onSelectChat, 
  onNewChat,
  currentChatId 
}) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString();
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (message?.length <= maxLength) return message;
    return message?.substring(0, maxLength) + '...';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* New Chat Button */}
      <div className="p-4 border-b border-border">
        <Button
          variant="default"
          fullWidth
          onClick={onNewChat}
          iconName="Plus"
          iconPosition="left"
        >
          New Chat
        </Button>
      </div>
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatHistory?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No chat history yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start a conversation to see your chats here
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {chatHistory?.map((chat) => (
              <Button
                key={chat?.id}
                variant={currentChatId === chat?.id ? "secondary" : "ghost"}
                onClick={() => onSelectChat(chat?.id)}
                className="w-full justify-start p-3 h-auto text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {chat?.title || 'Untitled Chat'}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatDate(chat?.lastMessage?.timestamp || chat?.createdAt)}
                    </span>
                  </div>
                  {chat?.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate">
                      {truncateMessage(chat?.lastMessage?.content)}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {chat?.messageCount || 0} messages
                    </span>
                    {chat?.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {chat?.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} />
          <span>Your conversations are secure and private</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;