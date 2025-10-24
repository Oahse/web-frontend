import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, EyeIcon, TrashIcon, MailOpenIcon, ArchiveIcon, ChevronDownIcon, PlusIcon } from 'lucide-react';
import { usePaginatedApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { AdminMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread' | 'archived'>('all');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const apiCall = useCallback((page: number, limit: number) => {
    return AdminAPI.getMessages({
      search: submittedSearchTerm || undefined,
      status: filterStatus !== 'all' ? filterStatus : undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      page,
      limit,
    });
  }, [submittedSearchTerm, filterStatus, dateFrom, dateTo]);

  const {
    data: messages,
    loading: messagesLoading,
    error: messagesError,
    execute: fetchMessages,
    page: currentPage,
    limit: itemsPerPage,
    totalPages,
    goToPage,
  } = usePaginatedApi<AdminMessage>(
    apiCall,
    1,
    10,
    { showErrorToast: false, autoFetch: true }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    goToPage(1); // Reset to first page when searching
  };

  const statusOptions = [
    { id: 'all', name: 'All Statuses' },
    { id: 'read', name: 'Read' },
    { id: 'unread', name: 'Unread' },
    { id: 'archived', name: 'Archived' },
  ];

  if (messagesError) {
    console.log("Messages API Error:", messagesError);
    return (
      <div className="p-6">
        <ErrorMessage
          error={messagesError}
          onRetry={() => fetchMessages()}
        />
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, messages.length);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Messages</h1>
        <Link to="/admin/messages/new" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
          <PlusIcon size={18} className="mr-2" />
          New Message
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
                  placeholder="Search messages by subject or sender..." 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as 'all' | 'read' | 'unread' | 'archived')} className="appearance-none pl-3 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy">
                  {statusOptions.map(option => <option key={option.id} value={option.id}>
                      {option.name}
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
                <label className="text-sm text-copy-light mb-1 block">Date From</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-copy-light mb-1 block">Date To</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background text-copy" value={dateTo} onChange={e => setDateTo(e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages table */}
      <div className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left text-copy-light text-sm">
                <th className="py-3 px-4 font-medium">Subject</th>
                <th className="py-3 px-4 font-medium">Sender</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messagesLoading ? (
                // Loading skeleton
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-border-light animate-pulse">
                    <td className="py-3 px-4"><div className="w-48 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-32 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-24 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-24 h-4 bg-surface-hover rounded"></div></td>
                    <td className="py-3 px-4"><div className="w-20 h-8 bg-surface-hover rounded"></div></td>
                  </tr>
                ))
              ) : (
                messages.map((message: AdminMessage) => (
                  <tr key={message.id} className="border-t border-border-light hover:bg-surface-hover">
                    <td className="py-3 px-4">
                      <Link to={`/admin/messages/${message.id}`} className="font-medium text-primary hover:underline">
                        {message.subject}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-copy-light">{message.sender?.full_name || message.sender_email || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        message.read ? 'bg-primary/10 text-primary' :
                        message.archived ? 'bg-secondary/10 text-secondary' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {message.read ? 'Read' : message.archived ? 'Archived' : 'Unread'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-copy-light">{new Date(message.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/admin/messages/${message.id}`} className="p-1 text-copy-light hover:text-primary" title="View">
                          <EyeIcon size={18} />
                        </Link>
                        <button className="p-1 text-copy-light hover:text-primary" title="Mark as Read">
                          <MailOpenIcon size={18} />
                        </button>
                        <button className="p-1 text-copy-light hover:text-secondary" title="Archive">
                          <ArchiveIcon size={18} />
                        </button>
                        <button className="p-1 text-copy-light hover:text-error" title="Delete">
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {messages.length === 0 && !messagesLoading && (
          <div className="py-12 text-center text-copy-light">
            <p>No messages found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-copy-light">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, messages.length)}</span> of{' '}
            <span className="font-medium">{messages.length}</span> messages
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
    </div>
  );
};
