import React, { useState, useRef, useEffect } from 'react';
import { useNavigate as useRouter } from "react-router-dom";
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState([
    "wireless headphones",
    "running shoes",
    "laptop bag",
    "coffee maker",
    "yoga mat"
  ]);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, text: "red dress for wedding", type: "suggestion" },
    { id: 2, text: "wireless bluetooth headphones", type: "suggestion" },
    { id: 3, text: "running shoes for women", type: "suggestion" },
    { id: 4, text: "laptop backpack waterproof", type: "suggestion" },
    { id: 5, text: "coffee maker automatic", type: "suggestion" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      onSearch(query);
      setShowSuggestions(false);
      // Add to recent searches (in real app, this would be stored)
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    handleSearch(suggestion?.text);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSearch();
  };

  const handleFocus = () => {
    if (searchQuery?.length === 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search products, brands, categories..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="w-full pl-10 pr-12"
        />
        <Icon
          name="Search"
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <Icon name="Search" size={16} />
        </Button>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchQuery?.length === 0 && recentSearches?.length > 0 && (
            <div className="p-3 border-b border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
              <div className="space-y-1">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick({ text: search })}
                    className="flex items-center w-full p-2 text-left hover:bg-muted rounded text-sm"
                  >
                    <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions?.length > 0 && (
            <div className="p-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 px-2">Suggestions</h4>
              {suggestions?.map((suggestion) => (
                <button
                  key={suggestion?.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center w-full p-2 text-left hover:bg-muted rounded text-sm"
                >
                  <Icon name="Search" size={14} className="mr-2 text-muted-foreground" />
                  <span className="flex-1">{suggestion?.text}</span>
                </button>
              ))}
            </div>
          )}

          {searchQuery?.length > 0 && suggestions?.length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No suggestions found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;