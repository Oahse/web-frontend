import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Col, Form, Row} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/ui/FormInput/FormInput'
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
    <Row className='mt-4'>
        <Col className='p-3' style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card  className='' style={{textAlign: 'center', width: '500px', backgroundColor: '#D9D9D9', }} >
              <div className='mb-4'>
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
              
                <Form.Item className='mt-3 d-flex justify-content-center align-items-center'>
                  <Button type="primary" htmlType="submit" text='Reset' />
                </Form.Item>

                
              </Form>
            </Card>
        </Col>
    </Row>
  );
}

export default PasswordReset;
