import React from 'react';
import Header from '../components/ui/Header';
import Grid from '../components/ui/Grid';

function Homepage({ Companyname }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureItems = Array(6).fill('Feature Box'); // Replace with actual data

  return (
    <div className="homepage">
        <div className={`homepage-bg`}>
            <Header Companyname={Companyname} isScrolled={isScrolled}/>
        </div>
        <div className='features'>
            <Grid>
                {featureItems.map((item, index) => (
                <div className="feature-box" key={index}>
                    {item}
                </div>
                ))}
            </Grid>
        </div>
      
      {/* Other content */}
    </div>
  );
}
export default Homepage;