import React, { useEffect } from 'react';
import ImageLoader from '../components/ui/Loader/Loader';

import { Row, Col, Card, Avatar, Typography, Descriptions } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';

import { useAuth } from '../services/auth'; // Assuming the hook is in services/auth.js
import Button from '../components/ui/Button/Button';
import Footer from '../components/ui/Footer/Footer';
import Header from '../components/ui/Header/Header';
import useDeviceType from '../hooks/useDeviceType';

const { Title, Text } = Typography;

const User = ({ API_URL, Companyname }) => {
    const { isLoggedIn, userDetails, loading } = useAuth(); // Use the hook to get auth state
    const { isMobile } = useDeviceType();
    const userStatus = userDetails?.verified ? 'Verified' : 'Not Verified'; // Use 'Verified' or 'Not Verified'
    const userFullName = `${userDetails?.first_name} ${userDetails?.last_name}`;
    const userPhoneNumber = userDetails?.phonenumber || 'N/A';
    const userEmail = userDetails?.email || 'N/A';
    const userAddress = userDetails?.address || 'N/A';
    const userRating = userDetails?.avgratings || 'N/A';

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Verified':
                return { color: 'green' };  // Green for Verified
            case 'Not Verified':
                return { color: 'orange' }; // Orange for Not Verified
            default:
                return { color: 'black' };  // Default color
        }
    };

    const getUserRoles = () => {
        const roles = [];
        if (userDetails?.is_deliverer) roles.push('Deliverer');
        if (userDetails?.is_business) roles.push('Business');
        if (userDetails?.is_distributor) roles.push('Distributor');
        if (userDetails?.is_superuser) roles.push('Superuser');
        if (userDetails?.is_staff) roles.push('Staff');
        if (!roles.length) roles.push('Normal Client'); // Default to Normal Client if no roles are found
        return roles.join(', ');
    };

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            // For now, this is just to simulate the loading state while data is being fetched
        }, 2000);
    }, []);

    if (loading) {
        return <ImageLoader src={oahseicon} alt="oahse" src2={oahselogo} alt2="oahse" />;
    }

    if (isLoggedIn) {
        return  <Navigate to="/login" state={{'next-url':'/user'}} />;
    }

    return (
        <div className="user">
            <Header Companyname={Companyname} isScrolled={true} isMobile={isMobile} user={userDetails} />
            <Container fluid className='m-0'>
                <Row className="gradient-bg p-3 py-5mt-0 d-flex align-items-center">
                    <Col className="d-flex align-items-center mt-5" sm={12} md={6} lg={6}>
                        <Avatar size={200} icon={<UserOutlined />} />
                    </Col>
                    <Col className="py-4 mt-5">
                        <Title level={2}>
                            {userFullName} <CheckCircleOutlined style={{ color: 'green' }} />
                        </Title>
                        <Text>
                            <i className="fa-sharp fa-light fa-phone m-2"></i> {userPhoneNumber}
                        </Text>
                        <br />
                        <Text>
                            <i className="fa-sharp fa-light fa-envelope m-2"></i> {userEmail}
                        </Text>
                        <br />
                        <Text>
                            <i className="fa-light fa-location-dot m-2"></i> {userAddress}
                        </Text>
                        <br />
                        <Link to="/edit-profile" className='mt-4'>
                            <Button
                                
                                text="Edit Profile"
                            />
                        </Link>
                    </Col>
                </Row>

                {/* Descriptions for user information */}
                <Descriptions title="User Information" layout="vertical" bordered className="p-2 mt-4">
                    <Descriptions.Item label={<strong>User ID</strong>}>{userDetails?.id || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Status</strong>} style={getStatusStyle(userStatus)}>
                        <span style={getStatusStyle(userStatus)}>{userStatus}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Phone Number</strong>}>{userPhoneNumber}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Email</strong>}>{userEmail}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Rating</strong>}>{userRating}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Address</strong>}>{userAddress}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Verified At</strong>}>{userDetails?.verifiedAt || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label={<strong>User Roles</strong>}>
                        {getUserRoles()}
                    </Descriptions.Item>
                </Descriptions>

                {/* Bottom Icon Row */}
                <Row className="p-5 text-center" gutter={[16, 16]}>
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
            <Footer  className='footer' transparent={false}/>
        </div>
    );
};

export default User;
