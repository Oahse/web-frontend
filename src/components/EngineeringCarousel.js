// src/EngineeringAutoDemo.js
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, FreeMode, Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { Card } from 'react-bootstrap';

const EngineeringCarousel = ({ companies }) => {
    const [autoplayDelay, setAutoplayDelay] = useState(2500); // Default value

    useEffect(() => {
        // Generate a random delay between 2500 and 10000 milliseconds
        const randomDelay = Math.floor(Math.random() * (10000 - 2500 + 1)) + 2500;
        setAutoplayDelay(randomDelay);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={3}
            grabCursor={true}
            freeMode={true}
            pagination={false}
            loop={true}
            autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Mousewheel, Pagination, FreeMode, Navigation]}
            className="myPartners m-2"
        >
            {companies.map((company, idx) => (
                <SwiperSlide key={idx} className='myPartners-swiper-slide'>
                    <Card.Img src={company.logo} alt={company.name} style={{ objectFit: 'contain', height: '100%' }} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default EngineeringCarousel;
