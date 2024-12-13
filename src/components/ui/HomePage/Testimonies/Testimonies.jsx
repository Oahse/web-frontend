import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar } from 'antd';
import './Testimonies.css';
import Text from '../../Typography/Text';
import Card from '../../Card/Card';

const HomepageTestimonies = ({ isMobile }) => {
  return (
    <div className='hpt p-2 d-flex flex-row align-items-center'>
      <Card className="homepage-testimonies row m-1 mb-3" cardBodyClass='row'>
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-content d-flex flex-row align-items-center">
            <Avatar
              shape='circle'
              size={isMobile ? 70 : 130}
              alt="Testimony Image"
              className='m-1 homepage-testimonies-image'
            />
            <span className='homepage-testimonies-name'>
              <Text fontColor='text-white' fontSize='fs-md' fontWeight='fw-500'>Mayank Balakrishnan</Text>
              <Text tag='small' fontSize='fs-sm' fontColor='text-link' fontWeight='fw-200'>Founder of Fetherstill Inc.</Text>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-writeup">
            <Text fontWeight='fw-300' fontSize='fs-md' fontColor='text-white'>
              “I have been having difficulty sourcing materials which I work with, and even if I do get it, I spend a lot until I came across this platform, OAHSE!”
            </Text>
          </div>
        </div>
      </Card>

      <Card className="homepage-testimonies row m-1 mb-3" cardBodyClass='row'>
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-content d-flex flex-row align-items-center">
            <Avatar
              shape='circle'
              size={isMobile ? 70 : 130}
              alt="Testimony Image"
              className='m-1 homepage-testimonies-image'
            />
            <span className='homepage-testimonies-name'>
              <Text fontColor='text-white' fontSize='fs-md' fontWeight='fw-500'>Mayank Balakrishnan</Text>
              <Text tag='small' fontSize='fs-sm' fontColor='text-link' fontWeight='fw-200'>Founder of Fetherstill Inc.</Text>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-writeup">
            
            <Text fontWeight='fw-300' fontSize='fs-md' fontColor='text-white' c>
              “I have been having difficulty sourcing materials which I work with, and even if I do get it, I spend a lot until I came across this platform, OAHSE!”
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Prop Validation
HomepageTestimonies.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default HomepageTestimonies;
