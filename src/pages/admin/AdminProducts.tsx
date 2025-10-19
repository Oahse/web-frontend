import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, EditIcon, TrashIcon, ChevronDownIcon, EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import { useCategories } from '../../contexts/CategoryContext';
import ErrorMessage from '../../components/common/ErrorMessage';

export const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // API calls
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useApi<any>({ showErrorToast: false });

  const { categories: categoriesData } = useCategories();

  useEffect(() => {
    // Fetch products
    fetchProducts(() => AdminAPI.getAllProducts({
      search: searchTerm || undefined,
      category: filterCategory !== 'all' ? filterCategory : undefined,
      page: currentPage,
      limit: 10
    }));
  }, [searchTerm, filterCategory, currentPage, fetchProducts]);

  // Fallback data
  const fallbackProducts = [{
    id: '1',
    name: 'Organic Shea Butter',
    price: 12.99,
    discountPrice: 9.99,
    category: 'Oilseeds',
    categoryId: 'oilseeds',
    stock: 45,
    sku: 'SHE-BTR-001',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Active',
    variants: 3
  }, {
    id: '2',
    name: 'Premium Arabica Coffee',
    price: 18.99,
    discountPrice: null,
    category: 'Beverages',
    categoryId: 'nuts-beverages',
    stock: 32,
    sku: 'ARB-COF-002',
    image: 'https://images.unsplash.com/photo-1559525839-8f27c16df8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Active',
    variants: 2
  }, {
    id: '3',
    name: 'Organic Quinoa',
    price: 8.99,
    discountPrice: 6.99,
    category: 'Cereal Crops',
    categoryId: 'cereal-crops',
    stock: 78,
    sku: 'ORG-QNO-003',
    image: 'https://images.unsplash.com/photo-1612257999968-a42df8159183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Active',
    variants: 1
  }, {
    id: '4',
    name: 'Moringa Powder',
    price: 15.99,
    discountPrice: null,
    category: 'Herbs',
    categoryId: 'spices-herbs',
    stock: 12,
    sku: 'MOR-PWD-004',
    image: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Low Stock',
    variants: 0
  }, {
    id: '5',
    name: 'Organic Baobab Powder',
    price: 14.99,
    discountPrice: 11.99,
    category: 'Superfoods',
    categoryId: 'spices-herbs',
    stock: 27,
    sku: 'BAO-PWD-005',
    image: 'https://images.unsplash.com/photo-1611808786599-82da0b05969e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Active',
    variants: 1
  }, {
    id: '6',
    name: 'African Black Soap',
    price: 9.99,
    discountPrice: null,
    category: 'Personal Care',
    categoryId: 'spices-herbs',
    stock: 0,
    sku: 'BLK-SOP-006',
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'Out of Stock',
    variants: 4
  }];

  // Use API data or fallback
  const products = productsData?.data || fallbackProducts;
  const categories = categoriesData ? [
    { id: 'all', name: 'All Categories' },
    ...categoriesData.map(cat => ({ id: cat.id, name: cat.name }))
  ] : [{
    id: 'all',
    name: 'All Categories'
  }, {
    id: 'cereal-crops',
    name: 'Cereal Crops'
  }, {
    id: 'legumes',
    name: 'Legumes'
  }, {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables'
  }, {
    id: 'oilseeds',
    name: 'Oilseeds'
  }, {
    id: 'spices-herbs',
    name: 'Spices and Herbs'
  }, {
    id: 'nuts-beverages',
    name: 'Nuts & Beverages'
  }];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  if (productsError) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={productsError}
          onRetry={() => fetchProducts(() => AdminAPI.getAllProducts({
            search: searchTerm || undefined,
            category: filterCategory !== 'all' ? filterCategory : undefined,
            page: currentPage,
            limit: 10
          }))}
        />
      </div>
    );
  }

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Products</h1>
        <Link to="/admin/products/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <PlusIcon size={18} className="mr-2" />
          Add Product
        </Link>
      </div>
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                {categories.map(category => <option key={category.id} value={category.id}>
                    {category.name}
                  </option>)}
              </select>
              <ChevronDownIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button type="submit" className="flex items-center px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
              <SearchIcon size={18} className="mr-2" />
              Search
            </button>
            <button type="button" className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <FilterIcon size={18} className="mr-2" />
              More Filters
            </button>
          </div>
        </form>
      </div>
      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm">
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
                  <tr key={index} className="border-t border-gray-100 animate-pulse">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                        <div>
                          <div className="w-32 h-4 bg-gray-200 rounded mb-1"></div>
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-24 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-12 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-6 bg-gray-200 rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-8 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-gray-200 rounded"></div></td>
                  </tr>
                ))
              ) : (
                products.map((product: any) => {
                  const primaryVariant = product.variants?.[0];
                  const totalStock = product.variants?.reduce((sum: any, variant: any) => sum + (variant.stock || 0), 0) || 0;
                  const status = totalStock === 0 ? 'Out of Stock' : totalStock < 10 ? 'Low Stock' : 'Active';
                  
                  return (
                    <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img 
                            src={primaryVariant?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-md object-cover mr-3" 
                          />
                          <div>
                            <p className="font-medium text-main">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{primaryVariant?.sku || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                      <td className="py-3 px-4">
                        {primaryVariant?.sale_price ? (
                          <div>
                            <span className="font-medium text-main">
                              ${primaryVariant.sale_price.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 line-through ml-2">
                              ${primaryVariant.base_price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium text-main">
                            ${primaryVariant?.base_price?.toFixed(2) || '0.00'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{totalStock}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          status === 'Active' ? 'bg-green-100 text-green-800' : 
                          status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
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
                      <Link to={`/product/${product.id}`} className="p-1 text-gray-500 hover:text-main" title="View">
                        <EyeIcon size={18} />
                      </Link>
                      <Link to={`/admin/products/${product.id}/edit`} className="p-1 text-gray-500 hover:text-primary" title="Edit">
                        <EditIcon size={18} />
                      </Link>
                      <button className="p-1 text-gray-500 hover:text-red-500" title="Delete">
                        <TrashIcon size={18} />
                      </button>
                      <div className="relative group">
                        <button className="p-1 text-gray-500 hover:text-main">
                          <MoreHorizontalIcon size={18} />
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:block bg-white rounded-md shadow-lg border border-gray-200 z-10 w-36">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Duplicate
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Add Variant
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
        {products.length === 0 && <div className="py-12 text-center">
            <p className="text-gray-500">No products found</p>
          </div>}
      </div>
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">{products.length}</span> of{' '}
          <span className="font-medium">{products.length}</span> products
        </p>
        <div className="flex items-center space-x-2">
          <button disabled className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-400 bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>;
};