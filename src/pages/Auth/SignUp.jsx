import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Radio, message, Card} from 'antd';
import ImageLoader from '../../components/ui/Loader/Loader';
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import FormInput from '../../components/ui/Input/FormInput/FormInput';
import FormSelect from '../../components/ui/Input/FormInput/FormSelect'
import FormCheckBox from '../../components/ui/Input/FormInput/FormCheckBox';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import { useRegister } from '../../services/auth';
// import procurement from '../../assets/procurement3.jpg'
// import axios from 'axios'
import {useCountries} from '../../hooks/useCountry';

function Signup({ API_URL }) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(""); // Store selected user type
  const { register, loading, error, user } = useRegister(); // Use the register hook
  
  const countries = useCountries();
  // console.log('----sdsd', countries)
  

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
    setUserType('')
    if (redirectToHome) {
      navigate('/verify-email-otp'); // Redirect on successful login
    }

  }, [redirectToHome, navigate]);



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
    <Row className='mt-4'>

        <Col className='p-3' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card className='' style={{textAlign: 'center', width: '500px', backgroundColor: '#D9D9D9', }} >
                    <Row className='py-3'>
                        <Col span={24}>
                            <p className="card-header text-center">Sign Up</p>
                            {/* <span className="text-end">Log In</span> */}
                        </Col>
                    </Row>
                        <Form 
                            name="signup"
                            // layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                            newsletter: true, // Default checkbox to checked
                            }}
                        >
                            <FormSelect
                                label='Select a Country'
                                name='Country'
                                placeholder='Please select a country'
                                options={countries.map(country => ({
                                  label: country.name,   // rename 'name' to 'label'
                                  icon: country.flag,    // rename 'flag' to 'icon'
                                  code:country.code
                                }))}
                            />
                           
                          <Form.Item label='Trade Role'>
                            <Radio.Group >
                                    <Radio value={1}>Buyer</Radio>
                                    <Radio value={2}>Seller</Radio>
                                    <Radio value={3}>Both</Radio>
                                </Radio.Group>
                          </Form.Item>
                            <Row gutter={16} >
                                <Col span={12} >
                                    {/* <Form.Item> */}
                                        <FormInput name='name' placeholder='First name' 
                                            rules={[{ required: true, message: 'Please enter your name' }]}
                                        />
                                    {/* </Form.Item> */}
                                </Col>

                                <Col span={12}>
                                    {/* <Form.Item> */}
                                        <FormInput name='name' placeholder='Last name' 
                                            rules={[{ required: true, message: 'Please enter your name' }]}
                                        />
                                    {/* </Form.Item> */}
                                </Col>
                            </Row>
      
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
                                type='password'
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

                            <FormCheckBox>  
                                    I agree to a) Free Membership Agreement, 
                                    b)Terms of Use, and c) Privacy Policy
                                </FormCheckBox>
                            

                            <FormCheckBox>  
                                    I would like to receive your newsletter and promotional updates 
                                    from Oahse about its products and services.
                            </FormCheckBox>
                            
                            <Form.Item>
                                <Button type="primary" htmlType="submit" text="Register" className='' style={{width: '100%',}}/>
                                {/* <Button type="primary" onClick={showModal} text='OTP'/>  */}
                            </Form.Item>
                        </Form>
                    
                </Card>
        </Col>
         {/* OTP Modal */}
            {/* <Modal
                style={{backgroundColor: '#D9D9D9', textAlign: 'center' }}
                open={open}
                title=""
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                // footer={(_, { OkBtn, CancelBtn }) => (
                // <>
                //     <Button onClick={handleOk}>Verify</Button>
                //     <CancelBtn />
                //     <OkBtn className='button'/>
                // </>
                // )}
            >
               
                    <h3>Verify your Email</h3>
                    <p>Enter the 4-digit code sent to your e-mail</p>
                <Form layout='vertical'>
                    <Flex gap="middle" align="flex-start-center" vertical className='py-3'>
                        <Input.OTP length={5} variant="variant" className='formInput' name='otp'/>
                    </Flex>
                    
                    <Button onClick={handleOk}>Verify</Button>
                </Form>
                <p>Did not get a code? Resend in 00:50</p>
                
                
            </Modal> */}
    </Row>
  );
}

export default Signup;
