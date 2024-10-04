import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';
import SideNavBar from '../components/MobileSideBar';
import Footer from '../components/Footer';
import userimg from '../assets/user.png'
// import profile from '../assets/profile.JPG'
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../components/Button';


function ProfilePage() {

    const name = "Home"
    
    const [iconColor, setIconColor] = useState('white');
    const [navbarBg, setNavbarBg] = useState('transparent');
    const [margin, setMargin] = useState('20px');

    
    const linkstyles = {
        fontFamily: 'Open Sans, sans-serif',
        color:iconColor
    };
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollThreshold = 20; // Adjust the threshold as needed

        if (scrollY > scrollThreshold) {
        setNavbarBg('white');
        setIconColor('black');
        setMargin('0px');

        } else {
        setNavbarBg('transparent');
        setIconColor('white');
        setMargin('20px');
        
        }
    };


    useEffect(() => {
        
        
        window.addEventListener('scroll', handleScroll);
        // window.addEventListener('resize', handleResize);

        // handleResize()

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // window.removeEventListener('resize', handleResize); 
        };

    },  []);
  return (
    <div>
        <Header parent={name} iconColor={iconColor} navbarBg={navbarBg} linkstyles={linkstyles} margin={margin} />
        <SideNavBar iconColor={iconColor}/>
        <Container fluid>
            <Row className='py-5 gradient-bg'>
                <Col className='text-center  mt-5' sm={12} md={6} lg={6}>
                    <div className='rounded-circle'><img src={userimg} alt='user' width='50%' className='rounded-circle'/></div>
                </Col>
                <Col className='py-4 mt-5'>
                    <h2>Olaitan Chinedu Rufai <span><i class="bi bi-patch-check-fill"></i></span></h2>
                    <p><span><i className="bi bi-briefcase-fill"></i></span>  Professional Engineer</p>
                    <p><span><i className="bi bi-geo-alt-fill"></i></span>  Ikoyi, Lagos State, Nigeria</p>
                    <p><span><i className="bi bi-telephone-fill"></i></span>  +2349012345678</p>
                    <p><span><i className="bi bi-envelope-fill"></i></span>  ocrafiu@ncc.com</p>

                    <Button type='button' htmlType={'button'} text='Edit Profile'/>
                </Col>
            </Row>

            <Row className='p-5 ' lg={2} md={2} sm={1} xs={1}>
               
                   
                    <Col className='mb-3'><h2>User ID: </h2> <span><p>110022</p></span></Col>
                    <Col className='mb-3'><h2>Account Type: </h2> <span><p>Individual</p></span></Col>
                    <Col className='mb-3'><h2>Status: </h2> <span><p>Verified</p></span></Col>
                    <Col className='mb-3'><h2>National ID: </h2> <span><p>110022456098</p></span></Col>
                    <Col className='mb-3'><h2>Certification: </h2> <span><p>COREN</p></span></Col>
                    <Col className='mb-3'><h2>Certification ID: </h2> <span><p>110022</p></span></Col>
                  
                    
               
            </Row>

            <Row className='p-3 mb-3 text-center' lg={4} md={4} sm={3}>
                <Col className='mb-5'>
                    <Link to={{pathname:`/profile/reports/${1455}`}} state={{indexpage:'Dashboard'}} style={{textDecoration:'none', color:'black'}}>
                        <h1><i className="bi bi-card-list"></i></h1>
                        <h4>Reports</h4>
                    </Link>
                </Col>

                <Col className='mb-5'>
                    <h1><i className="bi bi-heart"></i></h1>
                    <h4>Saved Items</h4>
                </Col>

                <Col className='mb-5'>
                    <h1><i className="bi bi-chat-left-text"></i></h1>
                    <h4>Reviews</h4>
                </Col>

                <Col className='mb-5'>
                    <h1><i className="bi bi-file-earmark-text"></i></h1>
                    <h4>Submissions</h4>
                </Col>

                <Col className='mb-5'>
                    <h1><i className="bi bi-map"></i></h1>
                    <h4>Address Book</h4>
                </Col>

                <Col className='mb-5'>
                     
                    <Link to={{pathname:`/profile/reports/${1455}`}} state={{indexpage:'Transactions'}} style={{textDecoration:'none', color:'black'}}>
                        <h1><i className="bi bi-wallet"></i></h1>
                        <h4>Payment</h4>
                    </Link>
                </Col>

                <Col className='mb-5'>
                <h1><i className="bi bi-box-arrow-right"></i></h1>
                    <h4>Logout</h4>
                </Col>
            </Row>
        </Container>

        <Footer/>
        
    </div>
  )
}

export default ProfilePage