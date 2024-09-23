import React, { useState } from 'react';
import { Input, Space, DatePicker, Drawer } from 'antd';
import dayjs from 'dayjs';

const FilterComponent = ({ onSearch, name }) => {
    const [itemName, setItemName] = useState('');
    const [startDate, setStartDate] = useState(dayjs('2000-01-01'));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [dateRange, setDateRange] = useState([startDate, endDate]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [drawerStartDate, setDrawerStartDate] = useState(startDate);
    const [drawerEndDate, setDrawerEndDate] = useState(endDate);

    const MAX_PRICE = 9999999999999999; // Max price limit
    const MIN_PRICE = 0; // Min price limit

    const handleOpenDrawer = () => setDrawerVisible(true);
    const handleCloseDrawer = () => setDrawerVisible(false);

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
        onSearch && onSearch({ itemName: e.target.value, dateRange, minPrice, maxPrice });
    };

    const handleMinPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        
        if (value >= MIN_PRICE) {
            setMinPrice(value);
            onSearch && onSearch({ itemName, dateRange, minPrice: value, maxPrice });
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0; // Get the input value as a number
    
        if (value <= MAX_PRICE) {
            setMaxPrice(value);
            onSearch && onSearch({ itemName, dateRange, minPrice, maxPrice : value });
        }
    };
    
    
    const handleCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='searchcontainer mb-1'>
            <div style={{ display: 'flex', alignItems: 'center', padding: '2px', margin: '2px' }}>
                {name && (
                    <Input
                        placeholder="Search Products"
                        style={{ borderRadius: '1px', marginRight: '1px' }}
                        className='m-1 searchbar'
                        onChange={handleItemNameChange}
                        value={itemName}
                        suffix={<label htmlFor="cameraInput">
                            <i className="fa-light fa-barcode-read nav-icons" style={{ cursor: 'pointer' }}></i>
                        </label>}
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCapture}
                    style={{ display: 'none' }}
                    id="cameraInput"
                />
                
                <span className='m-0 mx-3 fs-5 '>
                    <i className="fa-light fa-bars-filter nav-icons text-white" onClick={handleOpenDrawer}></i>
                </span>
            </div>
            {image && <img src={image} alt="Captured" style={{ marginTop: '20px', maxWidth: '100%' }} />}

            <Drawer
                title="Filter Options"
                placement="right"
                closable={true}
                onClose={handleCloseDrawer}
                visible={drawerVisible}
                width={300}
            >
                <Space direction="vertical">
                    <span>Start Date</span>
                    <DatePicker
                        placeholder='Start Date'
                        value={drawerStartDate}
                        onChange={(date) => {
                            setDrawerStartDate(date);
                            setStartDate(date);
                            setDateRange([date, drawerEndDate]);
                            onSearch && onSearch({ itemName, dateRange: [date, drawerEndDate], minPrice, maxPrice });
                        }}
                    />
                    <span>End Date</span>
                    <DatePicker
                        placeholder='End Date'
                        value={drawerEndDate}
                        onChange={(date) => {
                            setDrawerEndDate(date);
                            setEndDate(date);
                            setDateRange([drawerStartDate, date]);
                            onSearch && onSearch({ itemName, dateRange: [drawerStartDate, date], minPrice, maxPrice });
                        }}
                    />
                    <span>Min Price</span>
                    <Input
                        type='number'
                        className='minprice'
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        style={{ width: '100%' }}
                    />
                    <span>Max Price</span>
                    <Input
                        type='number'
                        className='maxprice'
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        style={{ width: '100%' }}
                    />
                </Space>
            </Drawer>
        </div>
    );
};

export default FilterComponent;
