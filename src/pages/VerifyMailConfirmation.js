import React from 'react';
import { Card, Col, Form, Row } from 'antd';
import ImageLoader from '../components/ui/Loader/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';

function VerifyMailConfirmation({ API_URL }) {
  const navigate = useNavigate();
  const isLoading = false;

  const onClick = () => {
    navigate('/');
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

            <Col className='p-3' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card className='' style={{textAlign: 'center', width: '500px', backgroundColor: '#D9D9D9', }} >
                <div className='mb-4'>
                  <h2>Verify Your Email</h2>
                  <p>We have sent a verification link to your email.</p>
                        </div>
                        <Form
                            name="verify-email-otp"
                            layout="horizontal"
                            initialValues={{
                                newsletter: true, // Default checkbox to checked
                            }}
                            >
                            
                            
                            <Form.Item className='mt-3 d-flex justify-content-center align-items-center'>
                                <Button
                                  type="primary"
                                  htmlType="button" // Changed to 'button' to avoid form submission
                                  text='Next'
                                  style={{ marginTop: '20px' }}
                                  onClick={onClick}
                                />
                            </Form.Item>
                        </Form>
                        
                    </Card>
            </Col>
            
    </Row>
    
  );
}

export default VerifyMailConfirmation;
