import React, { useState } from 'react';
import './FormInput.css';
import { Form } from 'antd';

const FormInputNumber = ({
    label, placeholder, value, name, rules,
    onChange, required = false, className, style = {},
    min=0, max=9,
}) => {
    const [inputvalue, setInputValue] = useState(value || '')
    const handleInputChange = (e) => {
        console.log(e.target.value)
        const newValue = e.target.value;

        // Allow only numbers and handle min/max validation
        if (/^\d*$/.test(newValue)) {
            let numValue = parseInt(newValue, 10);
            try {
                // Apply min/max constraints
                if (min !== undefined && numValue < min) {
                    numValue = min;
                }
                if (max !== undefined && numValue > max) {
                    numValue = max;
                }
                
            } catch {
                numValue =''
            }
            setInputValue(numValue)
                // Call the onChange handler with the new value
                if (onChange) {
                    console.log(newValue)
                    onChange(numValue);
                }
            
        }
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={className}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputvalue || ''}
                    onChange={handleInputChange}
                    className="number"
                    style={{
                        width: '30px',  // Adjusted to allow full-width for better layout
                        height: '30px',
                        ...style,
                    }}
                />
            </Form.Item>
        </div>
    );
};

export default FormInputNumber;
