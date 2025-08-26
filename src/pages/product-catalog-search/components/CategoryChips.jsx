import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {category?.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChips;