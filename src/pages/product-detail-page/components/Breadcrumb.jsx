import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Breadcrumb = ({ breadcrumbs }) => {
  const router = useRouter();

  const handleNavigate = (path) => {
    if (path) {
      router?.push(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router?.back()}
        className="p-1 hover:bg-muted rounded-full"
        aria-label="Go back"
      >
        <Icon name="ArrowLeft" size={18} />
      </Button>
      <div className="flex items-center space-x-2 overflow-x-auto">
        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground flex-shrink-0" />
            )}
            <button
              onClick={() => handleNavigate(crumb?.path)}
              className={`whitespace-nowrap hover:text-primary transition-colors ${
                index === breadcrumbs?.length - 1
                  ? 'text-foreground font-medium cursor-default'
                  : 'text-muted-foreground hover:underline'
              }`}
              disabled={index === breadcrumbs?.length - 1}
            >
              {crumb?.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;