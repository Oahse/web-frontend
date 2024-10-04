// src/pages/TradingOrder.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Divider, Descriptions, Timeline, message, Tag } from 'antd';
import { useParams } from 'react-router-dom'; // To capture the order ID from the URL
import Header from '../components/Header';
import Button from '../components/Button'; // Your custom Button component
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const TrackingOrder = ({ API_URL, Companyname }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get order ID from URL
  const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to get the appropriate color based on status
    const getStatusTagColor = (status) => {
        switch (status.toLowerCase()) {
        case 'delivered':
            return 'green';
        case 'ongoing':
        case 'processing':
            return 'orange';
        default:
            return 'red';
        }
    };

  // Fetch order details from API using order ID
  useEffect(() => {
    // Replace this mock data with an actual API call
    const fetchOrderDetails = async () => {
      try {
        // Example API call
        // const response = await fetch(`${API_URL}/orders/${id}`);
        // const data = await response.json();

        // Mock Data
        const mockData = {
          orderId: id,
          symbol: 'AAPL',
          quantity: 100,
          price: 150.25,
          total: 15025,
          orderType: 'Limit Order',
          orderDate: '2023-10-05',
          status: 'Filled',
          timeline: [
            { status: 'Order Placed', date: '2023-10-04' },
            { status: 'Processing', date: '2023-10-04' },
            { status: 'Delivered', date: '2023-10-05' },
          ],
        };

        setOrderDetails(mockData);
      } catch (error) {
        message.error('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = () => {
    // Handle the logic for canceling the order
    message.warning('Order cancellation feature is not yet implemented.');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trading-order">
      <span className="d-flex flex-column topbar mb-5">
        <Header Companyname={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
      </span>

      <Container fluid className='mt-5'>
        <Row justify="center">
          <Col xs={24} md={16} lg={12} className='mt-5 mb-5'>
            <Card bordered={false} className="shadow-sm">
              <Title level={3} className="text-center">Order Details for #{orderDetails.orderId}</Title>

              <Descriptions bordered size="middle" column={1} className="mt-4">
                <Descriptions.Item label="Symbol">{orderDetails.symbol}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{orderDetails.quantity}</Descriptions.Item>
                <Descriptions.Item label="Price">${orderDetails.price.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Total">${orderDetails.total.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Order Type">{orderDetails.orderType}</Descriptions.Item>
                <Descriptions.Item label="Order Date">{orderDetails.orderDate}</Descriptions.Item>
                <Descriptions.Item label="Status"><Tag color={getStatusTagColor(orderDetails.status)}>{orderDetails.status}</Tag></Descriptions.Item>
              </Descriptions>

              <Divider />

              {/* Order Timeline */}
              <Title level={4} className="mt-4">Order Timeline</Title>
              <Timeline className="mt-2">
                {orderDetails.timeline.map((event, index) => (
                  <Timeline.Item key={index}>
                    <Text>{event.status}</Text>
                    <br />
                    <Text type="secondary">{event.date}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>

              <Divider />

              <Row justify="center" className='mb-5'>
                {/* Use your custom Button component for Cancel Order */}
                <Button
                  type="button"
                  htmlType="button"
                  className="m-1"
                  text={<span><i className="fa-solid fa-ban text-danger"></i> Cancel Order</span>}
                  onClick={handleCancelOrder}
                />

                <Button
                  type="button"
                  htmlType="button"
                  className="m-1"
                  text='View in Account'
                  onClick={() => {
                    navigate(`/user/orders/${id}`)
                    message.success('Redirecting to account page...')
                  }}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TrackingOrder;
