import React, { useState } from 'react'
import './FormInput.css'
import { Form } from 'antd'
import TextArea from '../TextArea';

const FormTextArea = ({
    label, placeholder, value, name, rules,
    onChange, required = false, className, style = {}, onSearch,isFilter,onFilter, disabled=false
}) => {


    return (
        <div style={style}>
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                className={className}
                required={required}
                
            >
                <TextArea disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} onSearch={onSearch} isFilter={isFilter}/>
                
            </Form.Item>
        </div>
    )
}

export default FormTextArea
