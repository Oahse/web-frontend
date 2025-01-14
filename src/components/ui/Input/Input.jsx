import React, { useState } from 'react';
import { Input, Drawer, DatePicker, Space } from 'antd';
import PropTypes from 'prop-types';
import { Html5QrcodeScanner } from 'html5-qrcode'; // Barcode Scanner library
import InputNumber from './InputNumber';
import DropDown from '../../DropDown';
import dayjs from 'dayjs';
import './Input.css'; // Ensure the CSS file is properly linked

// Define the barcode scanner logic
const startBarcodeScan = () => {
  const html5QrCode = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 250 });
  html5QrCode.render(
    (qrCodeMessage) => {
      console.log('QR Code Detected: ', qrCodeMessage);
      alert(`Scanned Barcode: ${qrCodeMessage}`);
      html5QrCode.stop(); // Stop the scanning after a successful scan
    },
    (errorMessage) => {
      console.log('Error:', errorMessage);
    }
  );
};

// Define the filter drawer
const FilterDrawer = ({ onSearch, onChangeDrawer, name, categoryoptions, minprice, maxprice, drawervisible, iscategoryLoading }) => {
  const MAX_PRICE = 9999999999999999; // Max price limit
  const MIN_PRICE = 0; // Min price limit
  
  // Local state to manage input values
  const [itemName, setItemName] = useState('');
  const [startDate, setStartDate] = useState(dayjs('2000-01-01'));
  const [endDate, setEndDate] = useState(dayjs(Date.now()));
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [minPrice, setMinPrice] = useState(minprice || MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(maxprice || MAX_PRICE);
  const [selectedCategory, setSelectedCategory] = useState(categoryoptions?.length > 0 ? categoryoptions[0]?.id : '');
  
  // Function to handle the drawer opening
  const handleOpenDrawer = () => {
    onChangeDrawer(true); // Notify parent component to open the drawer
  };

  // Function to handle the drawer closing
  const handleCloseDrawer = () => {
    onChangeDrawer(false); // Notify parent component to close the drawer
  };

  // Handle item name change
  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
    onSearch && onSearch({ itemName: e.target.value, dateRange, minPrice, maxPrice, selectedCategory });
  };

  // Handle minimum price change
  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    if (value >= MIN_PRICE) {
      setMinPrice(value);
      onSearch && onSearch({ itemName, dateRange, minPrice: value, maxPrice, selectedCategory });
    }
  };

  // Handle maximum price change
  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    if (value <= MAX_PRICE) {
      setMaxPrice(value);
      onSearch && onSearch({ itemName, dateRange, minPrice, maxPrice: value, selectedCategory });
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
    onSearch && onSearch({ itemName, dateRange, minPrice, maxPrice, selectedCategory: e.value });
  };

  // Handle date changes
  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setDateRange([startDate, endDate]);
    onSearch && onSearch({ itemName, dateRange: [startDate, endDate], minPrice, maxPrice, selectedCategory });
  };

  return (
    <Drawer
      title="Filter Options"
      placement="right"
      closable={true}
      onClose={handleCloseDrawer}
      visible={drawervisible}
      width={300}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <span>Item Name</span>
        <Input
          placeholder="Enter item name"
          value={itemName}
          onChange={handleItemNameChange}
        />
        
        <span>Start Date</span>
        <DatePicker
          placeholder='Start Date'
          value={startDate}
          onChange={(date) => handleDateChange(date, endDate)}
        />
        
        <span>End Date</span>
        <DatePicker
          placeholder='End Date'
          value={endDate}
          onChange={(date) => handleDateChange(startDate, date)}
        />
        
        <span>Min Price</span>
        <InputNumber
          min={MIN_PRICE}
          max={maxPrice}
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          style={{ width: '100%' }}
        />
        
        <span>Max Price</span>
        <InputNumber
          min={minPrice}
          max={MAX_PRICE}
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{ width: '100%' }}
        />
        
        <span>Category</span>
        <DropDown
          options={categoryoptions||[]}
          iscategoryLoading={iscategoryLoading}
          onChange={handleCategoryChange}
          style={{ width: '100%' }}
        />
      </Space>
    </Drawer>
  );
};

// SearchInput Component
const SearchInput = ({ onSearch, categoryoptions, minprice, maxprice, drawervisible, iscategoryLoading }) => {
  const [drawerVisible, setDrawerVisible] = useState(drawervisible);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  // Define the icons with actions
  const presuffix = (
    <i
      className="fa-light fa-barcode-read"
      style={{ fontSize: 16 }}
      onClick={startBarcodeScan} // Start barcode scanning
    ></i>
  );

  const suffix = (
    <i
      className="fa-light fa-bars-filter"
      style={{ fontSize: 16 }}
      onClick={showDrawer} // Show the filter side drawer
    ></i>
  );

  return (
    <div>
      <Input
        placeholder="Input search text"
        size="large"
        suffix={presuffix}  // Prefix for the barcode icon
        addonAfter={suffix}     // Suffix for the filter icon
        onSearch={onSearch}
        className="search-input"
      />
      <FilterDrawer
        onSearch={onSearch}
        onChangeDrawer={setDrawerVisible}
        categoryoptions={categoryoptions}
        minprice={minprice}
        maxprice={maxprice}
        drawervisible={drawerVisible}
        iscategoryLoading={iscategoryLoading}
      />
    </div>
  );
};

// PropTypes for validation
SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export { SearchInput };
