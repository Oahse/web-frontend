import React from 'react';
import { Row, Col, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 


function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='m-2'>
      <Container >
        <Row>
            <Col className='py-3'>
                <h3 className='text-white'>Oahse</h3>
            </Col>
        </Row>
        <Row className='text-center'>
          <Col xs={6} md={4} lg={3}>
            <ul className='footer-list list-unstyled text-left'>
              <li><p className='text-white footer-listHeader'>Offices</p></li>
              <li><Link to='/about/' className='text-white footer-listitem fw-400'>Canada</Link></li>
              <li><Link href='/' className='text-white footer-listitem'><small>1060 Dot Avenue,</small></Link></li>
              <li><Link href='/' className='text-white footer-listitem'><small> Windsor, ON N9C 3H8</small></Link></li>
              <li><Link href='/' className='text-white footer-listitem mt-3'></Link></li>
              <li><Link to='/about/' className='text-white footer-listitem fw-400'>Nigeria</Link></li>
              <li><Link href='/' className='text-white footer-listitem'><small>No. 2 Engr. Lanre Crescent,</small></Link></li>
              <li><Link href='/' className='text-white footer-listitem'><small>Amuwo-Odofin,</small></Link></li>
              <li><Link href='/' className='text-white footer-listitem'><small>Lagos.</small></Link></li>
            </ul>
          </Col >

          <Col xs={6} md={4} lg={3}>
            <ul className='footer-list list-unstyled text-left'>
              <li><h4 className='text-white footer-listHeader'>Connect With Us</h4></li>
              <li className='d-flex align-items-center '>
                <Link to='/faceboooklink.com' className='text-white footer-listitem me-3'>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2812_2860)">
                      <path d="M24 12.0723C24 5.44527 18.627 0.0722656 12 0.0722656C5.373 0.0722656 0 5.44527 0 12.0723C0 18.0623 4.388 23.0263 10.125 23.9263V15.5413H7.078V12.0713H10.125V9.42927C10.125 6.42227 11.917 4.76027 14.658 4.76027C15.97 4.76027 17.344 4.99527 17.344 4.99527V7.94827H15.83C14.339 7.94827 13.874 8.87327 13.874 9.82227V12.0723H17.202L16.67 15.5423H13.874V23.9273C19.612 23.0263 24 18.0613 24 12.0723Z" fill="#1877F2"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_2812_2860">
                      <rect width="24" height="24" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>

                  </Link>
                <Link to='/faceboooklink.com' className='text-white footer-listitem me-3'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.543 7.10497C21.558 7.31597 21.558 7.52797 21.558 7.74097C21.558 14.248 16.604 21.751 7.548 21.751V21.748C4.87223 21.7516 2.25194 20.9851 0 19.54C1.28916 19.6953 2.59629 19.595 3.84665 19.2448C5.09702 18.8946 6.26608 18.3013 7.287 17.499C6.25944 17.4795 5.26365 17.1394 4.43888 16.5262C3.61411 15.913 3.0016 15.0574 2.687 14.079C3.42468 14.2212 4.18515 14.1925 4.91 13.995C3.79573 13.7697 2.79367 13.166 2.07373 12.2863C1.3538 11.4065 0.96031 10.3048 0.96 9.16797V9.10597C1.64481 9.4876 2.41138 9.69888 3.195 9.72197C2.15247 9.02584 1.41442 7.95856 1.1311 6.73741C0.847781 5.51626 1.04049 4.23304 1.67 3.14897C2.90661 4.67012 4.44931 5.91419 6.19795 6.8004C7.94659 7.6866 9.86206 8.19513 11.82 8.29297C11.5761 7.2378 11.6865 6.13166 12.1342 5.14551C12.5818 4.15937 13.3418 3.3481 14.2967 2.8371C15.2515 2.32609 16.3481 2.1438 17.4169 2.31838C18.4858 2.49296 19.4674 3.0147 20.21 3.80297C21.3132 3.58543 22.3711 3.18094 23.338 2.60697C22.9705 3.74745 22.2011 4.71552 21.173 5.33097C22.1488 5.21541 23.1017 4.95418 24 4.55597C23.3388 5.54475 22.5068 6.40789 21.543 7.10497Z" fill="#1D9BF0"/>
                  </svg>

                </Link>
                <Link to='/faceboooklink.com' className='text-white footer-listitem me-3'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2812_2866)">
                    <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="#0A66C2"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2812_2866">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link to='/faceboooklink.com' className='text-white footer-listitem me-3'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2812_2862)">
                    <path d="M12 0C8.74 0 8.333 0.015 7.053 0.072C5.775 0.132 4.905 0.333 4.14 0.63C3.351 0.936 2.681 1.347 2.014 2.014C1.347 2.681 0.935 3.35 0.63 4.14C0.333 4.905 0.131 5.775 0.072 7.053C0.012 8.333 0 8.74 0 12C0 15.26 0.015 15.667 0.072 16.947C0.132 18.224 0.333 19.095 0.63 19.86C0.936 20.648 1.347 21.319 2.014 21.986C2.681 22.652 3.35 23.065 4.14 23.37C4.906 23.666 5.776 23.869 7.053 23.928C8.333 23.988 8.74 24 12 24C15.26 24 15.667 23.985 16.947 23.928C18.224 23.868 19.095 23.666 19.86 23.37C20.648 23.064 21.319 22.652 21.986 21.986C22.652 21.319 23.065 20.651 23.37 19.86C23.666 19.095 23.869 18.224 23.928 16.947C23.988 15.667 24 15.26 24 12C24 8.74 23.985 8.333 23.928 7.053C23.868 5.776 23.666 4.904 23.37 4.14C23.064 3.351 22.652 2.681 21.986 2.014C21.319 1.347 20.651 0.935 19.86 0.63C19.095 0.333 18.224 0.131 16.947 0.072C15.667 0.012 15.26 0 12 0ZM12 2.16C15.203 2.16 15.585 2.176 16.85 2.231C18.02 2.286 18.655 2.48 19.077 2.646C19.639 2.863 20.037 3.123 20.459 3.542C20.878 3.962 21.138 4.361 21.355 4.923C21.519 5.345 21.715 5.98 21.768 7.15C21.825 8.416 21.838 8.796 21.838 12C21.838 15.204 21.823 15.585 21.764 16.85C21.703 18.02 21.508 18.655 21.343 19.077C21.119 19.639 20.864 20.037 20.444 20.459C20.025 20.878 19.62 21.138 19.064 21.355C18.644 21.519 17.999 21.715 16.829 21.768C15.555 21.825 15.18 21.838 11.97 21.838C8.759 21.838 8.384 21.823 7.111 21.764C5.94 21.703 5.295 21.508 4.875 21.343C4.306 21.119 3.915 20.864 3.496 20.444C3.075 20.025 2.806 19.62 2.596 19.064C2.431 18.644 2.237 17.999 2.176 16.829C2.131 15.569 2.115 15.18 2.115 11.985C2.115 8.789 2.131 8.399 2.176 7.124C2.237 5.954 2.431 5.31 2.596 4.89C2.806 4.32 3.075 3.93 3.496 3.509C3.915 3.09 4.306 2.82 4.875 2.611C5.295 2.445 5.926 2.25 7.096 2.19C8.371 2.145 8.746 2.13 11.955 2.13L12 2.16ZM12 5.838C8.595 5.838 5.838 8.598 5.838 12C5.838 15.405 8.598 18.162 12 18.162C15.405 18.162 18.162 15.402 18.162 12C18.162 8.595 15.402 5.838 12 5.838ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM19.846 5.595C19.846 6.39 19.2 7.035 18.406 7.035C17.611 7.035 16.966 6.389 16.966 5.595C16.966 4.801 17.612 4.156 18.406 4.156C19.199 4.155 19.846 4.801 19.846 5.595Z" fill="#E4405F"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2812_2862">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={4} lg={3}>
            <ul className='footer-list list-unstyled text-left'>
                <li><h4 className='text-white footer-listHeader'>Products</h4></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Supply</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>E-Commerce</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Consultancy</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Maintenance</Link></li>
                <li><Link to='/find/' className='text-white footer-listitem'>Engineering</Link></li>
            </ul>
            </Col>


          <Col xs={6} md={4} lg={3}>
            <ul className='footer-list list-unstyled text-left'>
                <li className='store-list-item'>
                    <Link className='store' to="https://www.google.com" target="_blank" rel="noopener noreferrer" >
                      <i className="fa-brands fa-google-play"></i><span>Google Play</span>
                    </Link>
                </li>
                <li className='store-list-item'>
                    <Link className='store' to="https://www.google.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-apple"></i><span>Apple</span> 
                    </Link>
                </li>
            </ul>

          </Col>
        </Row>

        <hr />

        <Container fluid className="py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
            {/* Left-aligned copyright information */}
            <div className="text-center text-md-start mb-2 mb-md-0">
              <small>
                <span className="bottom">©</span> COPYRIGHT {currentYear} Oahse (COMPANY NO. 08145843) 
                44 CRANTOCK ROAD, LONDON, SE6 2QP
              </small>
            </div>
            
            {/* Right-aligned links */}
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3">
              <small>
                <Link to="/" className="bottom">Legal & Compliance</Link>
              </small>
              <small>
                <Link to="/" className="bottom">Cookies</Link>
              </small>
              <small>
                <Link to="/" className="bottom">Security</Link>
              </small>
            </div>
          </div>
        </Container>

      </Container>
    </footer>
  );
}

export default Footer;