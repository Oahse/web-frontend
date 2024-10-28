import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card } from 'antd';
import Button from '../components/Button';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import { useNavigate } from 'react-router-dom';

function VerifyMailConfirmation({ API_URL }) {
  const navigate = useNavigate();
  const isLoading = false;

  const onClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <ImageLoader
        src={oahseicon}
        alt='oahse'
        src2={oahselogo}
        alt2='oahse'
      />
    );
  }

  return (
    <div
      className='signup'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <Card
        className={`signup ${!isMobile ? 'bigpadding' : ''}`}
        style={{
          textAlign: 'center',
          border: 'none',
          width: isMobile ? '90%' : '400px', // Responsive width
          position: 'relative', // To position footer absolutely
        }}
      >
        <div
          style={{
            backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cce7/92f6/6782be924dd4349bc7f570b4717c8fb7?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HqrLUahLGKRjyUtny9tXfgb3jZN61QZWfrjnQm4YcTUPF6j-0IAB-tcz4dfGMO6LkMyTDgWXQ78BIWvk-gyt4jyfr4mjjTdhRzRIWA0l2IfvOVISB9PUeBooC252lZ-AVrQNIZ4iE3zzJVeM5dFzb5tk2Od6Xm0YAhZyFimTVspmFX1KbUyssxj06XHarP2KqyywUy~wuS56ea1OraVWEcosNqyp2EbQqITZbwIGmxSnUUw8OP1EIfO8oui5IbYEtjfAC2YtMYRC6gYzOc7jtuLdE6B4~v1x60lOj1iL87cXI-qA5TYSwcJUnW6uGyonOscx~s~lOYJnEGcAx19zww__')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '300px', // Height for cover image
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        />
        <div style={{ padding: '20px' }}>
          <h2>Verify Your Email</h2>
          <p>We have sent a verification link to your email.</p>
        </div>
        <div style={{ padding: '10px' }}>
          <Button
            type="primary"
            htmlType="button" // Changed to 'button' to avoid form submission
            text='Next'
            style={{ width: '100%', marginTop: '20px' }}
            onClick={onClick}
          />
        </div>
      </Card>
    </div>
  );
}

export default VerifyMailConfirmation;
