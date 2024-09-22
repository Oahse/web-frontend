import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Form} from 'antd';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import FormInput from '../components/FormInput';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ReactComponent as FingerprintIcon } from '../assets/icons/fingerprint.svg';
import { ReactComponent as FaceIdIcon } from '../assets/icons/faceid.svg';


function Login({ API_URL }) {
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
                <span style={{ marginLeft: 'auto' }} className='title'>Login</span>
                <Link to='/signup' className='semititle' style={{ marginLeft: 'auto' }}>Sign Up</Link>
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
            
            <div className='minititle mb-4 d-flex flex-column' style={{ textAlign: 'right' }}>
                
                <Link to="/forgotpassword"><small >Forgot Password? </small></Link>
                <Link to="/signup"><small>Sign up</small></Link>
              </div>
            
            <div className='minititle mb-4 d-flex flex-column' style={{ textAlign: 'left' }}>
                <small className='m-2'>
                  <Link to="/login-fingerprint">Use fingerprint?
                  <FingerprintIcon style={{ width: '32px', height: '32px', marginLeft:'8px'}} />
                  </Link> 
                  
                  </small>

                <small className='m-2'>
                  <Link to="/login-face">Use face id?
                  <FaceIdIcon style={{ width: '26px', height: '26px', marginLeft:'8px'}} />
                </Link> 
                </small>
                  
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" text='Login' />
              </Form.Item>

              
            </Form>
          </Card>
  );
}

export default Login;
