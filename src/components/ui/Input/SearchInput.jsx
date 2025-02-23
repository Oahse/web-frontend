import PropTypes from 'prop-types';
import FormInput from "../../ui/Input/FormInput/FormInput";
import Select from './Select/Select';
import InputNumber from './InputNumber';
import DatePicker from './Date/DatePicker';
import { Drawer, Space } from 'antd';
import Input from './Input';
import { useState } from 'react';
import dayjs from 'dayjs';

// Define the filter drawer
const FilterDrawer = ({ onSearch, onChangeDrawer, name, categoryoptions, minprice, maxprice, drawervisible, iscategoryLoading }) => {
    const MAX_PRICE = 9999999999999999; // Max price limit
    const MIN_PRICE = 0; // Min price limit
    
    // Local state to manage input values
    const [itemName, setItemName] = useState(name);
    const [startDate, setStartDate] = useState(dayjs('2000-01-01'));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [dateRange, setDateRange] = useState([startDate, endDate]);
    const [minPrice, setMinPrice] = useState(minprice);
    const [maxPrice, setMaxPrice] = useState(maxprice);
    const [selectedCategory, setSelectedCategory] = useState(categoryoptions?.length > 0 ? categoryoptions[0]?.id : null);
    
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
      const value = parseFloat(e) || 0;
      if (value >= MIN_PRICE) {
        setMinPrice(value);
        onSearch && onSearch({ itemName, dateRange, minPrice: value, maxPrice, selectedCategory });
      }
    };
  
    // Handle maximum price change
    const handleMaxPriceChange = (e) => {
      const value = parseFloat(e) || 0;
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
        <Space direction="vertical" style={{ width: '100%' , padding:'8px' }}>
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
          <Select
            options={categoryoptions||[]}
            iscategoryLoading={iscategoryLoading}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
          />
        </Space>
      </Drawer>
    );
  };

const SearchInput = ({ onSearch,isFilter, style, placeholder,className,categoryoptions,drawervisible, iscategoryLoading }) => {
    const MAX_PRICE = 9999999999999999; // Max price limit
          const MIN_PRICE = 0; // Min price limit
          const [itemName, setItemName] = useState('');
          const [startDate, setStartDate] = useState(dayjs('2000-01-01'));
          const [endDate, setEndDate] = useState(dayjs(Date.now()));
          const [dateRange, setDateRange] = useState([startDate, endDate]);
          const [minPrice, setMinPrice] = useState(MIN_PRICE);
          const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
          const [drawerVisible, setDrawerVisible] = useState(drawervisible);
          const [selectedCategory, setSelectedCategory] = useState(categoryoptions?.length > 0 ? categoryoptions[0]?.id : 0);
      
          
      
          const handleItemNameChange = (e) => {
              setItemName(e.target.value);
          };
          const updateSearch = (values) => {
            setItemName(values.itemName);
            setMinPrice(values.minPrice);
            setMaxPrice(values.maxPrice);
            setEndDate(values.endDate);
            setStartDate(values.startDate);
            setSelectedCategory(values.selectedCategory);
          }
      
          
          // const handleCapture = (event) => {
          //     const file = event.target.files[0];
          //     if (file) {
          //         const reader = new FileReader();
          //         reader.onloadend = () => {
          //             setImage(reader.result);
          //         };
          //         reader.readAsDataURL(file);
          //     }
          // };
        const handleSearch = (e) => {
            onSearch && onSearch({ itemName, dateRange, minPrice, maxPrice, selectedCategory });
        };
    
        const showDrawer = () => {
          setDrawerVisible(true);
        };
    return (
        <>
            <FormInput name='search' placeholder={placeholder} onSearch={handleSearch} className={className} style={style} isFilter={isFilter} onFilter={showDrawer} />
            <FilterDrawer
            name ={itemName}
            onSearch={updateSearch}
            onChangeDrawer={setDrawerVisible}
            categoryoptions={categoryoptions}
            minprice={MIN_PRICE}
            maxprice={MAX_PRICE}
            drawervisible={drawerVisible}
            iscategoryLoading={iscategoryLoading}
            />
        </>
    );
};

// Define PropTypes for SearchInput component
SearchInput.propTypes = {
    onSearch: PropTypes.func,        // onSearch should be a function
    style: PropTypes.object,         // style should be an object (inline styles)
    placeholder: PropTypes.string,   // placeholder should be a string
};

// Define default values for props
SearchInput.defaultProps = {
    onSearch: null,                 // default onSearch is null (no action by default)
    style: {},                      // default style is an empty object (no custom style)
    placeholder: "Search...",       // default placeholder text
};

export default SearchInput;
