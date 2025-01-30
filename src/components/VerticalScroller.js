import React, { useState } from 'react';
import { Avatar, Card, Col, Row, Typography, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { CurrencyConverter } from '../utils/helper';

const { Title } = Typography;

const MiddleVerticalScroller = ({ title, items, toCurrency, noitemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const itemsPerPage = noitemsPerPage || 20; // Number of items per page

    // Calculate the items to display on the current page
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='me-1 ms-1 mt-2 mb-2'>
            <Title level={5}>{title}</Title>
            <div className="middlevertical-scroller">
                <div className="middleverticalscrollable-content">
                    <Row gutter={[16, 16]} justify="center" align="middle" > {/* gutter adds space between the rows and columns */}
                        {paginatedItems?.map((item, index) => (
                            <Col
                                key={index}
                                xs={24} sm={12} md={6} lg={4} // Responsive breakpoints
                            >
                                 <Link to={item.url} className="text-decoration-none" key={index}>
                                    <Card
                                        hoverable
                                        style={{  margin: '8px' }} // Adjust width and margin as needed
                                        cover={<img alt={item.name} src={item.image} style={{height:'156px',width: '100%', objectFit: 'cover'}} />}
                                    >
                                        <Card.Meta
                                            title={<span  className='mb-0'>
                                                {item.name} 
                                                {item.brand ?<p className='mb-0'>
                                                <small>
                                                    <Avatar src={item.brand?.logo} size ={24} className='me-1' />
                                                    {item.brand?.name}
                                                    </small>
                                                    </p> :null }
                                            
                                                    </span>}
                                            description={
                                                <> 
                                                    <span >{item.description}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {/* Display filled, half, and empty stars based on the rating */}
                                                        {Array.from({ length: 5 }, (_, starIndex) => {
                                                            const starValue = starIndex + 1;
                                                            if (item.rating >= starValue) {
                                                                return <i key={starIndex} className="fa-sharp fa-solid fa-star" style={{ color: 'gold' }} />;
                                                            } else if (item.rating >= starValue - 0.5) {
                                                                return <i key={starIndex} className="fa-sharp fa-solid fa-star-half-stroke" style={{ color: 'gold' }} />;
                                                            } else {
                                                                return <i key={starIndex} className="fa-sharp fa-light fa-star" />;
                                                            }
                                                        })}
                                                    </div>
                                                    <span className='price d-flex justify-content-between align-items-center'>
                                                        {toCurrency?
                                                            <CurrencyConverter amount={item.price} fromCurrency={item.currency} toCurrency={toCurrency||"USD"} />
                                                            :<>{item.currency} {item.price}</>} 
                                                        <i className="fa-thin fa-cart-plus text-success ms-5"></i>
                                                    </span>
                                                    
                                                </>
                                            }
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Pagination component */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Pagination 
                        current={currentPage} 
                        pageSize={itemsPerPage} 
                        total={items.length} 
                        onChange={handlePageChange} 
                        showSizeChanger={false} // Optional, removes the page size changer
                    />
                </div>
            </div>
        </div>
    );
};

export { MiddleVerticalScroller };
