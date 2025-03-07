import React from 'react';
import { Carousel,Tabs, Descriptions, Row, Col, Rate, Breadcrumb, Tag } from 'antd';
import { Container } from 'react-bootstrap';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import { useAuth } from '../services/auth';
import useDeviceType from '../hooks/useDeviceType';
import useIsScrolled from '../hooks/useIsScrolled';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/Footer/Footer';
const { TabPane } = Tabs;

const ProductPage = ({API_URL,Companyname }) => {
    const { isLoggedIn:isloggedIn, userDetails, loading } = useAuth();
    const { isMobile, isTablet,isDesktop } = useDeviceType();
    const isScrolled = useIsScrolled();
    // Example product data
    const product = {
      name: "iPhone 13 128GB - Blue",
      price: 129.99,
      oldPrice: 179.99,
      rating: 4.5,
      reviewsCount: 235,
      categories:'Smartphones',
      images: [
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1080/https://d2e6ccujb3mkqf.cloudfront.net/e4d4b68e-9dec-438d-be52-d348924bfe62-1_131e50a8-aa4c-4097-93ea-ed4a76388b8b.jpg',
        
      ],
      videos: [
        'https://youtu.be/eDqfg_LexCQ', // Example video link
      ],
      description:
        "A classic leather jacket crafted from premium materials for style and durability. Available in multiple sizes and colors.",
      specifications: {
        Material: 'Genuine Leather',
        Color: 'Black',
        Sizes: 'S, M, L, XL',
        Weight: '1.5 kg',
      },
    };
    const Breadcrumbitems=[
        {
          title: <Link to="/" >Home</Link>,
        },
        {
          title: <Link to="/shop" >Shop</Link>,
        },
        {
          title: <Link to={`/shop/${product.categories}`} >{product.categories}</Link>,
        },
        {
          title: product.name,
        },
      ]

  return (
    <div className="explore">
      <span className='d-flex flex-column topbar'>
          <Header Companyname={Companyname} isScrolled={isScrolled} isMobile={isMobile} user={userDetails}/>
          <div className={``}>
              <div className='m-2'>
                  <Breadcrumb items={Breadcrumbitems} />
              </div>
          </div>
      </span>
      <Container  fluid className='body-container'>
        <Row gutter={[16, 16]} style={{ padding: '8px'}} >
        {/* Product Images & Videos */}
            <Col xs={24} md={12}>
                <Carousel autoplay >
                    {product.images.map((src, index) => (
                        <div key={index}>
                          <img src={src} alt={`Product ${index + 1}`} style={{ width: '100%'}} />
                        </div>
                    ))}
                    {product.videos.map((src, index) => (
                        <div key={`video-${index}`}>
                          <video src={src} controls style={{ width: '100%' }} autoPlay />
                        </div>
                    ))}
                </Carousel>
            </Col>

            {/* Product Details */}
            <Col xs={24} md={12}>
                <h3 className='text-dark'>{product.name}</h3>
                  <Rate disabled defaultValue={product.rating} /> 
                  <span style={{ color: '#1E1E1E' }}>{product.rating} ({product.reviewsCount} reviews)</span>
                <span>
                <p style={{ fontSize: '18px', color: '#1E1E1E' }}>
                ${product.price} <small>currently</small> 
                <p style={{ textDecoration: 'line-through', color: '#50555C' }}>${product.oldPrice}</p>
                </p>
                <Tag color='#198754'>Save ${product.oldPrice - product.price}</Tag>
                </span>
                <div  className='d-flex mt-2'>
                  <span className='m-1'><Button
                      type='link'
                      text="Add to Cart"
                      color="secondary"
                      className='fw-500 m-auto'
                      href={'/login'}
                      onClick={() => console.log('Button clicked')}
                      startIcon={<i className="fa-thin fa-cart-shopping"></i>}
                  /></span>
                  <span className='m-1'><Button
                    type='link'
                    text="Add to WishList"
                    color="secondary"
                    className='fw-500 m-auto'
                    href={'/login'}
                    onClick={() => console.log('Button clicked')}
                    startIcon={<i className="fa-sharp fa-solid fa-heart"></i>}
                  /></span>
                    
                </div>
                {/* Product Tabs for Description, Specifications, and Reviews */}
                <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
                  <TabPane tab="Description" key="1">
                      <p className='bg-white p-2'>{product.description}</p>
                  </TabPane>
                  <TabPane tab="Specifications" key="2">
                      
                      <Descriptions bordered column={1} size='small' className='bg-white p-2'>
                      {Object.entries(product.specifications).map(([key, value]) => (
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
      <Footer className='footer' transparent={false}/>
    </div>
    
  );
};

export default ProductPage;
