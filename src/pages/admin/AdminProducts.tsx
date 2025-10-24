import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, EditIcon, TrashIcon, ChevronDownIcon, EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import { useCategories } from '../../contexts/CategoryContext';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Product, PaginatedResponse } from '../../types';

export const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [status, setStatus] = useState('all');
  const [supplier, setSupplier] = useState('');

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getAllProducts({
      search: submittedSearchTerm || undefined,
      category: filterCategory !== 'all' ? filterCategory : undefined,
      status: status !== 'all' ? status : undefined,
      supplier: supplier || undefined,
      page,
      limit,
    });
  }, [submittedSearchTerm, filterCategory, status, supplier]);

  // API calls
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
    page: currentPage,
    limit: itemsPerPage,
    totalPages,
    goToPage,
    changeLimit,
  } = usePaginatedApi<Product>(
    apiCall,
    1,
    10,
    { showErrorToast: false, autoFetch: true }
  );

  const { categories: categoriesData } = useCategories();

  const categories = categoriesData ? [
    { id: 'all', name: 'All Categories' },
    ...categoriesData.map(cat => ({ id: cat.name, name: cat.name }))
  ] : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    goToPage(1); // Reset to first page when searching
  };

  if (productsError) {
    console.log("Products API Error:", productsError);
    return (
      <div className="p-6">
        <ErrorMessage
          error={productsError}
          onRetry={() => fetchProducts()}
        />
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Products</h1>
        <Link to="/admin/products/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <PlusIcon size={18} className="mr-2" />
          Add Product
        </Link>
      </div>
      {/* Filters and search */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-6 border border-border-light">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="appearance-none pl-3 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  {categories.map(category => <option key={category.id} value={category.id}>
                      {category.name}
                    </option>)}
                </select>
                <ChevronDownIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-copy-light pointer-events-none" />
              </div>
              <button type="button" onClick={() => setShowMoreFilters(!showMoreFilters)} className="flex items-center px-3 py-2 border border-border rounded-md hover:bg-surface-hover text-copy">
                <FilterIcon size={18} className="mr-2" />
                More Filters
              </button>
              <button type="submit" className="flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                <SearchIcon size={18} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </form>
        {showMoreFilters && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-copy-light mb-1 block">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Supplier</label>
                <input type="text" placeholder="Supplier ID or name" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={supplier} onChange={e => setSupplier(e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Products table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left text-copy-light text-sm">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">SKU</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Variants</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsLoading ? (
                // Loading skeleton
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-border-light animate-pulse">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-surface-hover rounded-md mr-3"></div>
                        <div>
                          <div className="w-32 h-4 bg-surface-hover rounded mb-1"></div>
                          <div className="w-16 h-3 bg-surface-hover rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><div className="w-20 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-24 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-12 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-6 bg-surface-hover rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-8 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-surface-hover rounded"></div></td>
                  </tr>
                ))
              ) : (
                products.map((product: Product) => {
                  const primaryVariant = product.variants?.[0];
                  const totalStock = Array.isArray(product.variants)
                    ? product.variants.reduce((sum: number, variant) => sum + (variant.stock || 0), 0)
                    : 0;
                  const status = totalStock === 0 ? 'Out of Stock' : totalStock < 10 ? 'Low Stock' : 'Active';
                  
                  return (
                    <tr key={product.id} className="border-t border-border-light hover:bg-surface-hover">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img 
                            src={primaryVariant?.images?.[0]?.url || 'https://via.placeholder.com/100'} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-md object-cover mr-3" 
                          />
                          <div>
                            <p className="font-medium text-main">{product.name}</p>
                            <p className="text-xs text-copy-light">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-copy-light">{primaryVariant?.sku || 'N/A'}</td>
                      <td className="py-3 px-4 text-copy-light">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                      <td className="py-3 px-4">
                        {primaryVariant?.sale_price ? (
                          <div>
                            <span className="font-medium text-main">
                              ${primaryVariant.sale_price.toFixed(2)}
                            </span>
                            <span className="text-xs text-copy-light line-through ml-2">
                              ${primaryVariant.base_price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium text-main">
                            ${primaryVariant?.base_price?.toFixed(2) || '0.00'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-copy-light">{totalStock}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          status === 'Active' ? 'bg-success/10 text-success' :
                          status === 'Low Stock' ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link to={`/admin/products/${product.id}/variants`} className="text-primary hover:underline">
                          {product.variants?.length || 0}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/product/${product.id}`} className="p-1 text-copy-light hover:text-main" title="View">
                        <EyeIcon size={18} />
                      </Link>
                      <Link to={`/admin/products/${product.id}/edit`} className="p-1 text-copy-light hover:text-primary" title="Edit">
                        <EditIcon size={18} />
                      </Link>
                      <button className="p-1 text-copy-light hover:text-error" title="Delete">
                        <TrashIcon size={18} />
                      </button>
                      <div className="relative group">
                        <button className="p-1 text-copy-light hover:text-main">
                          <MoreHorizontalIcon size={18} />
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:block bg-surface rounded-md shadow-lg border border-border-light z-10 w-36">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Duplicate
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Add Variant
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Archive
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {products.length === 0 && !productsLoading && (
          <div className="py-12 text-center text-copy-light">
            <p>No products found</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{products.length}</span> products
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, pageNum) => (
                <button
                  key={pageNum + 1}
                  onClick={() => goToPage(pageNum + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === pageNum + 1
                      ? 'bg-primary text-white'
                      : 'border border-border text-copy hover:bg-surface-hover'
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded-md text-sm text-copy-light bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>;
};