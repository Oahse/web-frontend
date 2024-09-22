import React from 'react';
import { Form, Input } from 'antd';

const FormInput = ({ label, name, type = 'text', placeholder, rules }) => {
  return (
    <Form.Item
      label = {label}
      name={name}
      rules={rules}
    >
      {type === 'password' ? (
        <Input.Password placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );
};

export default FormInput;
