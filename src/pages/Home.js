import React,{useEffect, useState} from 'react';
import Header from '../components/ui/Header/Header';
import Grid from '../components/ui/Grid/Grid';
import Button from '../components/ui/Button/Button';
import { Avatar, Modal} from 'antd';
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
import useIsScrolled from '../hooks/useIsScrolled';
import SearchInput from '../components/ui/Input/SearchInput';
import Tile from '../components/ui/Tile/Tile';


function Homepage({ Companyname }) {
  const user ={'firstname':'Henrio',
              'lastname':'sfdff',
              'email':'sdsdsd@gmail.com',
              'id':'1212121',
            'isloggedin':false}
  const { isMobile, isTablet,isDesktop } = useDeviceType();
  
  const isScrolled = useIsScrolled();

  const featureItems = [
    { header: 'Streamline Procument Processes', body: 'User-friendly platform that simplifies sourcing, ordering and delivery for engineering resources.' },
    { header: 'Quality  Assurance', body: 'Verified suppliers to deliver authentic products, competitive pricing and clear product information.' },
    { header: 'Leverage Technology for Innovation', body: 'Utilize AI, data analytics, and automation to mprove decision making, optimize supply chains, and offer personalized solutions.' },
    { header: 'Drive Cost Efficiency', body: 'Reduce procurement costs through discounts, competitive pricing, and elimination of intermediaries.' },
    { header: 'Niche Market Expansion', body: 'Cater to specialized industries with tailored solutions.' },
    { header: 'Support Sustainability', body: 'Promote environmentally friendly products and suppliers to help businesses achieve their sustainability goals.' }
  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
    
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const frequentlysearched = [
    {name:'Lafarge Cement'},
    {name:'Arduino Kit'},
    {name:'Dry Wall'},
  ]
  const handleSearch = (e) => {
    console.log()
};
  return (
    <div className="homepage">
        <div className={`homepage-bg  ${isScrolled ? 'homepage-bg-scrolled' : 'homepage-bg-not-scrolled'}`}>
            <Header Companyname={Companyname} isScrolled={isScrolled} isMobile={isMobile} user={user}/>
            <div className={`homepage-content`}>
                <div className='homepage-content-top'>
                  <i className="homepage-content-top-icon fa-regular fa-circle-play"></i>
                  <span className='homepage-content-top-text'>Learn more about Oahse</span>
                </div>
                <div className='row mt-2'>
                  <div className='col-12 col-md-8 col-lg-8'>
                    <div className='homepage-content-second'>
                      <Text fontWeight='fw-800' fontColor='text-white' fontSize='fs-2xl' style={{lineHeight:'40px'}}>
                        Revolutionized Procurement 
                        platform for engineering 
                        and technology trade.
                      </Text>
                      <Text className={'mt-3'} fontWeight='fw-500' fontColor='text-white' fontSize={isMobile?'fs-md':'fs-md-lg'}>Ensuring seamless access to high-quality engineering products from trusted suppliers, 
                        enabling business and individuals to streamline their procurement processes, 
                        reduce costs and enhance operational efficiency.</Text>
                    </div>
                    </div>
                    <div className={`col-12 col-md-4 col-lg-4 `}>
                        <span className='d-flex flex-row justify-content-center mt-3'>
                          <Button
                            type='link'
                            text="Get the App"
                            color="secondary"
                            variant='outlined'
                            className='fw-500 m-auto p-2 px-5'
                            onClick={() => console.log('Button clicked')}
                          />
                        </span>
                      </div>

                </div>
                <div className='mt-4'>
                    <SearchInput placeholder='Search Products' onSearch={handleSearch} isFilter={true} style={{width:'100%'}} />
                    <div className='row text-white m-3'>
                        <div className='col' style={{color:'white', fontSize:isMobile?10:14}}>
                            Frequently searched: 
                        </div>
                        {frequentlysearched.map((item, index)=>(
                            <div className='col' key={index}>
                                <Button
                                    type='link'
                                    text={item.name}
                                    color="primary"
                                    variant='outlined'
                                    href='/shop'
                                    className='bg-transparent'
                                    style={{color:'white', fontSize:isMobile?10:14, margin:'4px'}}
                                    onClick={() => console.log('Button clicked')}
                                    /> 
                            </div>
                        ))}
                        
                    </div>
                </div>
               
                
            </div>
        </div>
        <div className='chat-pop' onClick={showModal}>
          <div className='d-flex flex-row align-items-center chat-pop-case'>
              <Avatar src={User} className='chat-pop-avatar' />
              <span className='chat-pop-dot'><i class="fa-sharp fa-solid fa-circle"></i></span>
          </div>
          <span className='chat-pop-arrow'><i className="fa-regular fa-chevron-up"></i></span>
          <Modal
            title="Title"
            open={open}
            confirmLoading={confirmLoading}
            footer={(_, { }) => (
              <>
                <Button onClick={handleCancel} text={'cancel'} />
                <Button onClick={handleOk} text={'ok'} />
              </>
            )}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
        
        <div className='tile-container p-auto d-flex align-items-center'>
            <Grid>
                {featureItems.map((item, index) => (
                <Tile
                  key={index}
                  onClick={() => console.log(`Clicked: ${item.header}`)}
                  header={item.header}
                  body={item.body}
                  style={{'height':'250px'}}
                  className={'bg-transparent'}
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
                    className='p-2 px-5'
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
          <HomepageTestimonies isMobile={isMobile} isTablet={isTablet} />
          <HomePageBubble isMobile={isMobile} />
          <HomeAiestimator isMobile={isMobile} />
          
          <Footer />
        </div>
    </div>
  );
}
export default Homepage;