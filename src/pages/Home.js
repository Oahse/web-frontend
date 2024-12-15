import React from 'react';
import Header from '../components/ui/Header/Header';
import Grid from '../components/ui/Grid/Grid';
import Button from '../components/ui/Button/Button';
import Card from '../components/ui/Card/Card';
import { Avatar } from 'antd';
import User from '../assets/icons/user.svg';
import Footer from '../components/ui/Footer/Footer';
import useDeviceType from '../hooks/useDeviceType';
import HomePageBubble from '../components/ui/HomePage/Bubbles/Bubbles';
import HomeAiestimator from '../components/ui/HomePage/Aiestimator/Aiestimator';
import HomepageTestimonies from '../components/ui/HomePage/Testimonies/Testimonies';
import WhatYouNeed from '../components/ui/HomePage/WhatYouNeed/WhatYouNeed';
import Text from '../components/ui/Typography/Text';
import Clients from '../components/ui/HomePage/Clients/Clients';
import Manufacturers from '../components/ui/HomePage/Manufacturers/Manufacturers';
function Homepage({ Companyname }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { isMobile, isTablet,isDesktop } = useDeviceType();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureItems = [
    { header: 'Streamline Procument Processes', body: 'User-friendly platform that simplifies sourcing, ordering and delivery for engineering resources.' },
    { header: 'Quality  Assurance', body: 'Verified suppliers to deliver authentic products, competitive pricing and clear product information.' },
    { header: 'Leverage Technology for Innovation', body: 'Utilize AI, data analytics, and automation to mprove decision making, optimize supply chains, and offer personalized solutions.' },
    { header: 'Drive Cost Efficiency', body: 'Reduce procurement costs through discounts, competitive pricing, and elimination of intermediaries.' },
    { header: 'Niche Market Expansion', body: 'Cater to specialized industries with tailored solutions.' },
    { header: 'Support Sustainability', body: 'Promote environmentally friendly products and suppliers to help businesses achieve their sustainability goals.' }
  ];
  return (
    <div className="homepage">
        <div className={`homepage-bg`}>
            <Header Companyname={Companyname} isScrolled={isScrolled} isMobile={isMobile}/>
            <div className='homepage-content'>
                <div className='homepage-content-top'>
                  <i className="homepage-content-top-icon fa-regular fa-circle-play"></i>
                  <span className='homepage-content-top-text'>Learn more about Oahse</span>
                </div>
                <div className='chat-pop'>
                  <div className='d-flex flex-row align-items-center chat-pop-case'>
                      <Avatar src={User} className='chat-pop-avatar' />
                      <span className='chat-pop-dot'><i class="fa-sharp fa-solid fa-circle"></i></span>
                  </div>
                  <span className='chat-pop-arrow'><i className="fa-regular fa-chevron-up"></i></span>
                </div>
            </div>
        </div>
        
        <div className='card-container'>
            <Grid>
                {featureItems.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => console.log(`Clicked: ${item.header}`)}
                  header={item.header}
                  body={item.body}
                />
                ))}
            </Grid>
        </div>
        <div className='start-for-free d-flex align-items-center start-btn-class'>
            <span className="d-flex flex-row align-items-center p-2 m-auto bg-none">
                <Button
                    type='link'
                    text="Start for Free"
                    color="primary"
                    variant='outlined'
                    onClick={() => console.log('Button clicked')}
                    />
            </span>
            
        </div>
          
        {/* Other content */}
        <div className='homepage-bottom'>
          <Manufacturers isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
          <Text fontWeight='fw-500' fontSize='fs-xl' className={'text-center lh-1 p-4'}><span className='text-white'>Our</span> Clients</Text>
          
          <Clients isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
          <Text fontWeight='fw-500' fontSize='fs-xl' className={'text-center lh-1 p-4'}>What Do you Need? Let’s Handle It!</Text>
          <WhatYouNeed isMobile={isMobile} />
          <HomepageTestimonies isMobile={isMobile} />
          <HomePageBubble isMobile={isMobile} />
          <HomeAiestimator isMobile={isMobile} />
          
          <Footer />
        </div>
    </div>
  );
}
export default Homepage;