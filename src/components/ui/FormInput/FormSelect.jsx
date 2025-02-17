import React from 'react'
// import './FormInput.css'
import { ConfigProvider, Form, Select, } from 'antd'

const {Option} = Select

const FormSelect = ({
    label, type, placeholder, value, name, rules, options=[],
    onChange, required = false, errorMessage, className, filterOption, style = {}, 
}) => {
    return (

        <div style={{marginBottom: '1rem', }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={`${className}`}
            >
                <Select type={type}
                    placeholder={placeholder}
                    showSearch
                    filterOption={filterOption} // Apply custom filtering
                    optionFilterProp="label" // Use the label property for default filtering
                    value={value}
                    onChange={onChange}
                    
                > 
                    {options.map((option) => (
                        <Option key={option.value || option.name} value={option.value || option.name} label={option.label}>
                            {option.label}
                        </Option>
                    ))}
                </Select>

                {errorMessage && (
                    <p 
                        style={{
                            marginTop: '0.5rem',
                            color: 'red',
                            fontSize: '14px',

                        }}
                    >
                        {errorMessage}
                    </p>
                )}
            </Form.Item>
        </div>
        
        
    )
}

export default FormSelect