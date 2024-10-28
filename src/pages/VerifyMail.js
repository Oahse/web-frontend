import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Form } from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Button from '../components/Button';
import InputNumber from '../components/InputNumber';
import { useNavigate } from 'react-router-dom';
function VerifyMail({ API_URL }) {
    const navigate = useNavigate();
    const [otp, setOtp] = useState([null, null, null, null]);
    const isLoading = false;

    const onFinish = (values) => {
        console.log('Form values:', values);
        navigate('/verify-email-confirmation')
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
        <div className='signup ' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div
                className='signup '
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: `${isMobile ? '100vh' : '84vh '}`, // Full viewport height
                }}
                >
                <Card
                    className={`signup ${!isMobile ? 'bigpadding' : ''}`}
                    style={{ textAlign: 'center' }}
                >
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
                            {otp.map((digit, index) => (
                                <InputNumber
                                    key={index}
                                    min={0}
                                    max={9}
                                    value={digit}
                                    style={{ width: '50px', margin: '0 5px' }}
                                    onChange={(value) => {
                                    const newOtp = [...otp];
                                    newOtp[index] = value;
                                    setOtp(newOtp);
                                    }}
                                    rules={[{ required: true, message: 'This is required' }]}
                                />
                            ))}
                        </div>
                        <Form.Item className='mt-3'>
                            <Button type="primary" htmlType="submit" text='Next' />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default VerifyMail;
