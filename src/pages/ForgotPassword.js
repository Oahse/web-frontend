import React from 'react';
import { Form } from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Title from 'antd/es/typography/Title';
import Header from '../components/Header';




function ForgotPassword({ API_URL,Companyname, isloggedIn, userDetails }) {
  const isLoading = false;

  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  if (isLoading) {
    return (
      <ImageLoader
        src={oahseicon}
        alt="oahse"
        src2={oahselogo}
        alt2="oahse"
      />
    );
  }

  return (
    <div className="forgot-password-container">
      <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
      
      <div className="forgot-password-content">
        <Title level={3} className='semititle'>Reset Password</Title>
        <Title level={4} className='title'>Forgotten Password</Title>
        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            newsletter: true, // Default checkbox to checked
          }}
          className="forgot-password-form"
        >
          <FormInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          />
          
          <Form.Item className="forgot-password-submit">
            <Button type="primary" htmlType="submit" text="Login" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
