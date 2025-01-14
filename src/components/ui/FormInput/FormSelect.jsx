import React from 'react'
// import './FormInput.css'
import { ConfigProvider, Form, Select } from 'antd'

const {Option} = Select

const FormSelect = ({
    label, type, placeholder, value, name, rules, options=[],
    onChange, required = false, errorMessage, className, filterOption, style = {}, 
}) => {
    return (

        <ConfigProvider
      theme={{
        token: {
          borderRadius: 10, // Set global border radius
        },
      }}
    >
        <div style={{marginBottom: '1rem', }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={` ${className}`}
            >
                <Select type={type}
                    placeholder={placeholder}
                    showSearch
                    filterOption={filterOption} // Apply custom filtering
                    optionFilterProp="label" // Use the label property for default filtering
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
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
        </ConfigProvider>
        
        
    )
}

export default FormSelect