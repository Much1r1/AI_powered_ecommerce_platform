import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AIChatInterface = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m your AI shopping assistant. How can I help you find the perfect product today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      "I\'d be happy to help you find that! Let me search our catalog for the best options.",
      "Based on your preferences, I can recommend some great products. Would you like to see them?",
      "That\'s a great choice! I can help you compare similar products or find the best deals.",
      "I understand what you\'re looking for. Let me guide you to the perfect product match.",
      "Excellent question! I can provide detailed information and help you make the best decision."
    ];
    return responses?.[Math.floor(Math.random() * responses?.length)];
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef?.current?.focus(), 100);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'search': router?.push('/product-catalog-search');
        break;
      case 'orders': router?.push('/customer-dashboard');
        break;
      case 'support': router?.push('/ai-chat-support');
        break;
      default:
        break;
    }
  };

  const quickActions = [
    { label: 'Search Products', action: 'search', icon: 'Search' },
    { label: 'My Orders', action: 'orders', icon: 'Package' },
    { label: 'Get Support', action: 'support', icon: 'HelpCircle' }
  ];

  return (
    <>
      {/* Chat Bubble */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-80">
        <Button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full shadow-lg micro-scale ${
            isOpen ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
          }`}
          aria-label="Toggle AI chat assistant"
        >
          <Icon name={isOpen ? 'X' : 'MessageCircle'} size={24} />
        </Button>
      </div>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[500px] z-80 animate-scale-in">
          <div className="h-full bg-card border border-border rounded-none md:rounded-lg card-elevation flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground md:rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={18} color="currentColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-primary-foreground hover:bg-primary-foreground/20 md:hidden"
                aria-label="Close chat"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message?.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message?.timestamp?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2 mb-3">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action?.action)}
                    className="flex-1 text-xs"
                  >
                    <Icon name={action?.icon} size={14} className="mr-1" />
                    {action?.label}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e?.target?.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputMessage?.trim()}
                  aria-label="Send message"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-70 md:hidden" onClick={toggleChat} />
      )}
    </>
  );
};

export default AIChatInterface;