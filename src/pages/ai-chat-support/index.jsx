import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import MessageBubble from "./components/MessageBubble";
import QuickActions from "./components/QuickActions";
import ChatInput from "./components/ChatInput";
import TypingIndicator from "./components/TypingIndicator";
import MessageRating from "./components/MessageRating";
import ChatSidebar from "./components/ChatSidebar";
import EscalationModal from "./components/EscalationModal";

const AIChatSupport = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: `👋 Hi! I’m your AI shopping assistant. I can help with:\n\n- 📦 Order tracking\n- 🛍 Product recommendations\n- 🔄 Returns & refunds\n- 👤 Account support\n- ⚙️ Tech help\n\nHow can I assist you today?`,
      timestamp: new Date(),
      agentName: "AI Assistant",
    },
  ]);

  const [agentInfo] = useState({
    name: "AI Commmerce Assistant",
    status: "Online • Ready to help",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content) => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");
    setShowQuickHelp(false); // hide quick help after first message
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "✅ Got it! Let me process that for you. (This is a mock AI response.)",
        timestamp: new Date(),
        agentName: "AI Commerce Assistant",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClose = () => navigate("/product-catalog-search");

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        chatHistory={[]} // inject real history here
        onSelectChat={() => {}}
        onNewChat={() => {}}
      />

      {/* Main Chat Container */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          showSidebar ? "ml-72" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-white dark:bg-gray-800 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label="Toggle chat history"
              >
                <Icon name="Menu" size={22} />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={agentInfo.avatar}
                  alt="Agent"
                  className="w-11 h-11 rounded-full object-cover shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {agentInfo.name}
                </p>
                <p className="text-sm text-gray-500">
                  {isTyping ? "Typing..." : agentInfo.status}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEscalationModal(true)}
              iconName="Users"
              className="rounded-lg"
            >
              Human Agent
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Close chat"
              className="rounded-lg"
            >
              <Icon name="X" size={22} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={'flex ${msg.type === "user" ? "justify-end" : "justify-start"}'}>
              <MessageBubble message={msg} />
              {msg.type === "ai" && (
                <MessageRating
                  messageId={msg.id}
                  onRating={() => {}}
                  className="ml-14 mt-2"
                />
              )}
            </div>
          ))}
          <TypingIndicator isVisible={isTyping} agentName={agentInfo.name} />
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (Collapsible) */}
        <div className="px-5 py-3 border-t bg-white dark:bg-gray-800 shadow-inner">
          <QuickActions onActionClick={() => {}} isLoading={isTyping} />
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isTyping}
            disabled={false}
          />
        </div>
      </div>

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={showEscalationModal}
        onClose={() => setShowEscalationModal(false)}
        onEscalate={() => {}}
        chatHistory={messages}
      />

      {/* Mobile FAB */}
      {isMobile && (
        <div className="fixed bottom-6 right-6">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowEscalationModal(true)}
            className="w-14 h-14 rounded-full shadow-xl"
          >
            <Icon name="Users" size={22} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIChatSupport;
