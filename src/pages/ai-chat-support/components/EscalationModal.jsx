import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EscalationModal = ({ isOpen, onClose, onEscalate, chatHistory }) => {
  const [formData, setFormData] = useState({
    reason: '',
    priority: 'medium',
    description: '',
    contactMethod: 'chat'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasonOptions = [
    { value: 'technical-issue', label: 'Technical Issue' },
    { value: 'billing-question', label: 'Billing Question' },
    { value: 'product-defect', label: 'Product Defect' },
    { value: 'shipping-problem', label: 'Shipping Problem' },
    { value: 'account-access', label: 'Account Access' },
    { value: 'refund-request', label: 'Refund Request' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'medium', label: 'Medium - Standard support' },
    { value: 'high', label: 'High - Urgent issue' },
    { value: 'critical', label: 'Critical - System down' }
  ];

  const contactOptions = [
    { value: 'chat', label: 'Continue in chat' },
    { value: 'email', label: 'Email support' },
    { value: 'phone', label: 'Phone call' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onEscalate({
        ...formData,
        chatHistory,
        timestamp: new Date()?.toISOString(),
        ticketId: `TICKET-${Date.now()}`
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-lg card-elevation animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Connect with Human Agent
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              We'll transfer you to a human agent who can provide specialized assistance
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Select
            label="What do you need help with?"
            options={reasonOptions}
            value={formData?.reason}
            onChange={(value) => handleInputChange('reason', value)}
            required
            placeholder="Select a reason"
          />

          <Select
            label="Priority Level"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => handleInputChange('priority', value)}
            required
          />

          <Input
            label="Additional Details"
            type="textarea"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Please provide more details about your issue..."
            rows={3}
            required
          />

          <Select
            label="Preferred Contact Method"
            options={contactOptions}
            value={formData?.contactMethod}
            onChange={(value) => handleInputChange('contactMethod', value)}
            required
          />

          {/* Info Box */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">What happens next?</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Your chat history will be shared with the agent</li>
                  <li>• Average response time: 2-5 minutes</li>
                  <li>• You'll receive a ticket number for reference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="flex-1"
            >
              Connect to Agent
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalationModal;