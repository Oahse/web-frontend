import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon, FilterIcon, XIcon, SortAscIcon, SortDescIcon, GridIcon, ListIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

interface SearchFilters {
  query: string;
  category: string;
  tags: string[];
  availability: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface ProductSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
  categories: Array<{ id: string; name: string; count: number }>;
  tags: Array<{ id: string; name: string; count: number }>;
  priceRange: { min: number; max: number };
  loading?: boolean;
  resultCount?: number;
  className?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSearch,
  onViewModeChange,
  viewMode,
  categories,
  tags,
  priceRange,
  loading = false,
  resultCount,
  className
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    tags: [],
    availability: '',
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    minRating: 0,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Debounced search
  const debouncedSearch = useCallback((newFilters: SearchFilters) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      onSearch(newFilters);
    }, 300);
    
    setSearchTimeout(timeout);
  }, [onSearch, searchTimeout]);

  useEffect(() => {
    debouncedSearch(filters);
  }, [filters, debouncedSearch]);

  const updateFilter = (key: keyof SearchFilters, value: string | number | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleTag = (tagId: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      tags: [],
      availability: '',
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating: 0,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const hasActiveFilters = filters.query || filters.category || filters.tags.length > 0 || 
    filters.availability || filters.minPrice !== priceRange.min || 
    filters.maxPrice !== priceRange.max || filters.minRating > 0;

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'created_at', label: 'Newest' },
    { value: 'popularity', label: 'Popularity' }
  ];

  const availabilityOptions = [
    { value: '', label: 'All' },
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'preorder', label: 'Pre-order' }
  ];

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {/* Main Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="flex-grow relative">
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products, variants, SKUs..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Category Filter */}
          <Select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="min-w-[150px]"
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map(category => ({
                value: category.id,
                label: `${category.name} (${category.count})`
              }))
            ]}
          />

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            leftIcon={<FilterIcon size={16} />}
            className={cn(hasActiveFilters && 'border-primary text-primary')}
          >
            Filters
            {hasActiveFilters && (
              <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {[filters.category, ...filters.tags, filters.availability].filter(Boolean).length + 
                 (filters.minPrice !== priceRange.min ? 1 : 0) + 
                 (filters.maxPrice !== priceRange.max ? 1 : 0) + 
                 (filters.minRating > 0 ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Results and View Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {resultCount !== undefined && (
              <span>
                {loading ? 'Searching...' : `${resultCount} products found`}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort Controls */}
            <Select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="text-sm"
              options={sortOptions.map(option => ({
                value: option.value,
                label: `Sort by ${option.label}`
              }))}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {filters.sortOrder === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="rounded-r-none"
              >
                <GridIcon size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="rounded-l-none border-l-0"
              >
                <ListIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <Select
                value={filters.availability}
                onChange={(e) => updateFilter('availability', e.target.value)}
                options={availabilityOptions}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                  min={priceRange.min}
                  max={filters.maxPrice}
                  className="text-sm"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                  min={filters.minPrice}
                  max={priceRange.max}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <Select
                value={filters.minRating.toString()}
                onChange={(e) => updateFilter('minRating', Number(e.target.value))}
                options={[
                  { value: '0', label: 'Any Rating' },
                  { value: '1', label: '1+ Stars' },
                  { value: '2', label: '2+ Stars' },
                  { value: '3', label: '3+ Stars' },
                  { value: '4', label: '4+ Stars' },
                  { value: '5', label: '5 Stars' }
                ]}
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm border transition-colors',
                      filters.tags.includes(tag.id)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    )}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              
              {filters.query && (
                <span className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md text-sm">
                  Search: "{filters.query}"
                  <button
                    onClick={() => updateFilter('query', '')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={14} />
                  </button>
                </span>
              )}

              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md text-sm">
                  Category: {categories.find(c => c.id === filters.category)?.name}
                  <button
                    onClick={() => updateFilter('category', '')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={14} />
                  </button>
                </span>
              )}

              {filters.tags.map(tagId => {
                const tag = tags.find(t => t.id === tagId);
                return tag ? (
                  <span key={tagId} className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md text-sm">
                    Tag: {tag.name}
                    <button
                      onClick={() => toggleTag(tagId)}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <XIcon size={14} />
                    </button>
                  </span>
                ) : null;
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};