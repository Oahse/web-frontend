import React from 'react';
import { Col, Form, Row } from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/ui/FormInput/FormInput'
import Title from 'antd/es/typography/Title';
import Header from '../components/Header';
import Button from '../components/ui/Button/Button';
import Card from '../components/ui/Card/Card';



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
    <Row className='mt-4'>

        <Col className='p-3' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card className='' style={{textAlign: 'center', width: '500px', backgroundColor: '#D9D9D9', }} >
                    <Row className='py-3'>
                        <Col span={24}>
                            <p className="card-header text-center">Forgotten Password</p>
                            {/* <span className="text-end">Log In</span> */}
                        </Col>
                    </Row>
                        <Form 
                            name="forgottenpassword"
                            // layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                              
                            }}
                        >
      
                            <FormInput
                                name="email"
                                placeholder="Email"
                                type='email'
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                            />

                            <Form.Item className='d-flex justify-content-center align-items-center'>
                                <Button type="primary" htmlType="submit" text="Reset" className=''/>
                            </Form.Item>
                        </Form>
                    
                </Card>
        </Col></Row>
  );
}

export default ForgotPassword;
