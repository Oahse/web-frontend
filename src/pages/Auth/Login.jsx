import React, { useEffect, useState } from 'react';
import { Col, Form, notification, Row, Card } from 'antd';
import ImageLoader from '../../components/Loader';
import FormInput from '../../components/ui/FormInput/FormInput'
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import procurement from '../../assets/procurement.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import { useLogin } from '../../services/auth'; // Adjust path as needed
import './Auth.css';
import useDeviceType from '../../hooks/useDeviceType';

function Login({ API_URL }) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { isMobile, isTablet} = useDeviceType();
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
    <Row className='mt-4'>
        <Col className={isMobile || isTablet ? 'hidden' : ''} xl={12} lg={12} style={{boxSizing:'border-box'}}> 
           <div  style={{height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
             <img src={procurement} alt='procurement login' width='100%' height='100%'/>
           </div>
        </Col>

        <Col className='px-4' xl={12} lg={12} md={24} sm={24} style={{boxSizing:'border-box'}}>
            <div className='' style={{width: '100%', height: '100%',  margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card className='' style={{textAlign: 'center', width: '460px', backgroundColor: '#D9D9D9', }} >
                      <div className="mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span className="card-header">Log In</span>
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

                            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if login fails */}

                            <Form.Item className='d-flex justify-content-center align-items-center'>
                            <Button startIcon={<i class="fa-light fa-right-to-bracket"></i>} type="primary" htmlType="submit" text="Login" className=''/>
                            </Form.Item>

                            <div className="minititle mb-4" style={{ textAlign: 'right' }}>
                            <span>Don't have an Account yet? </span><Link to="/signup"><small>Sign up</small></Link>
                            </div>

                            <div style={{textAlign: 'center',}}>
                                <div>
                                    <p>or Sign in with</p>
                                </div>
                              
                                <div className='d-flex justify-content-center align-items-center'>
                                  <span className='d-flex justify-content-between align-items-center'>
                                    <Button text={<i className="fa-brands fa-google"></i>}/>
                                    <Button text={<i className="fa-brands fa-apple"></i>}  className='mx-1'/>
                                    <Button text={<i className="fa-brands fa-linkedin"></i>
    }/>
                                      
                                  </span>
                                </div>
                                  
                            </div>
                          
                        </Form>
              </Card>
            </div>
            

           
        </Col>
    </Row>
    
  );
}

export default Login;
