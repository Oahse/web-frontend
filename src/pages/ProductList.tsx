import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SearchIcon,
  FilterIcon,
  XIcon,
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { ProductsAPI } from '../apis';
import { Product, ProductFilters, PaginatedResponse } from '../types';
import ErrorMessage from '../components/common/ErrorMessage';
import { Select } from '../components/forms/Select';
import { RatingFilter } from '../components/forms/RatingFilter';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { useCategories } from '../contexts/CategoryContext';

const ProductCard = lazy(() =>
  import('../components/product/ProductCard').then((module) => ({ default: module.ProductCard }))
);

// Loading placeholder
const ProductCardSkeleton = () => (
  <div className="bg-surface rounded-lg overflow-hidden shadow-sm border border-border-light animate-pulse">
    <div className="h-48 bg-border"></div>
    <div className="p-4">
      <div className="h-4 bg-border rounded mb-2"></div>
      <div className="h-4 bg-border rounded w-2/3 mb-4"></div>
      <div className="h-6 bg-border rounded w-1/3"></div>
    </div>
  </div>
);

// Transform API product data to component format
const transformProduct = (product: Product): unknown => ({
  id: String(product.id),
  name: product.name,
  price: product.variants?.[0]?.base_price || 0,
  discountPrice: product.variants?.[0]?.sale_price || null,
  rating: product.rating || 0,
  reviewCount: product.review_count || 0,
  image: product.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  category: product.category?.name || 'General',
  isNew: false,
  isFeatured: product.featured,
  variants: product.variants?.map(v => ({
    ...v,
    id: String(v.id),
    product_id: String(v.product_id),
    images: v.images?.map(img => ({
      ...img,
      id: String(img.id),
      variant_id: String(img.variant_id),
    })) || [],
  })),
});


