import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ isVisible, agentName = 'AI Assistant' }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={12} color="white" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {agentName}
          </span>
        </div>
        
        <div className="bg-muted text-muted-foreground p-3 rounded-lg">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
              <div 
                className="w-2 h-2 bg-current rounded-full animate-bounce" 
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div 
                className="w-2 h-2 bg-current rounded-full animate-bounce" 
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
            <span className="text-xs ml-2">typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;