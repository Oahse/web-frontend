// src/pages/OrderSuccess.js
import React from 'react';
import { Row, Col, Card, Typography, Divider, Descriptions } from 'antd';
import Button from '../components/Button'; // Your custom button component
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const OrderResult = ({ API_URL, Companyname, orderDetails, onContinueShopping }) => {
  const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
  const navigate = useNavigate();
  // Mock Data (replace with real data)
  const mockOrderDetails = {
    orderNumber: 'ORD12345678',
    totalPrice: 220,
    shippingAddress: '123 Main St, City, Country',
    shippingMethod: 'Standard Shipping (5-7 Days)',
    estimatedDelivery: '5-7 Days',
  };

  return (
    <div className="order-success">
      <span className="d-flex flex-column topbar mb-5">
        <Header Companyname={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
      </span>

      <Container fluid className='mt-5'>
        <Row justify="center">
          <Col xs={24} md={16} lg={12} className='mt-5 mb-5'>
            <Card bordered={false} className="shadow-sm">
              <Title level={3} className="text-center text-success">Thank You for Your Order!</Title>
              <Divider />

              <Text strong>Your order has been successfully placed. Below are the details:</Text>

              <Descriptions bordered size="middle" column={1} className="mt-3">
                <Descriptions.Item label="Order Number">
                  {mockOrderDetails.orderNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Shipping Address">
                  {mockOrderDetails.shippingAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Shipping Method">
                  {mockOrderDetails.shippingMethod}
                </Descriptions.Item>
                <Descriptions.Item label="Estimated Delivery">
                  {mockOrderDetails.estimatedDelivery}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Row justify="space-between" className="mb-2">
                <Text strong>Total Price:</Text>
                <Text strong>${mockOrderDetails.totalPrice.toFixed(2)}</Text>
              </Row>

              <Divider />

              {/* Options for Next Steps */}
              <Title level={4} className="mt-3">Next Steps</Title>
              <Text>
                Your items will be shipped within the estimated delivery time. You can track your order from your account page, or if you have any issues, feel free to contact us.
              </Text>

              <Divider />

              {/* Buttons for Tracking Order and Continuing Shopping */}
              <Row justify="center" className="mt-4">
                <Col xs={24} sm={11} className="mb-3">
                  <Button
                    type="button"
                    htmlType="button"
                    className="m-1"
                    text={<span><i className="fa-light fa-box"></i> Track Your Order</span>}
                    onClick={() => {
                      // Add your tracking page logic here
                      navigate(`/payment/order/${mockOrderDetails.orderNumber}`)
                      console.log('Track order clicked');
                    }}
                  />
                </Col>

                <Col xs={24} sm={11}>
                  <Button
                    type="button"
                    htmlType="button"
                    className="m-1"
                    text={<span><i className="fa-light fa-shop"></i> Continue Shopping</span>}
                    onClick={navigate('/')}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderResult;
