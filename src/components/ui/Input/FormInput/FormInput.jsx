import React, { useState } from 'react'
import './FormInput.css'
import { Form } from 'antd'
import { Icon } from "@iconify/react";
import Input from '../Input';

const FormInput = ({
    label, type, placeholder, value, name, rules,
    onChange, required = false, className, style = {}, onSearch,isFilter,onFilter
}) => {

    const [typevalue, setTypeValue] = useState(type || 'text');

    // Handle password visibility toggle
    const handleTypeValueChange = () => {
        if (typevalue === 'password') {
            setTypeValue('text');
        } else {
            setTypeValue('password');
        }
    };
    const handleSearch = (e) =>{
        if (onSearch){
            onSearch(e);
        }
    }
    const handleFilter = (e) =>{
        if (onFilter){
            onFilter(e);
        }
    }

    return (
        <div style={style || { marginBottom: '1rem'}}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={className}
            >
                <Input type={typevalue} placeholder={placeholder} value={value} onChange={onChange} onSearch={onSearch} isFilter={isFilter}/>
                {type === 'password' && (
                    
                    <Icon icon={`ph:eye-${typevalue === 'password' ? 'thin' : 'slash-thin'}`} 
                        width="24" 
                        height="24" 
                        style={{
                            position: 'absolute',
                            right: isFilter ?'40px':'10px',    // Position the icon on the right
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                            color: '#1E1E1E'  // Icon color
                        }}
                        onClick={handleTypeValueChange} // Call function on click
                    />
                    
                )}
                {onSearch && (
                    <Icon icon="iconamoon:search-thin" width="24" height="24" style={{
                        position: 'absolute',
                        right: isFilter ?'40px':'10px',   // Position the icon on the right
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                        color: '#1E1E1E'  // Icon color
                        }}
                        onClick={handleSearch} // Call function on click 
                        />
                    )}
                {isFilter && (
                    <Icon icon="fluent:filter-20-regular" width="24" height="24" strokeWidth={0.5} style={{
                        position: 'absolute',
                        right: '10px',   // Position the icon on the right
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                        color: '#1E1E1E',  // Icon color
                        }}
                        onClick={handleFilter} // Call function on click 
                        />
                    )}
            </Form.Item>
        </div>
    )
}

export default FormInput