export const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryParam = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentCategoryParam ? currentCategoryParam.split(',') : []
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState('created_at:desc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // New state for mobile filter sidebar

  // Cart and Wishlist contexts are used directly in ProductCard component

  // API calls
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useApi<PaginatedResponse<Product>>();

  const { categories: categoriesData, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Build search parameters for API call
  const buildSearchParams = useCallback((): ProductFilters => {
    const [sortBy, sortOrder] = sortOption.split(':') as [string, 'asc' | 'desc'];

    return {
      q: searchQuery || undefined,
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
      min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
      max_price: priceRange[1] < 1000 ? priceRange[1] : undefined,
      rating: ratingRange[0] > 0 ? ratingRange[0] : undefined,
      sort_by: sortBy as ProductFilters['sort_by'],
      sort_order: sortOrder,
      page: currentPage,
      limit: 12,
    };
  }, [searchQuery, selectedCategories, sortOption, priceRange, ratingRange, currentPage]);

  // Fetch products when search parameters change
  useEffect(() => {
    const searchParams = buildSearchParams();
    fetchProducts(() => ProductsAPI.getProducts(searchParams));
  }, [buildSearchParams, fetchProducts]);

  // Handle search and filter changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('q', query);
    } else {
      newSearchParams.delete('q');
    }
    setSearchParams(newSearchParams);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
    let newSelectedCategories;
    if (isChecked) {
      newSelectedCategories = [...selectedCategories, categoryName];
    } else {
      newSelectedCategories = selectedCategories.filter(cat => cat !== categoryName);
    }
    setSelectedCategories(newSelectedCategories);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSelectedCategories.length > 0) {
      newSearchParams.set('category', newSelectedCategories.join(','));
    } else {
      newSearchParams.delete('category');
    }
    setSearchParams(newSearchParams);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  const handleRatingRangeChange = (newMin: number, newMax: number) => {
    setRatingRange([newMin, newMax]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transform products for display
  const displayProducts = productsData?.data?.map(transformProduct) || [];

  const getCategoryDisplayName = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (selectedCategories.length > 0) return selectedCategories.join(', ');
    return 'All Products';
  };

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
  ];

  if (searchQuery) {
    breadcrumbs.push({ label: `Search: "${searchQuery}"`, link: '' });
  }

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-main mb-2">{getCategoryDisplayName()}</h1>
          <p className="text-copy-light">
            {productsData ?
              `${productsData.total} products found` :
              'Loading products...'
            }
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          {/* Search Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-copy pr-10"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.currentTarget.value);
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleSearch(searchQuery)}
              className="bg-primary text-white px-3 py-3 rounded-r-md hover:bg-primary-dark transition-colors h-full flex items-center justify-center"
            >
              <SearchIcon size={20} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <Select
            id="sort-option"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            options={[
              { value: 'created_at:desc', label: 'Newest First' },
              { value: 'created_at:asc', label: 'Oldest First' },
              { value: 'name:asc', label: 'Name A-Z' },
              { value: 'name:desc', label: 'Name Z-A' },
              { value: 'price:asc', label: 'Price Low to High' },
              { value: 'price:desc', label: 'Price High to Low' },
              { value: 'rating:desc', label: 'Rating High to Low' },
              { value: 'rating:asc', label: 'Rating Low to High' }
            ]}
            className="px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-copy"
          />

          {/* Mobile Filter Button */}
          <button
            className="lg:hidden p-2 rounded-md bg-primary text-white flex items-center justify-center"
            onClick={() => setIsFilterSidebarOpen(true)}
          >
            <FilterIcon size={20} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Mobile Toggle */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-surface z-[999] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-64 lg:flex-shrink-0`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="font-semibold text-lg text-copy">Filters</h2>
            <button onClick={() => setIsFilterSidebarOpen(false)} className="p-2 rounded-md hover:bg-surface-hover">
              <XIcon size={20} />
            </button>
          </div>
          <div className="p-6 lg:sticky lg:top-4">
            <h2 className="font-semibold text-lg text-copy mb-4 hidden lg:block">Filters</h2>

            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-copy mb-3">Categories</h3>
              {categoriesLoading ? (
                <div className="space-y-2">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-4 bg-surface-disabled rounded animate-pulse"></div>
                  ))}
                </div>
              ) : categoriesError ? (
                <ErrorMessage
                  error={categoriesError}
                  onRetry={() => { /* Categories are now fetched globally, no retry here */ }}
                />
              ) : categoriesData ? (
                <div className="space-y-2">
                  {categoriesData.slice(0, 10).map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={(e) => handleCategoryChange(cat.name, e.target.checked)}
                        className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-copy">{cat.name}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-copy mb-3">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-20 px-2 py-1 border border-border rounded text-sm bg-surface text-copy"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
                  className="w-20 px-2 py-1 border border-border rounded text-sm bg-surface text-copy"
                />
              </div>
            </div>

            {/* Rating Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-copy mb-3">Rating Range</h3>
              <RatingFilter
                minRating={ratingRange[0]}
                maxRating={ratingRange[1]}
                onChange={handleRatingRangeChange}
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchParams({});
                setCurrentPage(1);
                setPriceRange([0, 1000]);
                setRatingRange([0, 5]);
                setSelectedCategories([]);
              }}
              className="w-full px-4 py-2 text-sm text-copy-light border border-border rounded-md hover:bg-surface-hover"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Error Message */}
          {productsError && (
            <ErrorMessage
              error={productsError}
              onRetry={() => fetchProducts(() => ProductsAPI.getProducts(buildSearchParams()))}
              className="mb-6"
            />
          )}

          {/* Products Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsLoading ? (
              Array(12).fill(0).map((_, index) => <ProductCardSkeleton key={index} />)
            ) : displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                  <ProductCard
                    product={product}
                  />
                </Suspense>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-copy-muted mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-copy mb-2">No products found</h3>
                <p className="text-copy-light mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchParams({});
                    setCurrentPage(1);
                    setPriceRange([0, 1000]);
                    setRatingRange([0, 5]);
                    setSelectedCategories([]);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {productsData && productsData.total_pages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, productsData.total_pages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md ${page === currentPage
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border text-copy hover:bg-surface-hover'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === productsData.total_pages}
                className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sidebar Backdrop */}
      {isFilterSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ProductList;