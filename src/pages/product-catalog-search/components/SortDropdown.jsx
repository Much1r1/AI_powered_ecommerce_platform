import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const current = sortOptions?.find(option => option?.value === sortBy);
    return current ? current?.label : 'Best Match';
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultsCount?.toLocaleString()} results
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="min-w-[160px] justify-between"
        >
          <span className="text-sm">Sort: {getCurrentSortLabel()}</span>
          <Icon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="ml-2"
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-lg z-40 animate-scale-in">
            <div className="py-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`flex items-center w-full px-4 py-2 text-left hover:bg-muted transition-colors ${
                    sortBy === option?.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon
                    name={option?.icon}
                    size={16}
                    className="mr-3"
                  />
                  <span className="text-sm">{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon
                      name="Check"
                      size={16}
                      className="ml-auto text-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;