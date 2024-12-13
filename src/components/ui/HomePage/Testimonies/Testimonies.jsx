import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Avatar, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Testimonies.css';
import Text from '../../Typography/Text';
import Card from '../../Card/Card';

const HomepageTestimonies = ({ isMobile }) => {
  // Array of testimonies (just as an example)
  const testimonies = [
    {
      name: "Mayank Balakrishnan",
      title: "Founder of Fetherstill Inc.",
      text: "I have been having difficulty sourcing materials which I work with, and even if I do get it, I spend a lot until I came across this platform, OAHSE!"
    },
    {
      name: "John Doe",
      title: "Founder of ABC Corp.",
      text: "OAHSE has been a game changer in how I source and manage resources. Highly recommend!"
    },
    // Add more testimonies as needed
  ];

  // State for the current testimony
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);

  // Function to navigate to the next testimony
  const nextTestimony = () => {
    if (currentTestimonyIndex < testimonies.length - 1) {
      setCurrentTestimonyIndex(currentTestimonyIndex + 1);
    }
  };

  // Function to navigate to the previous testimony
  const prevTestimony = () => {
    if (currentTestimonyIndex > 0) {
      setCurrentTestimonyIndex(currentTestimonyIndex - 1);
    }
  };

  const currentTestimony = testimonies[currentTestimonyIndex];

  return (
    <div className="p-2">
      <Card className="homepage-testimonies row m-1 mb-3" cardBodyClass="row">
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-content d-flex flex-row align-items-center">
            <Avatar
              shape="circle"
              size={isMobile ? 70 : 130}
              alt="Testimony Image"
              className="m-1 homepage-testimonies-image"
            />
            <span className="homepage-testimonies-name">
              <Text fontColor="text-white" fontSize="fs-md" fontWeight="fw-500">
                {currentTestimony.name}
              </Text>
              <Text tag="small" fontSize="fs-sm" fontColor="text-link" fontWeight="fw-200">
                {currentTestimony.title}
              </Text>
            </span>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="homepage-testimonies-writeup">
            <Text fontWeight="fw-300" fontSize="fs-md" fontColor="text-white">
              “{currentTestimony.text}”
            </Text>
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="navigation-buttons d-flex justify-content-between">
        <Button
          icon={<LeftOutlined />}
          onClick={prevTestimony}
          disabled={currentTestimonyIndex === 0}
          className="prev-button"
        >
          Prev
        </Button>
        <Button
          icon={<RightOutlined />}
          onClick={nextTestimony}
          disabled={currentTestimonyIndex === testimonies.length - 1}
          className="next-button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Prop Validation
HomepageTestimonies.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default HomepageTestimonies;
