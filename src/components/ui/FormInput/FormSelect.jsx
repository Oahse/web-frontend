import React from 'react';
import { Form} from 'antd'
import Select from '../../Select';

const FormSelect = ({
    label, placeholder, name, rules, options=[],
    onChange, required = false, errorMessage, className, 
}) => {
    
    return (

        <div style={{marginBottom: '1rem', }}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={`${className}`}
            >
                <Select
                    options={options}
                    onChange={onChange}
                    placeholder={placeholder}
                    optionFilterProp="label" // Use the label property for default filtering
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