import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import FormInputNumber from '../components/ui/FormInput/FormInputNumber';

function VerifyMail({ API_URL }) {
    const navigate = useNavigate();
    const [otp, setOtp] = useState([null, null, null, null]);
    const isLoading = false;

    const onFinish = (values) => {
        console.log('Form values:', values);
        navigate('/verify-email-confirmation');
    };

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value; // Update specific index with the new value
        setOtp(newOtp);
    };

    if (isLoading) {
        return (
            <ImageLoader
                src={oahseicon}
                alt='oahse'
                src2={oahselogo}
                alt2='oahse'
            />
        );
    }

    return (
        <Row className='mt-4'>
            <Col className='p-3' style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card className='' style={{ textAlign: 'center', width: '500px', backgroundColor: '#D9D9D9' }}>
                    <div className='mb-4'>
                        <p className='title'>Verify your email</p>
                        <p className='semititle'>Enter the 4-digit code sent to you</p>
                    </div>
                    <Form
                        name="verify-email-otp"
                        layout="horizontal"
                        onFinish={onFinish}
                        initialValues={{
                            newsletter: true, // Default checkbox to checked
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <Row gutter={8}>
                                {otp.map((digit, index) => (
                                    <Col span={6} key={index}>
                                        <FormInputNumber
                                            value={digit || ''}
                                            onChange={(value) => handleOtpChange(value, index)} // Update specific OTP digit
                                            placeholder="0"
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <Form.Item className='mt-3 d-flex justify-content-center align-items-center'>
                            <Button type="primary" htmlType="submit" text='Next' />
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default VerifyMail;
