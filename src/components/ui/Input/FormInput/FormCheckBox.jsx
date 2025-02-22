import React from 'react';
import { Form, Checkbox } from 'antd';

const FormCheckBox = ({ name, valuePropName, text,children}) => {
    return (<Form.Item name={name} valuePropName={valuePropName}>
        <Checkbox>
            {children ?children :text}
        </Checkbox>
    </Form.Item>)
}

export default FormCheckBox;