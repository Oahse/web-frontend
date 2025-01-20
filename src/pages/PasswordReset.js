import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Form} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import Button from '../components/ui/Button/Button';

function PasswordReset({ API_URL }) {
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
            <div className='mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span className='title '>Reset Password</span>
            </div>
            <Form
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                }}
            >
              
              <FormInput 
                //label="Password"
                name="password"
                type = 'password'
                placeholder="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                />

            <FormInput 
                //label="Password"
                name="confirmpassword"
                type = 'password'
                placeholder="Confirm Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                />
            
              <Form.Item>
                <Button type="primary" htmlType="submit" text='Reset' />
              </Form.Item>

              
            </Form>
          </Card>
  );
}

export default PasswordReset;
