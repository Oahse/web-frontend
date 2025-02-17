import React, { useState } from 'react'
import './FormInput.css'
import { Form } from 'antd'

const FormInput = ({
    label, type, placeholder, value, name, rules,
    onChange, required = false, className, style = {}, 
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

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={className}
            >
                <input
                        type={typevalue}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        
                        style={{
                            paddingRight: '30px',  // Space for the icon
                            
                        }}
                    />
                    {type === 'password' && (
                        <i
                            className={`fa-sharp fa-light ${typevalue === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}
                            style={{
                                position: 'absolute',
                                right: '10px',   // Position the icon on the right
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                                color: '#1E1E1E'  // Icon color
                            }}
                            onClick={handleTypeValueChange} // Call function on click
                        ></i>
                    )}
            </Form.Item>
        </div>
    )
}

export default FormInput
