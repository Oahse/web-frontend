import React from 'react'
// import './FormInput.css'
import { Form } from 'antd'

const FormInput = ({
    label, type, placeholder, value, name, rules,
    onChange, required = false, errorMessage, className, style = {}, 
}) => {
    return (
        <div style={{marginBottom: '1rem', }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={` ${className}`}
            >
                <input type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                />

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

export default FormInput