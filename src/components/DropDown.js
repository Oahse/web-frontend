import React, { useState } from 'react';
import { Avatar, Select } from 'antd';

const DropDown = ({ options, onChange, style, iscategoryLoading }) => {
    
    const Options =[
        options.map(option => ({
            value: option.id, // Use id for the value
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {option.icon && <Avatar src={option.icon} alt="" shape='square' size={'small'} />} {/* Optional icon */}
                    {option.label}
                </div>
            ),
            title:option.label
        }))
    ]
    
    const [selectedvalue, setSelectedValue] = useState({ value: Options[0].value, label: Options[0].label });
    const handleChange = (option)=>{
        setSelectedValue(option);
        onChange && onChange(option);
    }
    const filterOptions = (input, option) => {
        const optionLabel = option?.title ?? '';
        if (optionLabel.toLowerCase().includes(input.toLowerCase())) {
            return option
        }
        else{
            return null
        }
        
    }
    
    return <Select
        labelInValue
        showSearch
        value={selectedvalue}  // Ensuring the default option is shown when no value is selected
        loading={iscategoryLoading}
        
        onSelect={handleChange}  // Callback to handle changes
        filterOption={filterOptions}
        options={Options}
        style={style}
    />
    };

export default DropDown;
