import React, { useRef, useState } from 'react';
import { Avatar, Card, Col, message, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { CurrencyConverter } from '../utils/helper';
import Button from './ui/Button/Button';

const { Title } = Typography;

const TopHorizontalScroller = ({ items, onSearch, isMobile }) => {
    console.log(items,'|||||||')
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollRight, setScrollRight] = useState(0);

    const handleCategoryChange = (e) => {
        onSearch && onSearch({
            itemName: null,
            dateRange: null,
            minPrice: null,
            maxPrice: null,
            selectedCategory: e.target.id
        });
    };

    const startDrag = (e) => {
        // Prevent text selection while dragging
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setScrollLeft(e.currentTarget.scrollLeft);
        setScrollRight(e.currentTarget.scrollRight);
    };

    const endDrag = () => {
        setIsDragging(false);
    };

    const onDrag = (e) => {
        if (!isDragging) return;

        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 3; // Scroll speed factor (adjust for sensitivity)

        e.currentTarget.scrollLeft = scrollLeft - walk;
        e.currentTarget.scrollRight = scrollRight + walk;
    };

    return (
        <div className='m-1'>
            <div
                className="tophorizontal-scroller"
                onMouseDown={startDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onMouseMove={onDrag}
                onTouchStart={startDrag}
                onTouchEnd={endDrag}
                onTouchMove={onDrag}
                
            >
                <div className="topscrollable-content">
                    {items?.map((item, index) => (
                        <Button
                            key={index}
                            text={item.label}
                            onClick={handleCategoryChange}
                            color="primary"
                            variant='outlined'
                            href='/shop'
                            type='link'
                            className='bg-transparent mx-2'
                            style={{ fontSize: isMobile ? 12 : 14 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopHorizontalScroller;

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
      const addtoCart =(e,item) =>{
        e.preventDefault();
        message.success(`${item.name} has been added to cart`)
      }
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
                                style={{ width: 182, margin: '8px' }} // Adjust width and margin as needed
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
                                                <i className="fa-thin fa-cart-plus text-success ms-5" onClick={(e)=>addtoCart(e,item)}></i>
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
