import React, { useEffect, useState } from 'react';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';
import { FilterIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
interface FilterOption {
  id: string;
  label: string;
  count: number;
}
interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}
interface PriceRange {
  min: number;
  max: number;
}
interface ProductFilterProps {
  categories: FilterGroup;
  brands: FilterGroup;
  ratings: FilterGroup;
  priceRange: PriceRange;
  loading?: boolean;
  onFilterChange: (filters: any) => void;
  className?: string;
  isMobile?: boolean;
}
export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  brands,
  ratings,
  priceRange,
  loading = false,
  onFilterChange,
  className,
  isMobile = false
}) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(priceRange.min);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange.max);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    ratings: true,
    price: true
  });
  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      brands: selectedBrands,
      ratings: selectedRatings,
      price: {
        min: minPrice,
        max: maxPrice
      }
    };
    onFilterChange(filters);
  }, [selectedCategories, selectedBrands, selectedRatings, minPrice, maxPrice, onFilterChange]);
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    }
  };
  const handleBrandChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, id]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== id));
    }
  };
  const handleRatingChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, id]);
    } else {
      setSelectedRatings(selectedRatings.filter(r => r !== id));
    }
  };
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  };
  const FilterSection = ({
    title,
    expanded,
    onToggle,
    children
  }: {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => <div className="mb-6">
      <div className="flex items-center justify-between cursor-pointer mb-2" onClick={onToggle}>
        <h3 className="text-lg font-semibold text-main">{title}</h3>
        {expanded ? <ChevronUpIcon size={20} className="text-gray-500" /> : <ChevronDownIcon size={20} className="text-gray-500" />}
      </div>
      {expanded && <div className="space-y-2">{children}</div>}
    </div>;
  const FilterSkeleton = () => <>
      <div className="mb-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
      <div className="mb-6">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
      <div className="mb-6">
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/5" />
        </div>
      </div>
    </>;
  return <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      {isMobile && <div className="p-4 border-b border-gray-200">
          <Button variant="outline" fullWidth leftIcon={<FilterIcon size={18} />} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>}
      <div className={cn('p-6', isMobile && !isOpen && 'hidden')}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-main">Filters</h2>
          {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0 || minPrice !== priceRange.min || maxPrice !== priceRange.max) && <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500">
              Clear all
            </Button>}
        </div>
        {loading ? <FilterSkeleton /> : <>
            <FilterSection title="Categories" expanded={expandedSections.categories} onToggle={() => toggleSection('categories')}>
              {categories.options.map(option => <div key={option.id} className="flex items-center">
                  <Checkbox id={`category-${option.id}`} checked={selectedCategories.includes(option.id)} onChange={e => handleCategoryChange(option.id, e.target.checked)} />
                  <label htmlFor={`category-${option.id}`} className="ml-2 text-gray-700 flex-grow">
                    {option.label}
                  </label>
                  <span className="text-xs text-gray-500">
                    ({option.count})
                  </span>
                </div>)}
            </FilterSection>
            <FilterSection title="Brands" expanded={expandedSections.brands} onToggle={() => toggleSection('brands')}>
              {brands.options.map(option => <div key={option.id} className="flex items-center">
                  <Checkbox id={`brand-${option.id}`} checked={selectedBrands.includes(option.id)} onChange={e => handleBrandChange(option.id, e.target.checked)} />
                  <label htmlFor={`brand-${option.id}`} className="ml-2 text-gray-700 flex-grow">
                    {option.label}
                  </label>
                  <span className="text-xs text-gray-500">
                    ({option.count})
                  </span>
                </div>)}
            </FilterSection>
            <FilterSection title="Rating" expanded={expandedSections.ratings} onToggle={() => toggleSection('ratings')}>
              {ratings.options.map(option => <div key={option.id} className="flex items-center">
                  <Checkbox id={`rating-${option.id}`} checked={selectedRatings.includes(option.id)} onChange={e => handleRatingChange(option.id, e.target.checked)} />
                  <label htmlFor={`rating-${option.id}`} className="ml-2 text-gray-700 flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      {'★'.repeat(parseInt(option.id))}
                      {'☆'.repeat(5 - parseInt(option.id))}
                    </div>
                    & Up
                  </label>
                </div>)}
            </FilterSection>
            <FilterSection title="Price Range" expanded={expandedSections.price} onToggle={() => toggleSection('price')}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} placeholder="Min" className="w-full" min={priceRange.min} max={maxPrice} />
                  <span className="text-gray-500">to</span>
                  <Input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} placeholder="Max" className="w-full" min={minPrice} max={priceRange.max} />
                </div>
                <input type="range" min={priceRange.min} max={priceRange.max} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </FilterSection>
            <Button variant="primary" fullWidth>
              Apply Filters
            </Button>
          </>}
      </div>
    </div>;
};