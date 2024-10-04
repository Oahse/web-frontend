// src/pages/OrdersList.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Divider, List, Button } from 'antd';
import Header from '../components/Header'; // Your custom header component
import FilterComponent from '../components/Filter'; // Importing the existing filter component
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const OrdersList = ({ API_URL, Companyname }) => {
  const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
  const navigate = useNavigate();

  // Mock Data (replace with real API data)
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [viewType, setViewType] = useState('list'); // State for view type
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch or mock your order data
    const mockOrdersData = [
      { orderNumber: 'ORD12345678', date: '2024-10-01', status: 'Delivered', totalPrice: 220 },
      { orderNumber: 'ORD12345679', date: '2024-09-28', status: 'Processing', totalPrice: 180 },
      { orderNumber: 'ORD12345680', date: '2024-09-15', status: 'Cancelled', totalPrice: 150 },
    ];

    setOrders(mockOrdersData);
    setFilteredOrders(mockOrdersData);
  }, []);

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Handle search change
  const handleSearchChange = (value) => {
    setSearch(value);
  };

  
  useEffect(() => {
    // Filter orders based on status and search
  const applyFilters = () => {
    let filtered = orders;
    if (filter) {
      filtered = filtered.filter(order => order.status === filter);
    }
    if (search) {
      filtered = filtered.filter(order => order.orderNumber.includes(search));
    }
    setFilteredOrders(filtered);
  };

    applyFilters();
  }, [filter, orders, search]);

  return (
    <div className="orders-list">
      <Header Companyname={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
      
      <Row justify="center" className="mt-5">
        <Col xs={24} md={16} lg={12} className="mt-5 mb-5">
          <Card bordered={false} className="shadow-sm">
            <Title level={3} className="text-center">Your Orders</Title>
            <Divider />
            
            {/* Use the imported FilterComponent */}
            <FilterComponent onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

            <div className="view-toggle mb-3">
              <Button onClick={() => setViewType('list')} type={viewType === 'list' ? 'primary' : 'default'}>List View</Button>
              <Button onClick={() => setViewType('grid')} type={viewType === 'grid' ? 'primary' : 'default'} style={{ marginLeft: 10 }}>Grid View</Button>
            </div>

            {viewType === 'list' ? (
              <List
                itemLayout="horizontal"
                dataSource={filteredOrders}
                renderItem={order => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => navigate(`/order/${order.orderNumber}`)}
                      >
                        View Details
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text strong>Order Number: {order.orderNumber}</Text>}
                      description={
                        <div>
                          <Text>Date: {order.date}</Text>
                          <br />
                          <Text>Status: {order.status}</Text>
                          <br />
                          <Text>Total Price: ${order.totalPrice.toFixed(2)}</Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Row gutter={[16, 16]}>
                {filteredOrders.map(order => (
                  <Col xs={24} sm={12} md={8} key={order.orderNumber}>
                    <Card bordered={false} className="shadow-sm">
                      <Title level={4}>Order Number: {order.orderNumber}</Title>
                      <Text>Date: {order.date}</Text>
                      <br />
                      <Text>Status: {order.status}</Text>
                      <br />
                      <Text>Total Price: ${order.totalPrice.toFixed(2)}</Text>
                      <div style={{ textAlign: 'right' }}>
                        <Button type="link" onClick={() => navigate(`/order/${order.orderNumber}`)}>View Details</Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrdersList;
