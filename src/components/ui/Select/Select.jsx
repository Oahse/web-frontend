import React, { useState } from 'react';
import { Avatar, Select as AntdSelect } from 'antd';

const Select = ({ placeholder,options, onChange, style, iscategoryLoading, ...props }) => {
    console.log(options)
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
        title:option.label
    }))
    console.log(Options,'===')
    const [selectedvalue, setSelectedValue] = useState({ value: Options[0]?.value, label: Options[0]?.label });
    const handleChange = (option)=>{
        setSelectedValue(option);
        onChange && onChange(option);
    }
    const filterOptions = (input, option) => {
        const optionLabel = option?.title ?? '';
        const optionCode = option?.code ?? '';
        const abbr = optionLabel.split(' ').map(word => word.charAt(0).toUpperCase()).join(''); // Join all the letters to form the initials
        if (optionLabel.toLowerCase().includes(input.toLowerCase()) || optionCode.toLowerCase().includes(input.toLowerCase()) || abbr.toLowerCase().includes(input.toLowerCase())) {
            return option
        }
        else{
            return null
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
