import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, onFileUpload, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!message?.trim() || isLoading || disabled) return;

    onSendMessage(message);
    setMessage('');
  };

  const handleFileSelect = (type) => {
    setShowAttachMenu(false);
    if (fileInputRef?.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '*/*';
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileUpload?.(file);
    }
    e.target.value = '';
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleSend = async (message) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
  
    const reply = await getAIResponse([
      ...messages,
      { role: "user", content: message }
    ]);
  
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  };
  
  return (
    <div className="p-4 border-t border-border bg-card">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Attachment Menu */}
        {showAttachMenu && (
          <div className="bg-muted rounded-lg p-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileSelect('image')}
                className="flex items-center justify-start"
              >
                <Icon name="Image" size={16} className="mr-2" />
                Upload Image
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileSelect('file')}
                className="flex items-center justify-start"
              >
                <Icon name="Paperclip" size={16} className="mr-2" />
                Attach File
              </Button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={disabled || isLoading}
              className="w-full min-h-[44px] max-h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
              rows={1}
            />
          </div>

          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              disabled={disabled || isLoading}
              aria-label="Attach file"
            >
              <Icon name="Paperclip" size={18} />
            </Button>

            <Button
              type="submit"
              size="icon"
              disabled={!message?.trim() || disabled || isLoading}
              loading={isLoading}
              aria-label="Send message"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default ChatInput;