import React from 'react';
import Header from '../components/ui/Header/Header';
import Grid from '../components/ui/Grid/Grid';
import Button from '../components/ui/Button/Button';
import Card from '../components/ui/Card/Card';
import { Avatar } from 'antd';
import User from '../assets/icons/user.svg';
import Footer from '../components/ui/Footer/Footer';

function Homepage({ Companyname }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
            <Header Companyname={Companyname} isScrolled={isScrolled}/>
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
          <div className='homepage-aiestimator row m-0'>
                <div className='col-4 d-flex align-items-center justify-content-center bg-none'>
                  <svg className='align-self-center' width="251" height="150" viewBox="0 0 251 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M112.5 54.725V42.5C112.5 28.3563 112.5 21.2875 107.656 16.8938C102.806 12.5 95.0125 12.5 79.4062 12.5H51.8438C36.2375 12.5 28.4438 12.5 23.5938 16.8938C18.7438 21.2875 18.75 28.3563 18.75 42.5V82.5C18.75 96.6437 18.75 103.713 23.5938 108.106C28.4438 112.5 36.2375 112.5 51.8438 112.5H79.4062M37.5 37.5H93.75M37.5 62.5H43.75M62.5 62.5H68.75M87.5 62.5H93.75M37.5 87.5H43.75M62.5 87.5H68.75M129.412 93.775C127.7 89.4312 123.288 84.3375 113.25 84.3375C101.588 84.3375 96.675 89.6812 95.6813 92.5375C94.125 96.3562 93.9813 104.6 108.113 105.069C124.988 105.631 132.05 107.925 131.175 117.175C130.306 126.425 120.581 127.712 113.25 128.212C105.719 127.994 96.4063 126.419 93.75 118.431M112.462 75V83.975M112.519 128.181V137.5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M151 109.666V79.4163C151 76.7421 152.317 74.1773 154.661 72.2863C157.005 70.3954 160.185 69.333 163.5 69.333C166.815 69.333 169.995 70.3954 172.339 72.2863C174.683 74.1773 176 76.7421 176 79.4163V109.666M151 94.5413H176M201 69.333V109.666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>
                <div className='col-8 p-4 text-center green'>
                      dsd
                </div>
          </div>
          <Footer />
        </div>
    </div>
  );
}
export default Homepage;