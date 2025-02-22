import React, { useState, useEffect } from 'react';
import { Table as AntdTable } from 'antd';

const Table = ( {columns,pagination, ...props}) => {
    return (
        <AntdTable
            columns={columns}
            dataSource={filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            rowKey="id"
            pagination={{
                current: currentPage,
                total: items.length,
                pageSize: pageSize,
                onChange: handlePaginationChange,
                onShowSizeChange: handleShowSizeChange, // Track page size change
                showSizeChanger: true,
                pageSizeOptions: ['5','10', '20', '50', '100'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 'max-content' }} // Enable horizontal scrolling
            rowSelection={rowSelection} // Enable row selection
        />
    )
}
export default Table;