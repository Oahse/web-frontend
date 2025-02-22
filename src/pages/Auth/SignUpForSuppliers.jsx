import React, { useEffect, useState } from 'react';

import { Col, Form, Row,message, Card} from 'antd';

import procurement from '../../assets/suppliersimg.jpeg'
import FormInput from '../../components/ui/FormInput/FormInput';
import FormSelect from '../../components/ui/FormInput/FormSelect'

import Button from '../../components/ui/Button/Button';

import useDeviceType from '../../hooks/useDeviceType';
import './Auth.css';
import FormCheckBox from '../../components/ui/FormInput/FormCheckBox';

function SignUpForSuppliers() {
    const { isMobile, isTablet} = useDeviceType();
    const [countries, setCountries] = useState([])
    // const [selectedCountry, setSelectedCountry] = useState('')

    // if (loading) {
    //     return (
    //       <ImageLoader
    //         src={oahseicon}
    //         alt="oahse"
    //         src2={oahselogo}
    //         alt2="oahse"
    //       />
    //     );
    //   }

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

  return (
    <Row  className='mt-4'>
    <Col className={isMobile || isTablet ? 'hidden' : ''} xl={12} lg={12} style={{boxSizing:'border-box'}}> 
       <div  style={{height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
         <img src={procurement} alt='procurement login' width='100%' height='100%'/>
       </div>
    </Col>

    <Col className='px-4' xl={12} lg={12} md={24} sm={24} style={{boxSizing:'border-box'}}>
        <div className='' style={{width: '100%', height: '100%',  margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className='' style={{textAlign: 'center', width: '460px', backgroundColor: '#D9D9D9', }} >
                <div className="mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span className="card-header">Let's get started</span>
                </div>

                <Form
                    // form={form}
                    name="signup"
                    // layout="vertical"
                    // onFinish={onFinish}
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
                    <div className='d-flex justify-content-center align-items-center'>
                        <span className='d-flex justify-content-between align-items-center'>
                            <Button text={<i className="fa-brands fa-google"></i>}/>
                            <Button text={<i className="fa-brands fa-apple"></i>}  className='mx-1'/>
                            <Button text={<i className="fa-brands fa-linkedin"></i>}/>                     
                        </span>
                    </div>

                    <div>
                        <div>
                            <p>or Sign in with</p>
                        </div>

                        <div>
                        <FormInput
                        name="email"
                        placeholder="Email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    />

                            <Row gutter={16} >
                                <Col span={12} >
                                        <FormInput name='name' placeholder='First name' 
                                            rules={[{ required: true, message: 'Please enter your name' }]}
                                        />
                                </Col>

                                <Col span={12}>
                                        <FormInput name='name' placeholder='Last name' 
                                            rules={[{ required: true, message: 'Please enter your name' }]}
                                        />
                                </Col>
                            </Row>
      
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
                            I agree to receive your newsletter and promotional updates 
                            from Oahse's products and services.
                            </FormCheckBox>
                            
                    <Form.Item>
                    <Button type="primary" htmlType="submit" text="Create Account" className='' style={{width: '100%',}}/>
                    </Form.Item>
                        </div>   
                    </div>
                   
                </Form>
            </Card>
        </div>
        

       
    </Col>
</Row>
  )
}

export default SignUpForSuppliers