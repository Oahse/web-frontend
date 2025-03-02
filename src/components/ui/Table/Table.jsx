import React, { useState } from 'react';
import { Table as AntdTable } from 'antd';
import PropTypes from 'prop-types';  // Import PropTypes
import './Table.css';

const Table = ({
    items = [], 
    columns,
    pageSize = 20,
    pagination = true,
    showSizeChanger = true,
    pageSizeOptions = ['5', '10', '20', '50', '100'], 
    onShowSizeChange,
    onPaginationChange,
    onSelectedRowKeys,
    onSelectedItems,
    onRowClick , // Default to an empty function
    onRowDoubleClick, // Default to an empty function
    onRowContextMenu, // Default to an empty function
    onRowMouseEnter, // Default to an empty function
    onRowMouseLeave, // Default to an empty function
    ...props
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [tablePageSize, setTablePageSize] = useState(pageSize); // Default page size
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
    const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
    // Handle page size change
    const handleShowSizeChange = (current, size) => {
        setTablePageSize(size); // Update the page size in state
        setCurrentPage(1); // Reset to first page when page size changes
        if (onShowSizeChange) {
            onShowSizeChange(current, size);
        }
    };

    // Pagination
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
        if (onPaginationChange) {
            onPaginationChange(page);
        }
    };

    // Handle selection change
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        if (onSelectedRowKeys) {
            onSelectedRowKeys(selectedRowKeys);
            
        }

        // Filter data based on selectedRowKeys
        const filteredData = items.filter((item) => selectedRowKeys.includes(item.id));
        setSelectedItems(filteredData); // Remove item from selected items
        if (onSelectedItems) {
            onSelectedItems(filteredData);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const handleRowClick = (record) => {
        // console.log(record)
        onRowClick && onRowClick(record);
    }
    return (
        <AntdTable
            columns={columns}
            dataSource={items.slice((currentPage - 1) * tablePageSize, currentPage * tablePageSize)}
            rowKey="id"
            pagination={pagination && {
                current: currentPage,
                total: items.length,
                pageSize: tablePageSize,
                onChange: handlePaginationChange,
                onShowSizeChange: handleShowSizeChange, // Track page size change
                showSizeChanger: showSizeChanger,
                pageSizeOptions: showSizeChanger && pageSizeOptions,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            }}
            onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => handleRowClick(record), // click row
                  onDoubleClick: (event) => onRowDoubleClick(record), // double click row
                };
              }}
            scroll={{ x: 'max-content' }} // Enable horizontal scrolling
            rowSelection={rowSelection} // Enable row selection
            {...props}
        />
    );
};

// Add PropTypes validation
Table.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object), // Array of objects for data source
    columns: PropTypes.arrayOf(PropTypes.object).isRequired, // Columns should be an array of objects
    pageSize: PropTypes.number, // Page size should be a number
    pagination: PropTypes.bool, // Pagination should be a boolean
    showSizeChanger: PropTypes.bool, // Show size changer should be a boolean
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string), // Page size options should be an array of strings
    onShowSizeChange: PropTypes.func, // onShowSizeChange should be a function
    onPaginationChange: PropTypes.func, // onPaginationChange should be a function
    onSelectedRowKeys: PropTypes.func, // onSelectedRowKeys should be a function
    onRowClick: PropTypes.func, // onRowClick should be a function
    onRowDoubleClick: PropTypes.func, // onRowDoubleClick should be a function
    onRowContextMenu: PropTypes.func, // onRowContextMenu should be a function
    onRowMouseEnter: PropTypes.func, // onRowMouseEnter should be a function
    onRowMouseLeave: PropTypes.func, // onRowMouseLeave should be a function
};

// Default props
Table.default = {
    items: [],
    pageSize: 20,
    pagination: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
};

export default Table;
