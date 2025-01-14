import React, { useRef, useState } from 'react';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { CurrencyConverter } from '../utils/helper';
import Button from './ui/Button/Button';

const { Title } = Typography;

const TopHorizontalScroller = ({ items,onSearch,isMobile }) => {

    const handleCategoryChange = (e) => {
        onSearch && onSearch({ itemName:null, dateRange:null, minPrice:null, maxPrice:null, selectedCategory : e.target.id });
    };
    
    return (
        <div className='me-1 ms-1'>
            <div className="tophorizontal-scroller">
                <div className="topscrollable-content" style={{ paddingRight: '20px' }}>
                    {items?.map((item, index) => (
                        
                        <Button 
                            key={index} 
                            text={item.name} 
                            onClick={handleCategoryChange} 
                            color="primary"
                            variant='outlined'
                            href='/shop'
                            className='bg-transparent mx-2'
                            style={{fontSize:isMobile?7:14}} />
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

const MiddleHorizontalScroller = ({ title, items, toCurrency }) => {
    const scrollContainerRef = useRef(null);
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);
      const [startY, setStartY] = useState(0);
      const [scrollTop, setScrollTop] = useState(0);
    
      const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing'; // Change cursor on drag start
      };
    
      const handleMouseMove = (e) => {
        if (!isDragging) return;
      
        const deltaX = e.clientX - startX || 0;
      
        scrollContainerRef.current.scrollLeft = scrollLeft - deltaX;
      };
      
    
      const handleMouseUp = () => {
        setIsDragging(false);
        scrollContainerRef.current.style.cursor = 'grab'; // Reset cursor when dragging stops
      };
    
      const handleMouseLeave = () => {
        if (isDragging) {
          setIsDragging(false);
          scrollContainerRef.current.style.cursor = 'grab'; // Reset cursor on mouse leave
        }
      };
    return (
        <div className='me-1 ms-1 mt-4'>
            <Title level={4}>{title}</Title>
            <div className="middlehorizontal-scroller" ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                // onWheel={handleWheel} // Handle mouse wheel scroll
                >
                <div className="middlescrollable-content">
                    {items.map((item, index) => (
                        <Link to={item.url} className="text-decoration-none" key={index}>
                            <Card
                                hoverable
                                style={{ width: 176, margin: '8px' }} // Adjust width and margin as needed
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
                                            <span className='price'>
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
                    ))}
                </div>
            </div>
        </div>
    );
};
const BottomHorizontalScroller = ({ title,categories }) => {
    return (
        <div className='me-1 ms-1 mt-4'>
            <Title level={4}>{title}</Title>
            <div className="bottomhorizontal-scroller">
                <div className="bottomscrollable-content">
                    {categories.map((category, index) => (
                        <Card 
                        key={index} 
                            style={{ width: 300, margin: '8px', minWidth:300 }} // Adjust width and margin as needed
                            >
                            <Title level={5}>
                                <Link to={category.category.url} className='text-dark'>{category.category.name}</Link>
                            </Title>
                            <Row gutter={[8, 8]} className='p-0 m-0'>
                                {category.divisions.map((division, divIndex) => (
                                    <Col span={12} key={divIndex} className='m-0 p-1'>
                                        <Link to={division.url} className="text-decoration-none m-0 p-0">
                                            <Card
                                                bordered={false}
                                                style={{ width: '100%', margin: '0' }} // Adjust width and margin as needed
                                                cover={<img alt={division.name} src={division.image} style={{height:'80px',width: '100%', objectFit: 'cover'}} />}
                                            >
                                                <Card.Meta title={<small className=''>{division.name}</small>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { TopHorizontalScroller, MiddleHorizontalScroller, BottomHorizontalScroller};
