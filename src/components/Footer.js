import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import google from '../assets/google_play.png';
import apple from '../assets/apple.png'

function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-4'>
      <Container>
        <Row>
            <Col className='py-3'>
                <h3 className='text-light'>Oahse</h3>
            </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <ul className='footer-list list-unstyled text-left'>
              <li><h4 className='text-white footer-listitem'>Company</h4></li>
              <li><Link to='/about/' className='text-white footer-listitem'>About Us</Link></li>
              <li><Link href='/' className='text-white footer-listitem'>Careers</Link></li>
              <li><Link href='/' className='text-white footer-listitem'>News room</Link></li>
              <li><Link href='/' className='text-white footer-listitem'>Blog</Link></li>
              <li><Link href='/' className='text-white footer-listitem'>Investors</Link></li>
            </ul>
          </Col>

          <Col>
            <ul className='footer-list list-unstyled text-left'>
              <li><h4 className='text-white footer-listitem'>Partnership</h4></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Vendors</Link></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Tradespersons</Link></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Engineers</Link></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Engineering Companies</Link></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Franchise</Link></li>
              <li><Link to='/find/' className='text-white footer-listitem'>Influencers</Link></li>
            </ul>
          </Col>

          <Col>
            <ul className='footer-list list-unstyled text-left'>
                <li><h4 className='text-white footer-listitem'>Products</h4></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Supply</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>E-Commerce</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Consultancy</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Maintenance</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Engineering</Link></li>
            </ul>
            </Col>


          <Col>
            <ul className='footer-list list-unstyled text-left'>
                <li className='store-list-item'>
                    <Link className='store' to="https://www.google.com" target="_blank" rel="noopener noreferrer" >
                      <img src={google} alt='google'/>Google
                    </Link>
                </li>
                <li className='store-list-item'>
                    <Link className='store' to="https://www.google.com" target="_blank" rel="noopener noreferrer">
                      <img src={apple} alt='apple'/> Apple 
                    </Link>
                </li>
            </ul>

          </Col>
        </Row>

        <hr />

        <Row>
          <Col className='col-12 text-center'><small> 
            <span className='bottom text-center'>© </span>
            COPYRIGHT {currentYear} Oahse (COMPANY NO. 08145843) 44 CRANTOCK ROAD, LONDON, SE6 2QP </small>
          </Col>

          <Col className='text-center'>
            <small><Link to='/' className='bottom'>Legal & Compliance</Link></small>
            <small><Link to='/' className='bottom'>Cookies</Link></small>
            <small><Link to='/' className='bottom'>Security</Link></small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;