import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, ChevronDownIcon, EyeIcon, PrinterIcon, MoreHorizontalIcon, CalendarIcon } from 'lucide-react';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Order, PaginatedResponse } from '../../types';

export const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getAllOrders({
      status: filterStatus !== 'all' ? filterStatus : undefined,
      q: submittedSearchTerm || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      page,
      limit,
    });
  }, [filterStatus, submittedSearchTerm, dateFrom, dateTo, minPrice, maxPrice]);

  // API call for orders
  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    execute: fetchOrders,
    page: currentPage,
    limit: itemsPerPage,
    totalPages,
    goToPage,
    changeLimit,
  } = usePaginatedApi<Order>(
    apiCall,
    1,
    10,
    { showErrorToast: false, autoFetch: true }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    goToPage(1);
  };

  // Status options for filter
  const statusOptions = [{
    value: 'all',
    label: 'All Statuses'
  }, {
    value: 'pending',
    label: 'Pending'
  }, {
    value: 'confirmed',
    label: 'Confirmed'
  }, {
    value: 'shipped',
    label: 'Shipped'
  }, {
    value: 'delivered',
    label: 'Delivered'
  }, {
    value: 'cancelled',
    label: 'Cancelled'
  }];

  if (ordersError) {
    console.log("Orders API Error:", ordersError);
    return (
      <div className="p-6">
        <ErrorMessage
          error={ordersError}
          onRetry={() => fetchOrders()}
        />
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, orders.length);

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Orders</h1>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-1.5 bg-surface border border-border rounded-md text-sm">
            <CalendarIcon size={16} className="mr-2" />
            Last 30 Days
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm">
            Export
          </button>
        </div>
      </div>
      {/* Filters and search */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-6 border border-border-light">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input type="text" placeholder="Search orders by ID, customer name or email..." className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="appearance-none pl-3 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  {statusOptions.map(option => <option key={option.value} value={option.value}>
                      {option.label}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-copy-light mb-1 block">Date From</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Date To</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={dateTo} onChange={e => setDateTo(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Min Price</label>
                <input type="number" placeholder="0.00" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Max Price</label>
                <input type="number" placeholder="1000.00" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Orders table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left text-copy-light text-sm">
                <th className="py-3 px-4 font-medium">Order ID</th>
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Payment</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                // Loading skeleton
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-border-light animate-pulse">
                    <td className="py-3 px-4"><div className="w-20 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-surface-hover rounded-full mr-3"></div>
                        <div>
                          <div className="w-24 h-4 bg-surface-hover rounded mb-1"></div>
                          <div className="w-32 h-3 bg-surface-hover rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-6 bg-surface-hover rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-12 h-6 bg-surface-hover rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-8 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-surface-hover rounded"></div></td>
                  </tr>
                ))
              ) : (
                orders.map((order: Order) => (
                  <tr key={order.id} className="border-t border-border-light hover:bg-surface-hover">
                    <td className="py-3 px-4">
                      <Link to={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-full mr-3 flex items-center justify-center text-xs font-medium text-primary">
                          {order.user?.firstname?.[0] || order.user?.full_name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-main">
                            {order.user?.full_name || `${order.user?.firstname} ${order.user?.lastname}` || 'Unknown Customer'}
                          </p>
                          <p className="text-xs text-copy-light">
                            {order.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-copy-light">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-success/10 text-success' :
                        order.status === 'shipped' ? 'bg-info/10 text-info' :
                        order.status === 'processing' ? 'bg-warning/10 text-warning' :
                        'bg-error/10 text-error'
                      }`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Processing'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.payment_status === 'succeeded' ? 'bg-success/10 text-success' :
                        order.payment_status === 'pending' ? 'bg-warning/10 text-warning' :
                        'bg-error/10 text-error'
                      }`}>
                        {order.payment_status?.charAt(0).toUpperCase() + order.payment_status?.slice(1) || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">{order.items?.length || 0}</td>
                    <td className="py-3 px-4 font-medium text-main">
                      ${(order.total_amount || 0).toFixed(2)}
                    </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/admin/orders/${order.id}`} className="p-1 text-copy-light hover:text-primary" title="View">
                        <EyeIcon size={18} />
                      </Link>
                      <button className="p-1 text-copy-light hover:text-main" title="Print">
                        <PrinterIcon size={18} />
                      </button>
                      <div className="relative group">
                        <button className="p-1 text-copy-light hover:text-main">
                          <MoreHorizontalIcon size={18} />
                        </button>
                        <div className="absolute right-0 mt-1 hidden group-hover:block bg-surface rounded-md shadow-lg border border-border-light z-10 w-36">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Update Status
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Send Invoice
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Cancel Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>))
              )}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && !ordersLoading && (
          <div className="py-12 text-center text-copy-light">
            <p>No orders found</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{orders.length}</span> orders
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