import React from 'react';
import { Carousel, Tabs, Descriptions, Row, Col, Rate, Breadcrumb, Tag } from 'antd';
import { Container } from 'react-bootstrap';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import { useAuth } from '../services/auth';
import useDeviceType from '../hooks/useDeviceType';
import useIsScrolled from '../hooks/useIsScrolled';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/Footer/Footer';

const { TabPane } = Tabs;

const ProductPage = ({ API_URL, Companyname }) => {
  const { isLoggedIn: isloggedIn, userDetails, loading } = useAuth();
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  const isScrolled = useIsScrolled();

  // Example product data
  const product = {
    name: "iPhone 13 128GB - Blue",
    currency: '$',
    image_urls: [
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
    ],
    videos: [
      'https://youtu.be/eDqfg_LexCQ',
    ],
    description:
      "The iPhone 13 128GB in Blue is a sleek and high-performance smartphone with excellent features, including an improved camera and longer battery life.",
    weight: '174 grams',
    dimensions: '146.7 x 71.5 x 7.65 mm',
    otherdetails: {
      material: 'Aluminum and Glass',
      color: 'Blue',
      battery: '3240 mAh',
      camera: '12MP Dual Camera System',
    },
    stock_quantity: 120,
    stock_status: 'ACTIVE',
    condition: 'NEW',
    shipping_method: 'Standard Shipping',
    free_shipping: true,
    shipping_price: 5.00,
    vendor_price: 170.00,
    price: 175.99,
    final_price: 129.99,
    categories: ['Smartphones', 'Electronics'],
    subcategory: 'Smartphones',
    total_reviews: 235,
    rating: 4.5,
  };

  const Breadcrumbitems = [
    { title: <Link to="/">Home</Link> },
    { title: <Link to="/shop">Shop</Link> },
    { title: <Link to={`/shop/${product.subcategory}`}>{product.subcategory}</Link> },
    { title: product.name },
  ];

  return (
    <div className="explore">
      <span className='d-flex flex-column topbar'>
        <Header Companyname={Companyname} isScrolled={isScrolled} isMobile={isMobile} user={userDetails} />
        <div>
          <div className='m-2'>
            <Breadcrumb items={Breadcrumbitems} />
          </div>
        </div>
      </span>
      <Container fluid className='body-container'>
        <Row gutter={[16, 16]} style={{ padding: '8px' }}>
          {/* Product Images & Videos */}
          <Col xs={24} md={12}>
            <Carousel autoplay>
              {product.image_urls.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Product ${index + 1}`}
                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  />
                </div>
              ))}
            </Carousel>
            {product.videos.length > 0 && (
              <div className="mt-3">
                <iframe
                  width="100%"
                  height="315"
                  src={product.videos[0]}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </Col>

          {/* Product Details */}
          <Col xs={24} md={12}>
            <h3 className='text-dark'>{product.name}</h3>
            <Rate disabled defaultValue={product.rating} />
            <span style={{ color: '#1E1E1E', marginLeft: '8px' }}>{product.rating} ({product.total_reviews} reviews)</span>

            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1E' }}>
                ${product.final_price.toFixed(2)}{' '}
                <small style={{ textDecoration: 'line-through', color: '#50555C' }}>${product.price.toFixed(2)}</small>
              </p>
              <Tag color='#198754' style={{ fontSize: '16px' }}>
                Save ${product.price - product.final_price}
              </Tag>
            </div>

            <div className='d-flex mt-2'>
              {isloggedIn ? (
                <>
                  <Button
                    type='link'
                    text="Add to Cart"
                    color="secondary"
                    className='fw-500 m-auto'
                    onClick={() => console.log('Added to Cart')}
                    startIcon={<i className="fa-thin fa-cart-shopping"></i>}
                  />
                  <Button
                    type='link'
                    text="Save for Later"
                    color="secondary"
                    className='fw-500 m-auto'
                    onClick={() => console.log('Added to WishList')}
                    startIcon={<i className="fa-sharp fa-solid fa-heart"></i>}
                  />
                </>
              ) : (
                <Link to="/login">
                  <Button
                    type='link'
                    text="Login to Add to Cart"
                    color="primary"
                    className='fw-500 m-auto'
                  />
                </Link>
              )}
            </div>

            {/* Product Tabs for Description, Specifications, and Reviews */}
            <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
              <TabPane tab="Description" key="1">
                <p className='bg-white p-2'>{product.description}</p>
              </TabPane>
              <TabPane tab="Specifications" key="2">
                <Descriptions bordered column={1} size='small' className='bg-white p-2'>
                  {Object.entries(product.otherdetails).map(([key, value]) => (
                    <Descriptions.Item label={key} key={key}>
                      {value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </TabPane>
              <TabPane tab="Reviews" key="3">
                <p className='bg-white p-2'>Customer reviews go here...</p>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Footer className='footer' transparent={false} />
    </div>
  );
};

export default ProductPage;
