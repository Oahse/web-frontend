import React from 'react';
import { Form} from 'antd'
import Select from '../Select/Select';

const FormSelect = ({
    label, placeholder,defaultValue, name, rules, options=[],
    onChange,disabled=false, required = false, errorMessage, className, style
}) => {
    
    return (

        <div style={style}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={`${className}`}
            >
                <Select
                    options={options}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    placeholder={placeholder}
                    optionFilterProp="label" // Use the label property for default filtering
                    disabled={disabled}
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

export default FormSelect