import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon, FilterIcon, MoreHorizontalIcon, TrashIcon, EditIcon, CheckCircleIcon, XCircleIcon, UserPlusIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { User, PaginatedResponse } from '../../types';

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'customer' | 'supplier' | 'admin'>('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [verified, setVerified] = useState<'all' | 'true' | 'false'>('all');

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getUsers({
      role: filterRole !== 'all' ? filterRole : undefined,
      search: submittedSearchTerm || undefined,
      status: status !== 'all' ? status : undefined,
      verified: verified !== 'all' ? (verified === 'true') : undefined,
      page,
      limit,
    });
  }, [filterRole, submittedSearchTerm, status, verified]);

  // API call for users
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    execute: fetchUsers,
    page: currentPage,
    limit: itemsPerPage,
    totalPages,
    goToPage,
    changeLimit,
  } = usePaginatedApi<User>(
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

  // Roles for filter
  const roles = [{
    id: 'all',
    name: 'All Roles'
  }, {
    id: 'admin',
    name: 'Admin'
  }, {
    id: 'supplier',
    name: 'Supplier'
  }, {
    id: 'customer',
    name: 'Customer'
  }];

  if (usersError) {
    console.log("Users API Error:", usersError);
    return (
      <div className="p-6">
        <ErrorMessage
          error={usersError}
          onRetry={() => fetchUsers()}
        />
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, users.length);

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Users</h1>
        <Link to="/admin/users/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <UserPlusIcon size={18} className="mr-2" />
          Add User
        </Link>
      </div>
      {/* Filters and search */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-6 border border-border-light">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <input type="text" placeholder="Search users by name or email..." className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select value={filterRole} onChange={e => setFilterRole(e.target.value as 'all' | 'customer' | 'supplier' | 'admin')} className="appearance-none pl-3 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  {roles.map(role => <option key={role.id} value={role.id}>
                      {role.name}
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
                <select value={status} onChange={e => setStatus(e.target.value as 'all' | 'active' | 'inactive')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Verified</label>
                <select value={verified} onChange={e => setVerified(e.target.value as 'all' | 'true' | 'false')} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  <option value="all">All</option>
                  <option value="true">Verified</option>
                  <option value="false">Not Verified</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Users table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left text-copy-light text-sm">
                <th className="py-3 px-4 font-medium">User</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Role</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Orders</th>
                <th className="py-3 px-4 font-medium">Last Login</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                // Loading skeleton
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-border-light animate-pulse">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-surface-hover rounded-full mr-3"></div>
                        <div>
                          <div className="w-24 h-4 bg-surface-hover rounded mb-1"></div>
                          <div className="w-16 h-3 bg-surface-hover rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><div className="w-32 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-6 bg-surface-hover rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-8 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-surface-hover rounded"></div></td>
                  </tr>
                ))
              ) : (
                users.map((user: User) => (
                  <tr key={user.id} className="border-t border-border-light hover:bg-surface-hover">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-full mr-3 flex items-center justify-center text-xs font-medium text-primary">
                          {user.firstname?.[0] || user.full_name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-main">
                            {user.full_name || `${user.firstname} ${user.lastname}`}
                          </p>
                          <p className="text-xs text-copy-light">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-copy-light">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' ? 'bg-secondary/10 text-secondary' :
                        user.role === 'supplier' ? 'bg-info/10 text-info' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Customer'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.active ? (
                        <div className="flex items-center text-success">
                          <CheckCircleIcon size={16} className="mr-1" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-error">
                          <XCircleIcon size={16} className="mr-1" />
                          <span>Inactive</span>
                        </div>
                      )}
                    </td>
                  <td className="py-3 px-4 text-center text-copy-light">{user.orders}</td>
                  <td className="py-3 px-4 text-copy-light">{user.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/admin/users/${user.id}/edit`} className="p-1 text-copy-light hover:text-primary" title="Edit">
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
                              View Profile
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              Reset Password
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-copy hover:bg-surface-hover">
                              {user.active ? 'Deactivate' : 'Activate'}
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
        {users.length === 0 && !usersLoading && (
          <div className="py-12 text-center text-copy-light">
            <p>No users found</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{users.length}</span> users
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