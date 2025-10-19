import React, { useState, useMemo } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: TableRow, index: number) => React.ReactNode;
  format?: 'currency' | 'number' | 'percentage' | 'date' | 'text';
  hidden?: boolean;
}

export interface TableRow {
  id: string | number;
  [key: string]: unknown;
}

export interface FilterConfig {
  column: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
  value: unknown;
  value2?: unknown; // For 'between' operator
}

export interface GroupConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface AdvancedTableProps {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  groupable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  onRowClick?: (row: TableRow, index: number) => void;
  onSelectionChange?: (selectedRows: TableRow[]) => void;
  onExport?: (format: 'csv' | 'excel' | 'pdf') => void;
  className?: string;
}

export const AdvancedTable: React.FC<AdvancedTableProps> = ({
  columns,
  data,
  title,
  searchable = true,
  filterable = true,
  sortable = true,
  exportable = true,
  selectable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  onRowClick,
  onSelectionChange,
  onExport,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const visibleColumns = useMemo(() => {
    return columns.filter(col => !hiddenColumns.has(col.key) && !col.hidden);
  }, [columns, hiddenColumns]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    filters.forEach(filter => {
      result = result.filter(row => {
        const value = row[filter.column];
        const filterValue = filter.value;

        switch (filter.operator) {
          case 'equals':
            return value === filterValue;
          case 'contains':
            return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
          case 'startsWith':
            return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
          case 'endsWith':
            return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
          case 'greaterThan':
            return Number(value) > Number(filterValue);
          case 'lessThan':
            return Number(value) < Number(filterValue);
          case 'between':
            return Number(value) >= Number(filterValue) && Number(value) <= Number(filter.value2);
          default:
            return true;
        }
      });
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, filters, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!pagination) return filteredAndSortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    setSortConfig(current => {
      if (current?.key === columnKey) {
        return {
          key: columnKey,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const handleRowSelection = (rowId: string | number, selected: boolean) => {
    const newSelection = new Set(selectedRows);
    if (selected) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);

    if (onSelectionChange) {
      const selectedRowData = data.filter(row => newSelection.has(row.id));
      onSelectionChange(selectedRowData);
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = new Set(paginatedData.map(row => row.id));
      setSelectedRows(allIds);
      if (onSelectionChange) {
        onSelectionChange(paginatedData);
      }
    } else {
      setSelectedRows(new Set());
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    }
  };

  const formatCellValue = (value: unknown, column: TableColumn) => {
    if (column.render) {
      return column.render(value, {}, 0);
    }

    switch (column.format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(value) || 0);
      case 'number':
        return new Intl.NumberFormat().format(Number(value) || 0);
      case 'percentage':
        return `${(Number(value) || 0).toFixed(1)}%`;
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return String(value || '');
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
            <span className="text-sm text-gray-500">
              {filteredAndSortedData.length} {filteredAndSortedData.length === 1 ? 'row' : 'rows'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {searchable && (
              <div className="relative">
                <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            
            {filterable && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-md transition-colors ${
                  showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Filters"
              >
                <FilterIcon size={16} />
              </button>
            )}
            
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md transition-colors relative"
              title="Column Visibility"
            >
              <EyeIcon size={16} />
              {showColumnSelector && (
                <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md py-2 z-10 min-w-48">
                  {columns.map(column => (
                    <label key={column.key} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!hiddenColumns.has(column.key)}
                        onChange={(e) => {
                          const newHidden = new Set(hiddenColumns);
                          if (e.target.checked) {
                            newHidden.delete(column.key);
                          } else {
                            newHidden.add(column.key);
                          }
                          setHiddenColumns(newHidden);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{column.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </button>
            
            {exportable && (
              <button
                onClick={() => onExport?.('csv')}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                title="Export"
              >
                <DownloadIcon size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-2">
            {filters.map(filter => (
              <div key={filter.column} className="flex items-center gap-2 text-sm">
                <span className="font-medium">{columns.find(c => c.key === filter.column)?.label}</span>
                <span className="text-gray-500">{filter.operator}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{filter.value}</span>
                <button
                  onClick={() => removeFilter(filter.column)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              {visibleColumns.map(column => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && sortable && (
                      <div className="flex flex-col">
                        <ChevronUpIcon
                          size={12}
                          className={`${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <ChevronDownIcon
                          size={12}
                          className={`${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''} ${
                  selectedRows.has(row.id) ? 'bg-blue-50' : ''
                }`}
                onClick={() => onRowClick?.(row, index)}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelection(row.id, e.target.checked);
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                )}
                {visibleColumns.map(column => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-sm text-gray-900 ${
                      column.align === 'center' ? 'text-center' :
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row, index)
                      : formatCellValue(row[column.key], column)
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon size={16} />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};