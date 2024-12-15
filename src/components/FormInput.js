import React from 'react';
import { Form, Input } from 'antd';
import './FormInput.css';

const FormInput = ({ label, name, type = 'text', placeholder, rules, className}) => {
  return (
    <Form.Item
      label = {label}
      name={name}
      rules={rules}
      className={`formInput ${className}`}
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
