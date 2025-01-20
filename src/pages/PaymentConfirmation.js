// src/pages/PaymentConfirmation.js
import React from 'react';
import { Row, Col, Card, Divider, Descriptions, Typography, message } from 'antd';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import { Footer } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

const PaymentConfirmation = ({ API_URL, Companyname,orderDetails, onConfirmPayment }) => {
  const navigate = useNavigate();
    const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
  // Mock Data (replace with real data)
  const mockOrderDetails = {
    orderNumber: 'ORD12345678',
    items: [
      { id: 1, name: 'Item 1', price: 50, quantity: 2 },
      { id: 2, name: 'Item 2', price: 30, quantity: 1 },
      { id: 3, name: 'Item 3', price: 20, quantity: 3 },
    ],
    totalPrice: 220,
    shippingAddress: '123 Main St, City, Country',
    paymentMethod: 'Visa **** 1234',
    shippingMethod: 'Standard Shipping (5-7 Days)',
  };

  const handleConfirmOrder = () => {
    message.success('Your order has been placed successfully!');
    // Redirect to Order Success / Thank You page here
    navigate('/payment/confirmation/orderresult')
  };

  const orderSummary = mockOrderDetails.items.map((item) => (
    <Row key={item.id} justify="space-between" className="mb-2">
      <Col>{item.name}</Col>
      <Col>{`$${(item.price * item.quantity).toFixed(2)} (${item.quantity})`}</Col>
    </Row>
  ));

  return (
    <div className="payment-confirmation">
        <span className="d-flex flex-column topbar mb-5">
            <Header Companyname={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
        </span>
        <Container fluid className='mt-5'>
            <Row justify="center">
                <Col xs={24} md={16} lg={12} className='mt-5 mb-5'>
                    <Card bordered={false} className="shadow-sm">
                        <Title level={3}>Order Review</Title>
                        <Descriptions bordered size="middle" column={1}>
                        <Descriptions.Item label="Order Number">
                            {mockOrderDetails.orderNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Address">
                            {mockOrderDetails.shippingAddress}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method">
                            {mockOrderDetails.paymentMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Method">
                            {mockOrderDetails.shippingMethod}
                        </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <Title level={4}>Order Summary</Title>
                        {orderSummary}

                        <Divider />

                        <Row justify="space-between" className="mb-2">
                        <Text strong>Total Price:</Text>
                        <Text strong>${mockOrderDetails.totalPrice.toFixed(2)}</Text>
                        </Row>

                        <Divider />

                        <Row justify="center">
                        {/* Use your custom button for Checkout */}
                        <Button 
                            type="button" 
                            htmlType="button" 
                            className="mt-1 mb-5" 
                            text={<span> Complete</span>}  
                            onClick={handleConfirmOrder} 
                        />
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Footer  className='footer' transparent={false}/>
        </Container>
        
    </div>
  );
};

export default PaymentConfirmation;
