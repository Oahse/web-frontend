import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Col, Form, notification, Row } from 'antd';
import ImageLoader from '../components/Loader';
import Card from '../components/ui/Card/Card'
import Grid from '../components/ui/Grid/Grid'
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import procurement from '../assets/procurement.jpg'
import FormInput from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
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
            <div className='' style={{width: '50%', height: '100vh',  margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                        <Form.Item>
                        <Button type="primary" htmlType="submit" text="Login" className='' style={{width: '100%',}}/>
                        </Form.Item>

                        <div className="minititle mb-4" style={{ textAlign: 'right' }}>
                        <span>Don't have an Account yet? </span><Link to="/signup"><small>Sign up</small></Link>
                        </div>

                        <div style={{textAlign: 'center',}}>
                            <div>
                                <p>or Sign in with</p>
                            </div>
                           
                            <Row >
                                <Col span={8}><Button text={<i class="bi bi-google"></i>} style={{padding: '5px 20px', margin: '', }}/></Col>

                                <Col span={8}><Button text={<i class="bi bi-apple"></i>} style={{padding: '5px 20px', margin: '', }}/></Col>

                                <Col span={8}><Button text={<i class="bi bi-linkedin"></i>} style={{padding: '5px 20px', margin: '', }}/></Col>
                                
                            </Row>
                               
                        </div>
                       
                    </Form>
                </Card>
            </div>
            

           
        </Col>
    </Row>
    
  );
}

export default Login;
