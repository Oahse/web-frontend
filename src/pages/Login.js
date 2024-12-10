import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Col, Form, notification, Row } from 'antd';
import ImageLoader from '../components/Loader';
import Card from '../components/ui/Card/Card'
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import procurement from '../assets/procurement3.jpg'
import FormInput from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useLogin } from '../services/auth'; // Adjust path as needed

function Login({ API_URL }) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { email, password } = values;
    login(API_URL, email, password)
      .then(() => {
        // Show success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in.',
          placement: 'topRight',
          duration: 3, // Duration in seconds before it disappears
        });
        
        // Update state to trigger redirect
        setRedirectToHome(true);
      })
      .catch((err) => {
        console.error('Login error:', err);
        notification.error({
          message: 'Login Failed',
          description: err,
          placement: 'topRight',
          duration: 3, // Duration in seconds before it disappears
        });
      });
  };

  useEffect(() => {
    // Check if we should redirect after login
    if (redirectToHome) {
      navigate('/'); // Redirect on successful login
    }
  }, [redirectToHome, navigate]);

  // Show loading indicator if authentication is in progress
  if (loading) {
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
    <Row>
        <Col span={12} className=''>
           <div  style={{height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
             <img src={procurement} alt='procurement login' width='100%' height='100%'/>
           </div>
        </Col>

        <Col span={12} >
            <div className='card-container'>
                <Card className='' style={{textAlign: 'center' }} onClick={() => console.log('clicked')}>
                        <div className="mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'inherit' }}>
                            <span className="title">Login</span>
                        </div>

                <Form
                        form={form}
                        name="signup"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                        newsletter: true, // Default checkbox to checked
                        }}
                    >
                        <FormInput
                        name="email"
                        placeholder="Email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                        />

                        <FormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                        />

                        <div className="minititle mb-4 d-flex flex-column" style={{ textAlign: 'right' }}>
                        <Link to="/forgotpassword"><small>Forgot Password?</small></Link>
                        </div>
                        <div className="minititle mb-4" style={{ textAlign: 'right' }}>
                        <Link to="/signup"><small>Not Account Yet? Sign up</small></Link>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if login fails */}

                        <Form.Item>
                        <Button type="primary" htmlType="submit" text="Login" />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            

           
        </Col>
    </Row>
    
  );
}

export default Login;
