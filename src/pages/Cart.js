// src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Avatar, message, Modal, Radio, Breadcrumb } from 'antd';
import Header from '../components/ui/Header/Header';
import Footer from '../components/ui/Footer/Footer';
import ImageLoader from '../components/ui/Loader/Loader';
import InputNumber from '../components/ui/Input/InputNumber';
import { Container } from 'react-bootstrap';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import SearchInput from '../components/ui/Input/SearchInput';
import useDeviceType from '../hooks/useDeviceType';
import { useCategories } from '../services/api';
import config from '../services/config';
import Table from '../components/ui/Table/Table';

const Cart = ({ API_URL, Companyname }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
    const { isMobile, isTablet,isDesktop } = useDeviceType();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const [selectedCard, setSelectedCard] = useState(null); // State for selected credit card

    // Sample Credit Card Data (replace with actual user data)
    const [creditCards, setCreditCards] = useState([
      { id: 1, cardNumber: '**** **** **** 1234', expiration: '12/25' },
      { id: 2, cardNumber: '**** **** **** 5678', expiration: '06/24' },
      { id: 3, cardNumber: '**** **** **** 9012', expiration: '09/26' },
    ]);

    // Sample Cart Data (replace with actual API response)
    useEffect(() => {
      setCreditCards([
        { id: 1, cardNumber: '**** **** **** 1234', expiration: '12/25' },
        { id: 2, cardNumber: '**** **** **** 5678', expiration: '06/24' },
        { id: 3, cardNumber: '**** **** **** 9012', expiration: '09/26' },
      ])
      setTimeout(() => {
        const mockItems = [
          { id: 1, name: 'Item 1', price: 50, quantity: 2, date: new Date(), image: 'https://via.placeholder.com/100' },
          { id: 2, name: 'Item 2', price: 30, quantity: 1, date: new Date(), image: 'https://via.placeholder.com/100' },
          { id: 3, name: 'Item 3', price: 20, quantity: 3, date: new Date(), image: 'https://via.placeholder.com/100' },
          { id: 4, name: 'Item 4', price: 40, quantity: 1, date: new Date(), image: 'https://via.placeholder.com/100' },
          { id: 5, name: 'Item 5', price: 100, quantity: 2, date: new Date(), image: 'https://via.placeholder.com/100' },
          { id: 6, name: 'Item 6', price: 150, quantity: 1, date: new Date(), image: 'https://via.placeholder.com/100' }
        ];
        setItems(mockItems);
        setFilteredItems(mockItems);
        calculateTotalPrice(mockItems);
        setIsLoading(false);
      }, 1000);
    }, []);

    // Function to filter items (if using search)
    const filterItems = ({ itemName, dateRange }) => {
      let filtered = items;
      if (itemName) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
      }

      if (dateRange && dateRange.length === 2) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= dateRange[0] && itemDate <= dateRange[1];
        });
      }

      setFilteredItems(filtered);
      calculateTotalPrice(filtered);
    };

    // Calculate total price of cart
    const calculateTotalPrice = (items) => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    // Handle quantity change
    const handleQuantityChange = (value, item) => {
      const updatedItems = items.map(i => {
        if (i.id === item.id) {
          return { ...i, quantity: value };
        }
        return i;
      });
      setItems(updatedItems);
      setFilteredItems(updatedItems);
      calculateTotalPrice(updatedItems);
    };
  
  
  const { categories:engineeringcategories, loading:iscategoryLoading, error:iscategoryerror } = useCategories(config.apiUrl);

  if (isLoading) {
      return <ImageLoader src={oahseicon} alt='oahse' src2={oahselogo} alt2='oahse' />;
  }

  // Columns for the Antd Table
  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <span className='d-flex flex-row align-items-center'>
          <Avatar src={record.image} size={36} style={{ marginRight: 8 }} />
          {record.name}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <InputNumber min={1} max={10} placeholder="Qty" value={record.quantity} onChange={(value) => handleQuantityChange(value, record)} />
      ),
    },
    {
      title: 'Total',
      dataIndex: '',
      key: 'total',
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      dataIndex: '',
      key: 'action',
      render: (_, record) => (
        <i className="fa-light fa-trash m-1 text-danger" style={{cursor:'pointer'}} onClick={() => handleRemoveItem(record.id, record.name)}></i>
        
      ),
    },
  ];

  // Remove item from cart
  const handleRemoveItem = (id, name) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    calculateTotalPrice(updatedItems);
    message.success(`${name} removed from cart.`);
  };

  
  // Batch delete selected items
  const handleBatchDelete = () => {
    const updatedItems = items.filter(item => !selectedRowKeys.includes(item.id));
      setItems(updatedItems);
      setFilteredItems(updatedItems);
      calculateTotalPrice(updatedItems);
      setSelectedRowKeys([]); // Clear selected keys
      setModalOpen(false);
      message.success('Selected items removed from cart.');
  };

  // Show modal for checkout
  const showCheckoutModal = () => {
      setIsModalVisible(true);
  };

  // Handle modal OK
  const handleOk = () => {
    if (selectedCard) {
        // Here you can implement your checkout logic
        setIsModalVisible(false);
        message.success(`Payment completed successfully with card ending in ${selectedCard.cardNumber.slice(-4)}!`);
        // Redirect to completed payment page or other logic
        navigate('/payment/confirmation')
    } else {
        message.error('Please select a credit card before proceeding.');
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Breadcrumbitems=[
      {
        title: <Link to="/" >Home</Link>,
      },
      {
        title: <Link to="/shop" >Shop</Link>,
      },
      {
        title: 'Cart',
      },
  ]

  return (
    <div className="cart">
      <span className="d-flex flex-column topbar">
        <Header Companyname={Companyname} isScrolled={true} isMobile={isMobile} user={userDetails} />
        
        <div className={`homepage-content`}>
            
            <div className='mt-4'>
                <Breadcrumb items={Breadcrumbitems}/>
                <SearchInput onSearch={filterItems} 
                    drawervisible={drawerVisible}
                    categoryoptions={engineeringcategories}
                    iscategoryLoading = {iscategoryLoading}
                    minprice={0}
                    maxprice ={1000000}  className='m-2'/>
                
            </div>
        </div>
      </span>
      <Container fluid>
        <Row>
          <Col span={24} className='mt-2'>
            <Table
              columns={columns}
              items={filteredItems}
              onSelectedRowKeys={(selectedRowKeys)=>(setSelectedRowKeys(selectedRowKeys))}
            />
          </Col>
        </Row>

        <Row justify="space-between" align="middle" className="mb-5 p-3">
          {/* Total Price */}
          <Col xs={24} sm={24} md={12} className="mb-3">
            <h6 className="text-dark text-center text-md-start">
              Total Price: ${totalPrice.toFixed(2)}
            </h6>
          </Col>
          
          {/* Buttons (Batch Delete and Checkout) */}
          <Col xs={24} sm={24} md={12} className="text-center text-md-end">
            {selectedRowKeys.length > 0 && (
              <Button 
                type="button" 
                htmlType="button" 
                className="mb-1" 
                text={<span><i className="fa-light fa-trash m-1 text-danger"></i>Delete</span>} 
                onClick={() => setModalOpen(true)} 
                style={{ marginRight: '10px' }} 
              />
            )}
            <Button 
              type="button" 
              htmlType="button" 
              className="mt-1" 
              text={<span><i className="fa-sharp fa-regular fa-credit-card m-1 text-success"></i>Checkout</span>}  
              onClick={showCheckoutModal} 
            />
          </Col>
        </Row>


        <Divider />
      </Container>
      <Footer  className='footer' transparent={false}/>

      {/* Checkout Modal */}
      <Modal
        title="Checkout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please select a credit card to use for payment:</p>
        <Radio.Group onChange={(e) => setSelectedCard(creditCards.find(card => card.id === e.target.value))}>
          {creditCards.map(card => (
            <Radio key={card.id} value={card.id}>
              {card.cardNumber} (Expires: {card.expiration})
            </Radio>
          ))}
        </Radio.Group>
      </Modal>

      {/** delete confirm modal */}
      <Modal
        title="Confirm Batch Delete"
        visible={modalOpen}
        // onOk={handleOk}
        // onCancel={handleCancel}
        closable={true}
        closeIcon = {<i onClick={() => setModalOpen(false)} className="fa-light fa-xmark m-1 text-danger"></i>}
        type='confirm'
        footer= {(
          <span className='d-flex justify-content-end align-items-center gap-3'>
            <Button onClick={handleBatchDelete} text={<span><i className="fa-light fa-trash m-1 text-danger"></i>Yes, Remove</span>} />
            <Button key="cancel" onClick={() => setModalOpen(false)} text={<span><i className="fa-light fa-xmark m-1 text-success"></i>No, Keep</span>} />
          </span>
        )}
      >
      Are you sure you want to remove ${selectedRowKeys.length} item(s) from the cart?
      </Modal>
      
    </div>
  );
};

export default Cart;
