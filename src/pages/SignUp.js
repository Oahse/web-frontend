import React, { Children, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Row, Col, Avatar, Form, Radio, message, Cascader, Checkbox, Select, Modal, Input, Flex} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/ui/FormInput/FormInput';
import FormSelect from '../components/ui/FormInput/FormSelect'
import FormCheckBox from '../components/FormCheckBox';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import { useRegister } from '../services/auth';
import Card from '../components/ui/Card/Card'
import procurement from '../assets/procurement3.jpg'
import axios from 'axios'
import {useCountries} from '../hooks/useCountry';

function Signup({ API_URL }) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(""); // Store selected user type
  const { register, loading, error, user } = useRegister(); // Use the register hook
  const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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

//   useEffect(() => {
//     // Fetch countries and flags
//     axios
//       .get("https://restcountries.com/v3.1/all")
//       .then((response) => {
//         const countryData = response.data.map((country) => ({
//           name: country.name.common,
//           flag: country.flags.svg, // URL for the flag
//           code: country.cca2, // ISO code
//         }))
//         .sort((a, b) => a.name.localeCompare(b.name));
//         setCountries(countryData);
//       })
//       .catch((error) => console.error("Error fetching countries:", error));
//   }, []);

  // Handle change in selected user type
  
     useEffect(() => {
            const fetchCountries = async () => {
              try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
        
                // Transform API data into options for the FormSelect component
                const countryOptions = data.map((country) => ({
                  value: country.cca2, // Use the country code as the value
                  label: country.name.common, // Use the common name as the label
                  flag: country.flags.svg, // URL of the country's flag image
                })) 
                .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by label
        
                setCountries(countryOptions);
              } catch (error) {
                console.error("Error fetching countries:", error);
                message.error("Failed to fetch countries!");
              }
            };
        
            fetchCountries();
          }, []);
        
          const customFilterOption = (input, option) => {
            return option.label.toLowerCase().includes(input.toLowerCase());
          };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  

//   const handleCountryChange = (event) => {
//     const selectedName = event.target.value;
//     const country = countries.find((c) => c.name === selectedName);
//     setSelectedCountry(country);
//   };


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

        <Col className='py-3' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                options={countries}
                                filterOption={customFilterOption}
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

                            <Form.Item>
                                <Checkbox>  
                                    I agree to a) Free Membership Agreement, 
                                    b)Terms of Use, and c) Privacy Policy
                                </Checkbox>
                            </Form.Item>
                            

                            <Form.Item>
                                <Checkbox>  
                                    I would like to receive your newsletter and promotional updates 
                                    from Oahse about its products and services.
                                </Checkbox>
                            </Form.Item>
                            
                            <Form.Item>
                                <Button type="primary" htmlType="submit" text="Register" className='' style={{width: '100%',}}/>
                                {/* <Button type="primary" onClick={showModal} text='OTP'/>  */}
                            </Form.Item>
                        </Form>
                    
                </Card>
            </div>
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
