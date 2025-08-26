import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  isMinimized, 
  onToggleMinimize, 
  onClose, 
  agentInfo, 
  isTyping,
  showMobileHeader = false 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground border-b border-primary/20">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="currentColor" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-primary"></div>
        </div>
        <div>
          <h3 className="font-semibold text-sm">
            {agentInfo?.name || 'AI Assistant'}
          </h3>
          <p className="text-xs opacity-90">
            {isTyping ? 'Typing...' : agentInfo?.status || 'Online • Ready to help'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {!showMobileHeader && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMinimize}
            className="text-primary-foreground hover:bg-primary-foreground/20"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <Icon name={isMinimized ? "Maximize2" : "Minimize2"} size={18} />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20"
          aria-label="Close chat"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;