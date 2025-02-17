import React from 'react';
import { Form, Checkbox } from 'antd';

const FormCheckBox = ({ name, valuePropName, text}) => {
    return (<Form.Item name={name} valuePropName={valuePropName}>
        <Checkbox>
            {text}
        </Checkbox>
    </Form.Item>)
}

export default FormCheckBox;