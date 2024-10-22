import React,{useState, useEffect} from 'react';
import { Row, Col, Container, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import CIPAC_cover_photo from '../assets/CIPAC_cover_photo.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import AppScreen from '../assets/localhost_3000_O-sell(iPhone 6_7_8 Plus).png';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import EngineeringCarousel from '../components/EngineeringCarousel';


function Home ({ API_URL,Companyname }) {
    const { isloggedIn, userDetails } = { isloggedIn: false, userDetails: {} };
    const [isLoading, setIsLoading] = useState(false);
    const companies = [
        { name: "General Electric", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/General_Electric_Logo.svg" },
        { name: "Bechtel", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Bechtel_logo.svg" },
        { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/BP_logo.svg" },
        { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shell_logo.svg" },
        { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Siemens_logo.svg" },
        { name: "Texas Instruments", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Texas_Instruments_logo.svg" },
        { name: "Honeywell", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Honeywell_logo.svg" },
        { name: "Lockheed Martin", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lockheed_Martin_logo.svg" },
        { name: "Raytheon", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Raytheon_Company_logo.svg" },

        { name: "General Electric", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/General_Electric_Logo.svg" },
        { name: "Bechtel", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Bechtel_logo.svg" },
        { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/BP_logo.svg" },
        { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shell_logo.svg" },
        { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Siemens_logo.svg" },
        { name: "Texas Instruments", logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/Texas_Instruments_logo.svg" },
        { name: "Honeywell", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Honeywell_logo.svg" },
        { name: "Lockheed Martin", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lockheed_Martin_logo.svg" },
        { name: "Raytheon", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Raytheon_Company_logo.svg" },
        { name: "Bechtel", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Bechtel_logo.svg" },
        { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/BP_logo.svg" },
        { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shell_logo.svg" },
        { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Siemens_logo.svg" },
        { name: "Texas Instruments", logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/Texas_Instruments_logo.svg" },
        { name: "Honeywell", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Honeywell_logo.svg" },
        { name: "Lockheed Martin", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lockheed_Martin_logo.svg" },
        { name: "Raytheon", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Raytheon_Company_logo.svg" },
        { name: "Bechtel", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Bechtel_logo.svg" },
        { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/BP_logo.svg" },
        { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shell_logo.svg" },
        { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Siemens_logo.svg" },
        { name: "Texas Instruments", logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/Texas_Instruments_logo.svg" },
        { name: "Honeywell", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Honeywell_logo.svg" },
        { name: "Lockheed Martin", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lockheed_Martin_logo.svg" },
        { name: "Raytheon", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Raytheon_Company_logo.svg" },
    ];
    useEffect(()=>{
        setIsLoading(false);
    }, [])
    if (isLoading){
        return <ImageLoader
            src={oahseicon}
            alt='oahse'
            src2 ={oahselogo}
            alt2='oahse'
        />
     }
    return (
        <div className='service'>
            <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />

            <Container  className='showcase-pic' >
                <Row className='showcase' style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Col className='' lg={8} md={12} sm={12}>
                        <h3>Your Engineering Services <br/>
                            Made Easier,
                            Made Better
                        </h3>
                        <br/>
                        <p>
                            At the Comfort of your space,  get in-touch with  <br/>
                            professional engineers in seconds, <br/>
                            Get easier access to tradespersons around you in minutes  <br/>
                            for your on-time delivery of services; <br/>
                            and skip the traffic to get your technical supplies delivered  <br/>
                            to you at your door-step <br/>
                        </p>
                    </Col>
                    <Col className='' lg={8} md={12} sm={24}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href='www.google.com'>
                                <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 ' text={<span><i className="fa-brands fa-google-play"></i>Google Play</span>} />
                            </a>
                                <span className='m-2'></span>
                            <a href='www.apple.com'>
                                <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 ' text={<span><i className="fa-brands fa-app-store"></i>App Store</span>} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container >

            <Container>
                <Row className='py-3 ' style={{ display: 'flex', justifyContent: 'center' }}>
                    <Row className='my-2'>
                        <Col className='text-center'><h1><span>Our</span><span className='text-light'> Services</span></h1></Col>
                    </Row>

                    <Row >
                        <Col className='mb-3 d-flex justify-content-center align-items-center'>
                            <Card style={{ width: '18rem', height: '300px', margin:'8px' }} >
                                <Card.Body>
                                    <Card.Title className='fw-bold'>Engineering Network</Card.Title>
                                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                    <Card.Text className='mt-4'>
                                        Connect with top professionals  
                                        and experienced engineers.  
                                        Expand your network effortlessly.  
                                        Gain insights from industry experts.  
                                        Take your career to the next level.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className='mb-3 d-flex justify-content-center align-items-center' >
                            <Card style={{ width: '18rem', height: '300px',margin:'8px' }}>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>Procurement</Card.Title>
                                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                    <Card.Text className='mt-4'>
                                        Navigate the space of streamlined procurement,  
                                        simplifying the purchase of engineering products.  
                                        Optimize your workflows for greater efficiency.  
                                        Reduce time spent on sourcing and approvals.  
                                        Cut through complex requirements with ease.  
                                        Experience faster decision-making processes.  
                                        Achieve smoother product acquisitions today.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className='mb-3 d-flex justify-content-center align-items-center'>
                            <Card style={{ width: '18rem', height: '300px',margin:'8px'}}>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>Engineering Services</Card.Title>
                                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                    <Card.Text className='mt-4'>
                                        Connect with skilled engineering-related  
                                        workers in your local area.  
                                        Get your projects completed efficiently  
                                        and on time, without hassle.  
                                        Access experienced professionals nearby  
                                        to tackle jobs of any scale.  
                                        Simplify your hiring process today!
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
                            <div className='text-center' style={{width:'140px'}}>
                                <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 outline-btn' text={
                                    <span>
                                        Start for free
                                        <i className="fa-light fa-chevron-right m-2"></i>
                                    </span>
                                    } />
                            </div>          
                        </Col>
                    </Row>
                    

                </Row>
            </Container>
            <Container className='fadeup-dark-bg pt-5'>
                <div className='m-0 p-0'>
                    <Row className='my-2'>
                        <Col className='text-center'><h3><span>Our</span><span className='text-light'> Partners</span></h3></Col>
                    </Row>
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                </div>
                <div className='mt-2 p-0'>
                    <Row className='my-2'>
                        <Col className='text-center'><h3><span>Our</span><span className='text-light'> Clients</span></h3></Col>
                    </Row>
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                </div>
                <Row className='mb-5'style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col className='py-3 text-center' lg={12} md={12} sm={12}>
                        <h1>Earn with us </h1>
                    </Col>

                    <Col className='text-center' lg={6}  sm={12}>
                        <div className='p-3'>
                            <img src='https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='engineer' width='100%'/> 
                        </div>
                    
                    </Col>

                    <Col className='py-3'> 
                        <h2 className='mb-3'>Become an Engineering Consultant</h2>
                        <p>
                            Work with experienced engineers in handling your projects 
                            ranging from consultation and design to supervision to completion with standard quality.
                        </p>

                        <p>
                        Drive for as long and as often as you like. Weekdays; weekends; evenings — fit driving around your lifestyle.
                        </p>

                        <p>
                            Order your materials from our online store and experience 
                            and on-time supply/ delivery of your quality materials.
                        </p>

                        <a href='/fsfsfsf'>
                            <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 ' text={<span><i className="fa-light fa-helmet-safety"></i> Learn More</span>} />
                        </a>
                    </Col>
                </Row>

                <Row style={{backgroundColor: 'grey', color: 'whitesmoke',display: 'flex', justifyContent: 'center' }} className='rounded-2 text-center'>
                    <Col className='py-3 text-center' lg={12} md={12} sm={12}>
                        <h2>What do you need? Let's supply it</h2>
                    </Col>

                    <Col>
                        <a href='/sdsdd'>
                            <img src='https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='product' width='100%'/>
                        
                        </a>
                        <p>Cables</p>
                    </Col>

                    <Col>
                        <a href='/sdsdd'>
                            <img src='https://images.pexels.com/photos/159108/light-lamp-electricity-power-159108.jpeg' alt='product' width='100%'/>
                            <p>Lightings</p>
                        </a>
                    </Col>

                    <Col>
                        <a href='/sdsdd'>
                            <img src='https://images.pexels.com/photos/60049/torx-bits-metal-iron-60049.jpeg?auto=compress&cs=tinysrgb&w=600' alt='product' width='100%'/>
                            <p>Tools and Fittings</p>
                        </a>
                    </Col>

                    <Col>
                        <a href='/sdsdd'>
                            <img src='https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='product' width='100%'/>
                            <p>Power and Back-up</p>
                        </a>
                    </Col>

                    <Col>
                        <a href='/sdsdd'>
                            <img src='https://images.pexels.com/photos/2842460/pexels-photo-2842460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='product' width='100%'/>
                            <p>Engineering Accessories</p>
                        </a >
                    </Col>
                </Row>

                <Row className='py-3' style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col className='py-3' lg={12} md={12} sm={12}>
                        <Row>
                            <Col>
                                <Link><h5>News and Updates</h5></Link>
                            </Col>

                            <Col className='text-end'>
                                <Link><h5>View all </h5></Link>
                            </Col>
                        </Row>
                    
                    </Col>
                        
                    <Col>
                        <div>
                            <img src={CIPAC_cover_photo} alt='news' width='100%'/>
                        </div>
                        <h5>Oahse Engineering Fest 2024</h5>
                        <p>
                            Order your materials from our online store 
                            and experience and on-time supply/ delivery of your quality materials.
                        </p>
                    </Col>
                    
                    <Col>
                        <div>
                            <img src={CIPAC_cover_photo} alt='news' width='100%'/>
                        </div>
                        <h5>Oahse Engineering Training Programs and Certification </h5>
                        <p>
                            Order your materials from our online store 
                            and experience and on-time supply/ delivery of your quality materials.
                        </p>
                    </Col>
                    
                    <Col>
                        <div>
                            <img src={CIPAC_cover_photo} alt='news' width='100%'/>
                        </div>
                        <h5>Oahse Project 2025</h5>
                        <p>
                            Order your materials from our online store 
                            and experience and on-time supply/ delivery of your quality materials.
                        </p>
                    </Col>
                </Row>

                <Row className='text-center rounded-2 py-3 mb-3 mx-3'style={{backgroundColor: 'black', color: 'white',display: 'flex', justifyContent: 'center' }}>
                    <Col className='py-3'>
                        <img src={AppScreen} alt='App' width='200px'/>
                    </Col>
                    <Col className='py-5'>
                        <h3>It is easier on our App</h3>
                        <p>Available for Android and iOS devices</p>
                        <a href='/'>
                            <Button type='button' htmlType='button' className='m-1 ' text={<span><i className='fa-brands fa-app-store'></i> Download the App</span>} />
                        </a>
                        <a href='/'>
                            <Button type='button' htmlType='button' className='m-1 ' text={<span><i className='fa-brands fa-google-play'></i> Download the App</span>} />
                        </a>
                    </Col>

                </Row>
                </Container>

            <Footer className='footer'/>
        </div>
    );
}
export default Home;