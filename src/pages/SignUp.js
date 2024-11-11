import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Avatar, Card, Form, Radio, message} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import FormCheckBox from '../components/FormCheckBox';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useRegister } from '../services/auth';

function Signup({ API_URL }) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(""); // Store selected user type
  const { register, loading, error, user } = useRegister(); // Use the register hook
  console.log(user)
  // Handle form submission
  const onFinish = (values) => {
    const { name, email, password, confirmPassword, newsletter, ...otherValues } = values;
    
    // Create an object to pass to the register function
    const params = {
      name,
      email,
      password,
      confirmPassword,
      newsletter,
      ...otherValues,
    };

    // Call the register function with API_URL, form data, and user type
    register(API_URL, params, userType)
      .then(() => {
        // Show success notification
        // notification.success({
        //   message: 'Re Successful',
        //   description: 'You have successfully logged in.',
        //   placement: 'topRight',
        //   duration: 3, // Duration in seconds before it disappears
        // });
        
        // Update state to trigger redirect
        setRedirectToHome(true);
      })
      .catch((err) => {
        console.error('Login error:', err);
        // notification.error({
        //   message: 'Login Failed',
        //   description: err,
        //   placement: 'topRight',
        //   duration: 3, // Duration in seconds before it disappears
        // });
      });

    // Redirect on successful registration (this could be handled inside the register hook as well)

  };
  useEffect(() => {
    // Check if we should redirect after login
    if (redirectToHome) {
      navigate('/verify-email-otp'); // Redirect on successful login
    }
  }, [redirectToHome, navigate]);

  // Handle change in selected user type
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

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

  // Display error message if there is an error from the API
  if (error) {
    message.error(error); // Ant Design message component to show error
  }

  return (
    <Card className={`signup ${!isMobile ? 'bigpadding' : ''} my-5`} style={{ textAlign: 'center' }}>
      <div className='mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className='title'>Sign Up</span>
      </div>
      <Form
        name="signup"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          newsletter: true, // Default checkbox to checked
        }}
      >
        <FormInput
          name="name"
          placeholder="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        />

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

        <FormInput
          name="confirmPassword"
          placeholder="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        />

        {/* User Type Selection */}
        <Form.Item
          name="userType"
          label={<span className='text-white'>Select User Type</span>}
          rules={[{ required: true, message: 'Please select your user type' }]}
        >
          <Radio.Group onChange={handleUserTypeChange} value={userType}>
            {['clients', 'deliverers', 'distributors', 'businesses', 'tradepersons'].map((type) => (
              <Radio key={type} value={type}>
                <span className='text-white'>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {/* Conditional Fields Based on User Type */}
        {userType === 'clients' && (
            <>
              <FormInput
                name="first_name"
                placeholder="First Name"
                rules={[{ required: true, message: 'First name is required for business users.' }]}
              />
              <FormInput
                name="last_name"
                placeholder="Last Name"
                rules={[{ required: true, message: 'Last Name is required for business users.' }]}
              />
          </>
        )}
        {userType === 'businesses' && (
          <>
            <FormInput
              name="businessname"
              placeholder="Business Name"
              rules={[{ required: true, message: 'Business name is required for business users.' }]}
            />
            <FormInput
              name="cac"
              placeholder="CAC"
              rules={[{ required: true, message: 'CAC is required for business users.' }]}
            />
            <FormInput
              name="websiteurl"
              placeholder="Website URL"
              rules={[{ required: true, message: 'Website URL is required for business users.' }]}
            />
          </>
        )}

        {userType === 'tradepersons' && (
          <>
            <FormInput
              name="professionname"
              placeholder="Profession Name"
              rules={[{ required: true, message: 'Profession Name is required for tradepersons.' }]}
            />
          </>
        )}

        {userType === 'distributors' && (
          <>
            <FormInput
              name="distributorname"
              placeholder="Distributor Name"
              rules={[{ required: true, message: 'Distributor Name is required for distributors.' }]}
            />
          </>
        )}

        {userType === 'deliverers' && (
          <>
            <FormInput
              name="deliverername"
              placeholder="Deliverer Name"
              rules={[{ required: true, message: 'Deliverer name is required for deliverers.' }]}
            />
          </>
        )}

        <div className='minititle mb-4' style={{ textAlign: 'right' }}>
          <Link to="/login"><small>Already have an account? Login</small></Link>
        </div>

        <FormCheckBox name="newsletter" valuePropName="checked" text={'I would like to receive your newsletter and other promotional information.'} />

        <div className='minititle mb-4 text-white' style={{ textAlign: 'left' }}>
          or signup with 
          <Link to="/login"><Avatar shape={'square'} className='ms-2' src={'https://iconape.com/wp-content/uploads/1/11/gmail-02.png'}  style={{backgroundColor:'white', minWidth:'60px'}}></Avatar></Link>
          <Link to="/login"><Avatar shape={'square'} className='ms-3' src={'http://www.pngall.com/wp-content/uploads/2016/07/Linkedin-Free-PNG-Image.png'} style={{backgroundColor:'white', minWidth:'60px'}}></Avatar></Link>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" text='Register' />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Signup;
