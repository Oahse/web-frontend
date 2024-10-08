import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Form} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import FormCheckBox from '../components/FormCheckBox';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Signup({ API_URL }) {
  //const [isLoading, setIsLoading] = useState(false); // Start with loading true
  // setIsLoading(true);
  const isLoading = false;
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
   if (isLoading){
    return <ImageLoader
      src={oahseicon}
      alt='oahse'
      src2 ={oahselogo}
      alt2='oahse'
    />
   }
  return (
    <Card className={`signup ${!isMobile ? 'bigpadding':''}`} style={{textAlign:'center'}}>
            <div className='mb-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ marginLeft: 'auto' }} className='title'>Sign Up</span>
                <Link to='/login' className='semititle' style={{ marginLeft: 'auto' }}>Login</Link>
            </div>
            <Form
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                newsletter: true,  // Default checkbox to checked
              }}
            >
              
              <FormInput 
                //label="Name"
                name="name"
                placeholder="Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
                />
            <FormInput 
                //label="Email"
                name="email"
                placeholder="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                />

            <FormInput 
                //label="Password"
                name="password"
                type = 'password'
                placeholder="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                />
            <FormInput 
                //label="Confirm Password"
                name="confirmPassword"
                placeholder="ConfirmPassword"
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
            <div className='minititle mb-4' style={{ textAlign: 'right' }}>
                <small >Already have an account? </small>
                <Link to="/login">Login</Link>
              </div>
              
            <FormCheckBox name="newsletter" valuePropName="checked" text={'I would like to receive your newsletter and other promotional information.'} />

              <Form.Item>
                <Button type="primary" htmlType="submit" text='Register' />
              </Form.Item>

              
            </Form>
          </Card>
  );
}

export default Signup;
