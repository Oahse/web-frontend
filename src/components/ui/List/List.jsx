import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List as AntdList, Skeleton, Checkbox, Tag } from 'antd';
import Text from '../Typography/Text';
import './List.css';

const List = ({ 
    id = '',
    items = [], 
    pageSize = 20,
    selectable = true, 
    pagination = true,
    showSizeChanger = true,
    pageSizeOptions = ['5', '10', '20', '50', '100'], 
    onShowSizeChange,
    onPaginationChange,
    onSelectedItems,
    onRowClick,
    onLongPress, // New prop to handle long press event
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [listPageSize, setListPageSize] = useState(pageSize); // Default page size
    const [loading, setLoading] = useState(true); // Initially set loading to true
    const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
    const [pressTimer, setPressTimer] = useState(null); // To track the press duration

    // Handle page size change
    const handleShowSizeChange = (current, size) => {
        setListPageSize(size); // Update the page size in state
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

    // Simulate loading data
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Set loading to false after data is loaded
        }, 2000); // 2 seconds loading time simulation
    }, []);

    // Handle checkbox change
    const handleCheckboxChange = (e, item) => {
        const { checked } = e.target;
        setSelectedItems((prevSelectedItems) => {
            if (checked) {
                const updatedSelectedItems = [...prevSelectedItems, item]; // Add item to selected items
                if (onSelectedItems) {
                    onSelectedItems(updatedSelectedItems); // Call callback
                }
                return updatedSelectedItems;
            } else {
                const updatedSelectedItems = prevSelectedItems.filter(
                    (selectedItem) => selectedItem.id !== item.id
                ); // Remove item from selected items
                if (onSelectedItems) {
                    onSelectedItems(updatedSelectedItems); // Call callback
                }
                return updatedSelectedItems;
            }
        });
    };

    // Handle long press event
    const handleLongPressStart = (item, e) => {
        e.preventDefault();
        // Start a timer when press starts
        setPressTimer(setTimeout(() => {
            if (onLongPress) {
                onLongPress(item); // Trigger the long press callback with the item
            }
        }, 500)); // 500ms for long press duration
    };

    // Handle end of press (mouse up or touch end)
    const handleLongPressEnd = () => {
        clearTimeout(pressTimer); // Clear the timer if the press was released early
        setPressTimer(null);
    };
    const handleItemClick =(item)=>{
        
        if (onRowClick){
            onRowClick(item)
        }
        
    }
    // Calculate paginated data
    const paginatedItems = items.slice((currentPage - 1) * listPageSize, currentPage * listPageSize);

    return (
        <div  id={id}>
            <AntdList
            className="mb-4"
            pagination={pagination && {
                current: currentPage,
                total: items.length, // Show total count as the length of all items
                pageSize: listPageSize,
                onChange: handlePaginationChange,
                onShowSizeChange: handleShowSizeChange, // Track page size change
                showSizeChanger: showSizeChanger,
                pageSizeOptions: pageSizeOptions,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            }}
            dataSource={paginatedItems}
            renderItem={(item) => (
                <AntdList.Item 
                    key={item.id}
                    onMouseDown={(e) => handleLongPressStart(item, e)} // Listen for mouse down to start long press
                    onTouchStart={(e) => handleLongPressStart(item, e)} // For touch devices
                    onMouseUp={handleLongPressEnd} // Listen for mouse up to end long press
                    onTouchEnd={handleLongPressEnd} // For touch devices
                    
                    style={{cursor:'pointer'}}
                >
                    <AntdList.Item.Meta
                        avatar={
                            selectable ? (
                                <Checkbox
                                    checked={selectedItems.some((selecteditem) => selecteditem.id === item.id)} // Check if any selected item has the same ID as the current item
                                    onChange={(e) => handleCheckboxChange(e, item)} // Handle checkbox change
                                />
                            ) : (
                                <Avatar src={item.picture.large} />
                            )
                        }
                        title={
                            <span onClick={(e)=>handleItemClick(item)}>{item.id - item?.name || 'Telephone'}
                            </span>
                        }
                        description={
                            <div className="d-flex flex-column justify-content-start align-items-start">
                                
                                <div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                                    <Avatar src={item?.picture || `https://picsum.photos/200/300?random=${item.id}`} shape='square' size={'small'} />
                                    <Text tag="p" fontWeight="fw-300">
                                        {item.customer}
                                    </Text>
                                </div>
                                <Tag color="#979797" className="mt-1">
                                    {item.delivery_status}
                                </Tag>
                                <Text tag="small" fontWeight="fw-300">
                                    {item.fulfillment_status}
                                </Text>
                            </div>
                        }
                    />
                    <Text tag="small" fontWeight="fw-300">
                        {item.currency} {item.price}
                    </Text>
                </AntdList.Item>
            )}
            renderSkeleton={() => (
                <AntdList.Item>
                    <Skeleton loading={loading} active avatar paragraph={{ rows: 3 }} />
                </AntdList.Item>
            )}
        />
        </div>
    );
};

export default List;
