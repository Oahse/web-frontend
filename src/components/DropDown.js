import React, { useState } from 'react';
import { Avatar, Select } from 'antd';

const DropDown = ({ options, onChange, style, iscategoryLoading }) => {
    const [selectedvalue, setSelectedValue] = useState({ value: null, label: 'All Categories' });
    const handleChange = (option)=>{
        setSelectedValue(option);
        onChange && onChange(option)
    }
    return <Select
        labelInValue
        showSearch
        value={selectedvalue}  // Ensuring the default option is shown when no value is selected
        loading={iscategoryLoading}
        onChange={handleChange}  // Callback to handle changes
        filterOption={(input, option) =>
            (option?.label?.props?.children[1] ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
            {
                value: null, // Default "All Categories" option
                label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        All Categories
                    </div>
                ),
            },
            ...options.map(option => ({
                value: option.id, // Use id for the value
                label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {option.icon && <Avatar src={option.icon} alt="" shape='square' size={'small'} />} {/* Optional icon */}
                        {option.name}
                    </div>
                ),
                title:option.name
            }))
        ]}
        style={style}
    />
    };

export default DropDown;
