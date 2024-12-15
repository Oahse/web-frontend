import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Row, Col, Avatar, Form, Radio, message} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import FormCheckBox from '../components/FormCheckBox';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useRegister } from '../services/auth';
import Card from '../components/ui/Card/Card'
import procurement from '../assets/procurement3.jpg'


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
    <Row>
    <Col span={12} className=''>
       <div  style={{height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
         <img src={procurement} alt='procurement login' width='100%' height='100%'/>
       </div>
    </Col>

    <Col span={12} >
        <div className='' style={{width: '50%', height: '100vh',  margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className='' style={{textAlign: 'center', width: '460px', }} >
                    <div className="mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p className="card-header">Create an Account</p>
                        
                    </div>

                
            </Card>
        </div>
        

       
    </Col>
</Row>
  );
}

export default Signup;
