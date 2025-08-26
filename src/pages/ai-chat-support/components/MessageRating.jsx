import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageRating = ({ messageId, onRating, className = '' }) => {
  const [rated, setRated] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleRating = (rating) => {
    setRated(rating);
    setShowFeedback(true);
    onRating?.(messageId, rating, feedback);
  };

  const handleFeedbackSubmit = () => {
    onRating?.(messageId, rated, feedback);
    setShowFeedback(false);
  };

  if (rated && !showFeedback) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-xs text-muted-foreground">
          Thanks for your feedback!
        </span>
        <Icon 
          name={rated === 'helpful' ? 'ThumbsUp' : 'ThumbsDown'} 
          size={12} 
          className="text-muted-foreground"
        />
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {!rated && (
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRating('helpful')}
            className="h-6 w-6"
            aria-label="Mark as helpful"
          >
            <Icon name="ThumbsUp" size={12} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRating('not-helpful')}
            className="h-6 w-6"
            aria-label="Mark as not helpful"
          >
            <Icon name="ThumbsDown" size={12} />
          </Button>
        </div>
      )}
      {showFeedback && (
        <div className="space-y-2">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e?.target?.value)}
            placeholder="Tell us how we can improve..."
            className="w-full p-2 text-xs border border-border rounded resize-none bg-background text-foreground placeholder:text-muted-foreground"
            rows={2}
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFeedbackSubmit}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFeedback(false)}
            >
              Skip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRating;