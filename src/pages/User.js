// src/pages/User.js
import React, { useState, useEffect } from 'react';
import ImageLoader from '../components/Loader';
import Header from '../components/Header';
import { Row, Col,Card, Avatar, Typography, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserOutlined,CheckCircleOutlined } from '@ant-design/icons';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Button from '../components/Button';
const { Title, Text } = Typography;

const User = ({ API_URL, Companyname }) => {
    const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} }; // Replace with actual user data
    const [isLoading, setIsLoading] = useState(true);
    const userStatus = "Verified"; // This could be dynamic based on your user data

    const getStatusStyle = (status) => {
      switch (status) {
          case "Verified":
              return { color: 'green' };  // Green for Verified
          case "Ongoing":
              return { color: 'orange' }; // Orange for Ongoing
          case "Rejected":
              return { color: 'red' };    // Red for Rejected
          default:
              return { color: 'black' };  // Default color
      }
  };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simulate loading delay
    }, []);

    if (isLoading) {
        return <ImageLoader src={oahseicon} alt='oahse' src2={oahselogo} alt2='oahse' />;
    }

    return (
        <div className="user">
            <Header Companyname={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
            <Container fluid>
                <Row className='py-5 gradient-bg'>
                    <Col className='text-center mt-5' sm={12} md={6} lg={6}>
                        <Avatar size={100} icon={<UserOutlined />} />
                    </Col>
                    <Col className='py-4 mt-5'>
                        <Title level={2}>
                            Olaitan Chinedu Rufai <CheckCircleOutlined style={{ color: 'green' }} />
                        </Title>
                        <Text>
                            <i className="fa-sharp fa-light fa-phone m-2"></i> +2349012345678
                        </Text>
                        <br />
                        <Text>
                            <i className="fa-sharp fa-light fa-envelope m-2"></i>ocrafiu@ncc.com
                        </Text>
                        <br />
                        <Text>
                            <i className="fa-light fa-location-dot m-2"></i> Ikoyi, Lagos State, Nigeria
                        </Text>
                        <br />
                        <Link to="/edit-profile">
                            <Button type="primary" style={{ marginTop: '16px' }} className={'mt-4 outline-btn'} text='Edit Profile' />
                        </Link>
                    </Col>
                </Row>

                {/* Descriptions for user information */}
                <Descriptions title="User Information" layout="vertical" bordered className="p-2 mt-4">
                  <Descriptions.Item label={<strong>User ID</strong>}>110022</Descriptions.Item>
                  <Descriptions.Item label={<strong>Account Type</strong>}>Individual</Descriptions.Item>
                  <Descriptions.Item label={<strong>Status</strong>} style={getStatusStyle(userStatus)}>
                      <span style={getStatusStyle(userStatus)}>{userStatus}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label={<strong>National ID</strong>}>110022456098</Descriptions.Item>
                  <Descriptions.Item label={<strong>Certification</strong>}>COREN</Descriptions.Item>
                  <Descriptions.Item label={<strong>Certification ID</strong>}>110022</Descriptions.Item>
              </Descriptions>

                {/* Bottom Icon Row */}
                <Row className='p-5 text-center' gutter={[16, 16]}>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Link to={{ pathname: `/profile/reports/${1455}` }} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card hoverable>
                            <i className="fa-sharp fa-thin fa-file-chart-column" style={{ fontSize: '28px' }}></i>
                            <Title level={4}>Reports</Title>
                        </Card>
                        </Link>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card hoverable>
                        <i className="fa-thin fa-floppy-disk-circle-arrow-right" style={{ fontSize: '28px' }}></i>
                        <Title level={4}>Saved Items</Title>
                        </Card>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card hoverable>
                        <i className="fa-sharp fa-thin fa-file-check" style={{ fontSize: '28px' }}></i>
                        <Title level={4}>Submissions</Title>
                        </Card>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card hoverable>
                        <i className="fa-thin fa-wallet" style={{ fontSize: '28px' }}></i>
                        <Title level={4}>Payment</Title>
                        </Card>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card hoverable>
                        <i className="fa-thin fa-left-from-bracket" style={{ fontSize: '28px' }}></i>
                        <Title level={4}>Logout</Title>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default User;
