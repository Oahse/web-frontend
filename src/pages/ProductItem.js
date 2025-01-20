import React from 'react';
import { Carousel,Tabs, Descriptions, Row, Col, Rate, Breadcrumb } from 'antd';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Button from '../components/ui/Button/Button';
const { TabPane } = Tabs;

const ProductPage = ({API_URL,Companyname }) => {
    const { isloggedIn, userDetails } = { isloggedIn: false, userDetails: {} };
  // Example product data
  const product = {
    name: "Men's Classic Leather Jacket",
    price: 129.99,
    oldPrice: 179.99,
    rating: 4.5,
    reviewsCount: 235,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ],
    videos: [
      'https://example.com/video.mp4', // Example video link
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

  return (
    <div className="explore">
      <span className='d-flex flex-column topbar'>
        <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
        <Breadcrumb style={{ padding: '20px',marginTop:'50px' }}
            items={[
            {
                href: '',
                title: <i className="fa-sharp fa-thin fa-house"></i>,
            },
            {
                href: '',
                title: (
                <>
                    <i className="fa-sharp fa-thin fa-bag-shopping m-1"></i>
                    <span>Products</span>
                </>
                ),
            },
            {
                title: product.name,
            },
            ]}
        />
      </span>
      <Container  fluid className='body-container'>
        <Row gutter={[16, 16]} style={{ padding: '20px'}} >
        {/* Product Images & Videos */}
            <Col xs={24} md={12}>
                <Carousel autoplay>
                    {product.images.map((src, index) => (
                        <div key={index}>
                        <img src={src} alt={`Product ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                    {product.videos.map((src, index) => (
                        <div key={`video-${index}`}>
                        <video src={src} controls style={{ width: '100%' }} />
                        </div>
                    ))}
                </Carousel>
            </Col>

            {/* Product Details */}
            <Col xs={24} md={12}>
                <h1>{product.name}</h1>
                <Rate disabled defaultValue={product.rating} /> <span>{product.rating} ({product.reviewsCount} reviews)</span>
                <p style={{ fontSize: '24px', color: '#fa541c' }}>
                ${product.price} <span style={{ textDecoration: 'line-through', color: 'gray' }}>${product.oldPrice}</span>
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 ' text={<span><i className="fa-light fa-cart-shopping"></i>Add to Cart</span>} /> 
                        <span className='m-2'></span>
                    {/* <a href='www.apple.com'>
                        <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 ' text={<span><i className="fa-sharp-duotone fa-solid fa-heart"></i>Wish List</span>} />
                    </a> */}
                </div>
                {/* Product Tabs for Description, Specifications, and Reviews */}
                <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
                <TabPane tab="Description" key="1">
                    <p>{product.description}</p>
                </TabPane>
                <TabPane tab="Specifications" key="2">
                    <Descriptions bordered column={1}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <Descriptions.Item label={key} key={key}>
                        {value}
                        </Descriptions.Item>
                    ))}
                    </Descriptions>
                </TabPane>
                <TabPane tab="Reviews" key="3">
                    <p>Customer reviews go here...</p>
                </TabPane>
                </Tabs>
            </Col>
        </Row>
      </Container>
    </div>
    
  );
};

export default ProductPage;
