import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    category: true,
    rating: true,
    availability: true
  });

  const [priceRange, setPriceRange] = useState({
    min: filters?.priceRange?.min || '',
    max: filters?.priceRange?.max || ''
  });

  const brands = [
    { id: 'apple', name: 'Apple', count: 45 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 67 },
    { id: 'adidas', name: 'Adidas', count: 52 },
    { id: 'sony', name: 'Sony', count: 29 },
    { id: 'lg', name: 'LG', count: 23 }
  ];

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 156 },
    { id: 'clothing', name: 'Clothing', count: 234 },
    { id: 'home', name: 'Home & Garden', count: 89 },
    { id: 'sports', name: 'Sports & Outdoors', count: 123 },
    { id: 'books', name: 'Books', count: 67 },
    { id: 'beauty', name: 'Beauty & Personal Care', count: 98 }
  ];

  const ratings = [
    { id: '4plus', label: '4 stars & up', value: 4, count: 89 },
    { id: '3plus', label: '3 stars & up', value: 3, count: 156 },
    { id: '2plus', label: '2 stars & up', value: 2, count: 203 },
    { id: '1plus', label: '1 star & up', value: 1, count: 234 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleBrandChange = (brandId, checked) => {
    const updatedBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter(id => id !== brandId);
    
    onFiltersChange({ ...filters, brands: updatedBrands });
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: updatedCategories });
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  const handlePriceRangeChange = () => {
    onFiltersChange({
      ...filters,
      priceRange: {
        min: priceRange?.min ? parseFloat(priceRange?.min) : null,
        max: priceRange?.max ? parseFloat(priceRange?.max) : null
      }
    });
  };

  const handleAvailabilityChange = (type, checked) => {
    onFiltersChange({
      ...filters,
      availability: {
        ...filters?.availability,
        [type]: checked
      }
    });
  };

  const clearAllFilters = () => {
    setPriceRange({ min: '', max: '' });
    onFiltersChange({});
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full p-2 text-left hover:bg-muted rounded"
      >
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon
          name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-muted-foreground"
        />
      </button>
      {expandedSections?.[section] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange?.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
              onBlur={handlePriceRangeChange}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange?.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
              onBlur={handlePriceRangeChange}
            />
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands" section="brand">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.name}
                checked={(filters?.brands || [])?.includes(brand?.id)}
                onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground">({brand?.count})</span>
            </div>
          ))}
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories" section="category">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.name}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground">({category?.count})</span>
            </div>
          ))}
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" section="rating">
          {ratings?.map((rating) => (
            <button
              key={rating?.id}
              onClick={() => handleRatingChange(rating?.value)}
              className={`flex items-center justify-between w-full p-2 rounded hover:bg-muted ${
                filters?.minRating === rating?.value ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(rating?.value)}
                </div>
                <span className="text-sm">{rating?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">({rating?.count})</span>
            </button>
          ))}
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" section="availability">
          <Checkbox
            label="In Stock"
            checked={filters?.availability?.inStock || false}
            onChange={(e) => handleAvailabilityChange('inStock', e?.target?.checked)}
          />
          <Checkbox
            label="On Sale"
            checked={filters?.availability?.onSale || false}
            onChange={(e) => handleAvailabilityChange('onSale', e?.target?.checked)}
          />
          <Checkbox
            label="Free Shipping"
            checked={filters?.availability?.freeShipping || false}
            onChange={(e) => handleAvailabilityChange('freeShipping', e?.target?.checked)}
          />
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border-r border-border">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-full max-w-sm bg-card border-r border-border animate-slide-in-from-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;