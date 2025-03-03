import React, { useState } from 'react';
import { Avatar, Select as AntdSelect } from 'antd';
import './Select.css';
const Select = ({ placeholder,options, onChange, style, iscategoryLoading, ...props }) => {
    const Options =options.map((option,index) => ({
        key :option.id ||index,
        value: option.label, // Use id for the value
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {option.icon && <Avatar src={option.icon} alt="" shape='square' size={'small'} />} {/* Optional icon */}
                <span  className='ms-2'>{option.label}</span>
            </div>
        ),
        code: option.code,
        idd: option.idd,
        title:option.label
    }))
    const [selectedvalue, setSelectedValue] = useState({ value: Options[0]?.value, label: Options[0]?.label });
    const handleChange = (option)=>{
        setSelectedValue(option);
        onChange && onChange(option);
    }
    const filterOptions = (input, option) => {
        const optionLabel = option?.title ?? '';
        const optionCode = option?.code ?? '';
        const optionIdd = option?.idd ?? '';
        console.log(optionLabel, optionCode,optionIdd);

        // Check if optionLabel is an array or a single string
        const safeOptionLabel = Array.isArray(optionLabel) 
        ? optionLabel.join(' ')  // If it's an array, join the elements into a single string
        : typeof optionLabel === 'string' 
            ? optionLabel          // If it's a string, use it directly
            : '';

        const safeOptionIdd = Array.isArray(optionIdd) 
        ? optionIdd.join(' ')  // If it's an array, join the elements into a single string
        : typeof optionIdd === 'string' 
            ? optionIdd          // If it's a string, use it directly
            : '';

        // Handle abbreviation (acronym) creation
        const abbr = safeOptionLabel.split(' ').map(word => word.charAt(0).toUpperCase()).join('');

        // Perform case-insensitive comparison for `input`
        if (
            safeOptionLabel.toLowerCase().includes(input.toLowerCase()) ||
            optionCode.toLowerCase().includes(input.toLowerCase()) ||
            safeOptionIdd.toLowerCase().includes(input.toLowerCase()) ||
            abbr.toLowerCase().includes(input.toLowerCase())
        ) {
            return option;
        } else {
            return null;
        }

    }
    
    return <AntdSelect
        labelInValue
        showSearch
        value={selectedvalue}  // Ensuring the default option is shown when no value is selected
        loading={iscategoryLoading}
        placeholder={placeholder}
        onSelect={handleChange}  // Callback to handle changes
        filterOption={filterOptions}
        options={Options}
        style={style}
        {...props}
    />
    };

export default Select;
