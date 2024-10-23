import React,{useState, useEffect} from 'react';
import { Row, Col, Container, Card} from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import AppScreen from '../assets/localhost_3000_O-sell(iPhone 6_7_8 Plus).png';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import EngineeringCarousel from '../components/EngineeringCarousel';
import { Avatar } from 'antd';


function Home ({ API_URL,Companyname }) {
    const { isloggedIn, userDetails } = { isloggedIn: false, userDetails: {} };
    const [isLoading, setIsLoading] = useState(false);
    const companies = [
        { name: "General Electric", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/General_Electric_Logo.svg" },
        { name: "Bechtel", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Bechtel_logo.svg" },
        { name: "BP", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/BP_logo.svg" },
        { name: "Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shell_logo.svg" },
        { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Siemens_logo.svg" },
        { name: "Texas Instruments", logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/Texas_Instruments_logo.svg" },
        { name: "Honeywell", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Honeywell_logo.svg" },
        { name: "Lockheed Martin", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lockheed_Martin_logo.svg" },
        { name: "Raytheon", logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Raytheon_Company_logo.svg" },
        { name: "ABB", logo: "https://upload.wikimedia.org/wikipedia/en/e/e9/ABB_logo.svg" },
        { name: "ExxonMobil", logo: "https://upload.wikimedia.org/wikipedia/en/3/34/ExxonMobil_logo.svg" },
        { name: "Chevron", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Chevron_logo.svg/768px-Chevron_logo.svg.png" },
        { name: "Jacobs", logo: "https://upload.wikimedia.org/wikipedia/commons/7/74/Jacobs_Engineering_Group_logo.svg" },
        { name: "Arup", logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/Arup_Group_Logo.svg" },
        { name: "AECOM", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/AECOM_logo.svg" },
        { name: "Fluor", logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Fluor_Logo.svg" },
        { name: "L&T", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Larsen_%26_Toubro_logo.svg" },
        { name: "KBR", logo: "https://upload.wikimedia.org/wikipedia/en/2/27/KBR_Inc._logo.svg" },
        { name: "TechnipFMC", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/TechnipFMC_logo.svg" },
        { name: "Worley", logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Worley.svg" },
        { name: "Schlumberger", logo: "https://upload.wikimedia.org/wikipedia/en/f/f6/Schlumberger_Limited_logo.svg" },
        { name: "Emerson", logo: "https://upload.wikimedia.org/wikipedia/en/1/1e/Emerson_Electric_Company_logo.svg" },
        { name: "Caterpillar", logo: "https://upload.wikimedia.org/wikipedia/en/1/1a/Caterpillar_Inc._logo.svg" },
        { name: "Rio Tinto", logo: "https://upload.wikimedia.org/wikipedia/en/2/27/Rio_Tinto_logo.svg" },
        { name: "BHP", logo: null },
      ]
      
    const clients = [
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" }
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

            <Container  className='showcase-pic' fluid  style={{width:'auto'}}>
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

            <Container fluid>
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
            <Container className='fadeup-dark-bg p-0 pt-5' fluid>
                <div className='m-0 p-0' style={{width:'auto'}}>
                    <Row className='my-2'>
                        <Col className='text-center'><h3><span>Our</span><span className='text-light'> Partners</span></h3></Col>
                    </Row>
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                    <EngineeringCarousel companies={companies} />
                    <p className='text-white text-center'>
                        Partnering wth over 100+ manufacturers of engineering products
                    </p>
                    <p className='text-dark text-center'>
                        All engineering products easily accessible and procurement-supply process streamlined and
                        made very easy!
                    </p>
                    
                </div>
                <div className='mt-4 p-0' style={{width:'auto'}}>
                    <Row className='my-2'>
                        <Col className='text-center'><h3><span className='text-white'>Our</span><span className='text-dark'> Clients</span></h3></Col>
                    </Row>
                    <div className="client-grid">
                        {clients.map((client, idx) => (
                            <div key={idx} className="client-item">
                                {client.logo?
                                (<Avatar 
                                    shape="circle" 
                                    src={client.logo} 
                                    alt={client.name} 
                                    
                                    style={{ width:'200px', height: '200px', padding: '50px', border: '1px solid #1E1E1E',objectFit: 'cover',
                                        borderRadius: '50%' }} 
                                />):
                                (
                                    <i className="fa-sharp fa-thin fa-loader text-dark text-center" style={{textAlign:'center',width:'200px',height:'200px',padding: '50px', border: '1px solid #1E1E1E', 
                                        borderRadius: '50%' }} ></i>
                                )}
                                
                            </div>
                        ))}
                        <p className='text-white text-center'>
                            Industries, school clubs and all involved in any engineering project or process are
                            part of our big family. We make their work easier to do and facilitates better quality
                            in results. So, what are you waiting for?
                        </p>
                    </div>
                    <Row>
                        <Col className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
                            <div className='text-center' style={{width:'140px'}}>
                                <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 outline-btn' text={
                                    <span >
                                        Click to Start
                                        <i className="fa-light fa-chevron-right m-2"></i>
                                    </span>
                                    } />
                            </div>          
                        </Col>
                    </Row>
                </div>
                <div className='mt-5 p-0' style={{width:'auto'}}>
                    <Row className='my-2'>
                        <Col className='text-center'><h3><span className='text-dark'>What Do you Need? Let's Handle It!</span></h3></Col>
                    </Row>
                    <Row className='mx-4'>
                        <Col xs={12} md={4} className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
                            <Row>
                                <Col xs={6} md={6} className='p-2'>
                                    <img className='need-img'  src="https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="1" style={{ width: '100%', height: 'auto' }} />
                                </Col>
                                <Col xs={6} md={6} className='p-2'>
                                    <img className='need-img'  src="https://images.pexels.com/photos/159108/light-lamp-electricity-power-159108.jpeg" alt="2" style={{ width: '100%', height: 'auto' }} />
                                </Col>
                                <Col xs={6} md={6} className='p-2'>
                                    <img className='need-img'  src="https://images.pexels.com/photos/60049/torx-bits-metal-iron-60049.jpeg?auto=compress&cs=tinysrgb&w=600" alt="3" style={{ width: '100%', height: 'auto' }} />
                                </Col>
                                <Col xs={6} md={6} className='p-2'>
                                    <img className='need-img' src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="4" style={{ width: '100%', height: 'auto' }} />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} md={2} className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
                            <i className="fa-sharp fa-solid fa-circle-arrow-right text-center" style={{fontSize:'26px'}}></i>  
                        </Col>
                        <Col xs={12} md={4} className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
                            <p>
                                We have all you 
                                need to 
                                drive those
                                Innovative Projects
                            </p>
                            <p className='text-center' style={{width:'140px'}}>
                                <Button type='button' htmlType='button' className='rounded-2 py-1 m-1 outline-btn' text={
                                    <span >
                                        It's just here
                                        <i className="fa-light fa-chevron-right m-2"></i>
                                    </span>
                                    } />
                            </p>       
                        </Col>
                    </Row>
                </div>

                <div className='separator' style={{width:'auto'}}>

                </div>
                <Row className='text-center rounded-2 py-3 mt-3 mb-3 mx-3' style={{backgroundColor: 'black', color: 'white',display: 'flex', justifyContent: 'center' }}>
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
                <Footer className='footer'/>
            </Container>

            
        </div>
    );
}
export default Home;