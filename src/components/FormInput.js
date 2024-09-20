import React from 'react';
import { Form, Input } from 'antd';

const FormInput = ({ label, name, type = 'text', placeholder, rules }) => {
  return (
    <Form.Item
      name={name}
      rules={rules}
    >
      {type === 'password' ? (
        <Input.Password placeholder={label} />
      ) : (
        <Input placeholder={label} />
      )}
    </Form.Item>
  );
};

export default FormInput;
