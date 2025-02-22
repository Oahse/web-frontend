import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card, Form} from 'antd';
import ImageLoader from '../../components/Loader';
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FingerprintIcon } from '../../assets/icons/fingerprint.svg';


function Loginfingerprint({ API_URL }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

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
              <span onClick={handleGoBack} className='semititle' style={{ marginRight: 'auto', cursor:'pointer' }}>back</span>
              <span style={{ marginRight: 'auto' }} className='title'>FingerPrint</span>
                
            </div>
            <FingerprintIcon style={{ width: '80px', height: '80px'}} />
            <Form
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                newsletter: true,  // Default checkbox to checked
              }}
            ></Form>
          </Card>
  );
}

export default Loginfingerprint;
