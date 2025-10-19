import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, MoreHorizontalIcon, TrashIcon, EditIcon, CheckCircleIcon, XCircleIcon, UserPlusIcon, ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // API call for users
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    execute: fetchUsers,
  } = useApi<any>({ showErrorToast: false });

  useEffect(() => {
    fetchUsers(() => AdminAPI.getUsers({
      role: filterRole !== 'all' ? filterRole as any : undefined,
      search: searchTerm || undefined,
      page: currentPage,
      limit: 10
    }));
  }, [searchTerm, filterRole, currentPage, fetchUsers]);

  // Fallback data
  const fallbackUsers = [{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-15 10:30 AM',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    orders: 12
  }, {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Customer',
    status: 'Active',
    lastLogin: '2023-05-14 02:45 PM',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    orders: 8
  }, {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-05-13 09:15 AM',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    orders: 0
  }, {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Customer',
    status: 'Inactive',
    lastLogin: '2023-04-28 11:20 AM',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    orders: 5
  }, {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Customer',
    status: 'Active',
    lastLogin: '2023-05-10 04:30 PM',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    orders: 3
  }, {
    id: '6',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Customer',
    status: 'Active',
    lastLogin: '2023-05-12 01:15 PM',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    orders: 7
  }];

  // Use API data or fallback
  const users = usersData?.data || fallbackUsers;

  // Roles for filter
  const roles = [{
    id: 'all',
    name: 'All Roles'
  }, {
    id: 'Admin',
    name: 'Admin'
  }, {
    id: 'Manager',
    name: 'Manager'
  }, {
    id: 'Customer',
    name: 'Customer'
  }];

  if (usersError) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={usersError}
          onRetry={() => fetchUsers(() => AdminAPI.getUsers({
            role: filterRole !== 'all' ? filterRole as any : undefined,
            search: searchTerm || undefined,
            page: currentPage,
            limit: 10
          }))}
        />
      </div>
    );
  }

  const totalPages = usersData?.pagination?.totalPages || 1;
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, usersData?.pagination?.total || users.length);

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Users</h1>
        <Link to="/admin/users/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <UserPlusIcon size={18} className="mr-2" />
          Add User
        </Link>
      </div>
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <input type="text" placeholder="Search users by name or email..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
                {roles.map(role => <option key={role.id} value={role.id}>
                    {role.name}
                  </option>)}
              </select>
              <ChevronDownIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <FilterIcon size={18} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>
      {/* Users table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm">
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
                  <tr key={index} className="border-t border-gray-100 animate-pulse">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><div className="w-32 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-6 bg-gray-200 rounded-full"></div></td>
                    <td className="py-3 px-4"><div className="w-16 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-8 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-gray-200 rounded"></div></td>
                  </tr>
                ))
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs font-medium">
                          {user.firstname?.[0] || user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-main">
                            {user.name || `${user.firstname} ${user.lastname}`}
                          </p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'supplier' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Customer'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.active || user.status === 'Active' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon size={16} className="mr-1" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircleIcon size={16} className="mr-1" />
                          <span>Inactive</span>
                        </div>
                      )}
                    </td>
                  <td className="py-3 px-4 text-center">{user.orders}</td>
                  <td className="py-3 px-4 text-gray-600">{user.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/admin/users/${user.id}/edit`} className="p-1 text-gray-500 hover:text-primary" title="Edit">
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
                              View Profile
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Reset Password
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {user.status === 'Active' ? 'Deactivate' : 'Activate'}
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
          <div className="py-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{endIndex}</span> of{' '}
            <span className="font-medium">{usersData?.pagination?.total || users.length}</span> users
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-400 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, pageNum) => (
                <button
                  key={pageNum + 1}
                  onClick={() => setCurrentPage(pageNum + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === pageNum + 1
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-400 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>;
};