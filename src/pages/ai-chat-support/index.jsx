import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import QuickActions from './components/QuickActions';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import MessageRating from './components/MessageRating';
import ChatSidebar from './components/ChatSidebar';
import EscalationModal from './components/EscalationModal';

const AIChatSupport = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI shopping assistant. I'm here to help you with:\n\n• Order tracking and updates\n• Product recommendations\n• Return and refund policies\n• Account assistance\n• Technical support\n\nHow can I assist you today?`,
      timestamp: new Date(Date.now() - 300000),
      agentName: 'AI Assistant'
    }
  ]);

  // Mock chat history
  const [chatHistory] = useState([
    {
      id: 'chat-1',
      title: 'Order Tracking Help',
      createdAt: new Date(Date.now() - 86400000),
      lastMessage: {
        content: 'Your order #12345 has been shipped',
        timestamp: new Date(Date.now() - 86400000)
      },
      messageCount: 8,
      unreadCount: 0
    },
    {
      id: 'chat-2',
      title: 'Product Recommendation',
      createdAt: new Date(Date.now() - 172800000),
      lastMessage: {
        content: 'I found some great wireless headphones for you',
        timestamp: new Date(Date.now() - 172800000)
      },
      messageCount: 12,
      unreadCount: 2
    }
  ]);

  // Mock agent info
  const [agentInfo] = useState({
    name: 'AI Assistant',
    status: 'Online • Ready to help',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face'
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date(),
        agentName: 'AI Assistant'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput?.toLowerCase();
    
    if (input?.includes('order') || input?.includes('track')) {
      return `I can help you track your order! Please provide your order number, or I can look up recent orders from your account.\n\nYour recent orders:\n• Order #ORD-2024-001 - Shipped (Arriving Dec 25)\n• Order #ORD-2024-002 - Processing\n\nWould you like details on any of these orders?`;
    }
    
    if (input?.includes('return') || input?.includes('refund')) {
      return `Our return policy allows returns within 30 days of purchase for most items.\n\nHere's what you need to know:\n• Items must be in original condition\n• Free return shipping for defective items\n• Refunds processed within 5-7 business days\n\nWould you like me to start a return for a specific item?`;
    }
    
    if (input?.includes('product') || input?.includes('recommend')) {
      return {
        content: "Based on your browsing history, I found some products you might like:",
        attachment: {
          type: 'product',
          name: 'Wireless Bluetooth Headphones',
          price: '89.99',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
          id: 'prod-123'
        }
      };
    }
    
    if (input?.includes('account') || input?.includes('login')) {
      return `I can help you with account-related issues:\n\n• Password reset\n• Email updates\n• Address changes\n• Payment method updates\n• Account security\n\nWhat specific account help do you need?`;
    }

    const responses = [
      "I understand your concern. Let me help you with that. Could you provide more details about the specific issue you're experiencing?",
      "That's a great question! I'm here to assist you. Based on what you've shared, here are some options we can explore together.",
      "I\'d be happy to help you resolve this. Let me gather some information to provide you with the most accurate assistance.",
      "Thank you for reaching out! I can definitely help with that. Let me walk you through the best solution for your situation.",
      "I see what you\'re looking for. Let me provide you with some helpful information and next steps."
    ];
    
    return responses?.[Math.floor(Math.random() * responses?.length)];
  };

  const handleQuickAction = (actionId, actionLabel) => {
    let message = '';
    
    switch (actionId) {
      case 'track-order':
        message = 'I need help tracking my order';
        break;
      case 'return-policy':
        message = 'What is your return policy?';
        break;
      case 'product-help':
        message = 'I need help with a product';
        break;
      case 'account-help':
        message = 'I need help with my account';
        break;
      case 'query':
        message = actionLabel;
        break;
      default:
        message = actionLabel;
    }
    
    handleSendMessage(message);
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: Date.now(),
      type: 'user',
      content: `Uploaded: ${file?.name}`,
      timestamp: new Date(),
      attachment: {
        type: file?.type?.startsWith('image/') ? 'image' : 'file',
        name: file?.name,
        url: URL.createObjectURL(file),
        size: file?.size
      }
    };

    setMessages(prev => [...prev, fileMessage]);

    // Simulate AI response to file upload
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: file?.type?.startsWith('image/') 
          ? "I can see the image you've shared. Let me analyze it and provide assistance based on what I observe." :"I\'ve received your file. Let me review the information and get back to you with relevant assistance.",
        timestamp: new Date(),
        agentName: 'AI Assistant'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleProductAction = (action, product) => {
    if (action === 'view') {
      navigate('/product-detail-page');
    } else if (action === 'add-to-cart') {
      // Simulate add to cart
      const confirmMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Great choice! I've added "${product?.name}" to your cart. Would you like to continue shopping or proceed to checkout?`,
        timestamp: new Date(),
        agentName: 'AI Assistant'
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleMessageRating = (messageId, rating, feedback) => {
    setMessages(prev => prev?.map(msg => 
      msg?.id === messageId 
        ? { ...msg, rating, feedback }
        : msg
    ));
  };

  const handleEscalation = (escalationData) => {
    const escalationMessage = {
      id: Date.now(),
      type: 'system',
      content: `Connecting you to a human agent... Ticket #${escalationData?.ticketId} created.`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, escalationMessage]);

    setTimeout(() => {
      const agentMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Hello! I'm Sarah from customer support. I've reviewed your chat history and I'm here to help with your ${escalationData?.reason?.replace('-', ' ')} issue. How can I assist you further?`,
        timestamp: new Date(),
        agentName: 'Sarah (Human Agent)'
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 3000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        content: `Hello! I'm your AI shopping assistant. I'm here to help you with:\n\n• Order tracking and updates\n• Product recommendations\n• Return and refund policies\n• Account assistance\n• Technical support\n\nHow can I assist you today?`,
        timestamp: new Date(),
        agentName: 'AI Assistant'
      }
    ]);
    setShowSidebar(false);
  };

  const handleClose = () => {
    navigate('/product-catalog-search');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-50">
          <ChatHeader
            isMinimized={false}
            onClose={handleClose}
            onToggleMinimize={() => setIsMinimized(!isMinimized)}
            agentInfo={agentInfo}
            isTyping={isTyping}
            showMobileHeader={true}
          />
        </div>
      )}
      <div className="flex h-screen">
        {/* Sidebar */}
        <ChatSidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          chatHistory={chatHistory}
          onSelectChat={(chatId) => console.log('Select chat:', chatId)}
          onNewChat={handleNewChat}
          currentChatId="current"
        />

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${showSidebar ? 'ml-80' : ''} transition-all duration-300`}>
          {/* Desktop Header */}
          {!isMobile && (
            <div className="border-b border-border bg-card">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSidebar(!showSidebar)}
                    aria-label="Toggle chat history"
                  >
                    <Icon name="Menu" size={20} />
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="Bot" size={20} color="white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-foreground">
                        AI Chat Support
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {isTyping ? 'AI is typing...' : 'Online • Ready to help'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEscalationModal(true)}
                    iconName="Users"
                    iconPosition="left"
                  >
                    Human Agent
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    aria-label="Close chat"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div key={message?.id}>
                <MessageBubble
                  message={message}
                  onProductAction={handleProductAction}
                  onFileDownload={(file) => console.log('Download file:', file)}
                />
                {message?.type === 'ai' && (
                  <MessageRating
                    messageId={message?.id}
                    onRating={handleMessageRating}
                    className="ml-12 mt-2"
                  />
                )}
              </div>
            ))}

            <TypingIndicator 
              isVisible={isTyping} 
              agentName={agentInfo?.name}
            />

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <QuickActions
            onActionClick={handleQuickAction}
            isLoading={isTyping}
          />

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            isLoading={isTyping}
            disabled={false}
          />
        </div>
      </div>
      {/* Escalation Modal */}
      <EscalationModal
        isOpen={showEscalationModal}
        onClose={() => setShowEscalationModal(false)}
        onEscalate={handleEscalation}
        chatHistory={messages}
      />
      {/* Mobile Floating Action Button */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowEscalationModal(true)}
            className="w-12 h-12 rounded-full shadow-lg"
            aria-label="Connect to human agent"
          >
            <Icon name="Users" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIChatSupport;