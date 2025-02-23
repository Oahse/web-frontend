import React, { useState } from 'react';
import { Table as AntdTable } from 'antd';
import PropTypes from 'prop-types';  // Import PropTypes

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
    ...props
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [tablePageSize, setTablePageSize] = useState(pageSize); // Default page size
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys

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
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

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
};

// Default props
Table.defaultProps = {
    items: [],
    pageSize: 20,
    pagination: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
};

export default Table;
