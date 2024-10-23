// src/EngineeringAutoDemo.js
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import loaderimg from '../assets/loader.jpeg';
// import oasheicon from  '../assets/oahse-icon.png';
// Import required modules
import { Autoplay, FreeMode, Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { Avatar } from 'antd';

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
                    {company.logo ? (
                        <Avatar 
                            shape='square' 
                            src={company.logo} 
                            alt={company.name} 
                            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '0%' }} 
                        />
                    ) : (
                        <i className="fa-sharp fa-thin fa-loader text-dark text-center"></i>
                    )}
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default EngineeringCarousel;
