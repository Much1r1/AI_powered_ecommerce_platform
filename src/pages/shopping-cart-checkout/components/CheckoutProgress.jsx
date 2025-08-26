import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, steps }) => {
  const getStepIcon = (step, index) => {
    if (index < currentStep) {
      return <Icon name="Check" size={16} className="text-success" />;
    } else if (index === currentStep) {
      return <Icon name={step?.icon} size={16} className="text-primary" />;
    } else {
      return <Icon name={step?.icon} size={16} className="text-muted-foreground" />;
    }
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Checkout Progress
      </h2>
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          
          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                    ${status === 'completed' 
                      ? 'bg-success border-success text-success-foreground' 
                      : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-background border-border text-muted-foreground'
                    }
                  `}
                >
                  {getStepIcon(step, index)}
                </div>
                
                {/* Step Label */}
                <div className="text-center">
                  <p
                    className={`
                      text-sm font-medium
                      ${status === 'completed' 
                        ? 'text-success' 
                        : status === 'current' ?'text-primary' :'text-muted-foreground'
                      }
                    `}
                  >
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step?.description}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {index < steps?.length - 1 && (
                <div className="flex-1 mx-4 mb-8">
                  <div
                    className={`
                      h-0.5 w-full
                      ${index < currentStep 
                        ? 'bg-success' :'bg-border'
                      }
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile Progress Bar */}
      <div className="mt-6 sm:hidden">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {steps?.length}</span>
          <span>{Math.round(((currentStep + 1) / steps?.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;