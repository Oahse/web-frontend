import React from 'react';
import logo from '@/assets/images/logo/banwe_logo_text_green.png';
// Payment method images
import visa from '@/assets/images/payments/visa.png';
import img1 from '@/assets/images/payments/img-1.png';
import img2 from '@/assets/images/payments/img-2.png';
import img3 from '@/assets/images/payments/img-3.png';
import img4 from '@/assets/images/payments/img-4.png';

// Country flag images
import countryFR from '@/assets/images/country/fr.svg';
import countryDE from '@/assets/images/country/de.svg';
import countryUS from '@/assets/images/country/us.svg';
import countryVN from '@/assets/images/country/vn.svg';
import Subscribe from '@/components/form/Subscribe';

const Footer = () => {
  return (
    <footer id="footer" className="footer md-pb-70">
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-infor">
                  <div className="footer-logo">
                    <a href="index-2.html">
                      <img src={logo} alt="Logo" style={{width:'140px'}}/>
                    </a>
                  </div>
                  <ul>
                    <li>
                      <p>Address: 1234 Fashion Street, Suite 567, <br /> New York, NY 10001</p>
                    </li>
                    <li>
                      <p>Email: <a href="#">info@fashionshop.com</a></p>
                    </li>
                    <li>
                      <p>Phone: <a href="#">(212) 555-1234</a></p>
                    </li>
                  </ul>
                  <a href="contact-1.html" className="tf-btn btn-line">Get direction<i className="icon icon-arrow1-top-left"></i></a>
                  <ul className="tf-social-icon d-flex gap-10">
                    <li><a href="#" className="box-icon w_34 round social-facebook social-line"><i className="icon fs-14 icon-fb"></i></a></li>
                    <li><a href="#" className="box-icon w_34 round social-twiter social-line"><i className="icon fs-12 icon-Icon-x"></i></a></li>
                    <li><a href="#" className="box-icon w_34 round social-instagram social-line"><i className="icon fs-14 icon-instagram"></i></a></li>
                    <li><a href="#" className="box-icon w_34 round social-tiktok social-line"><i className="icon fs-14 icon-tiktok"></i></a></li>
                    <li><a href="#" className="box-icon w_34 round social-pinterest social-line"><i className="icon fs-14 icon-pinterest-1"></i></a></li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>Help</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6>Help</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  <li><a href="privacy-policy.html" className="footer-menu_item">Privacy Policy</a></li>
                  <li><a href="delivery-return.html" className="footer-menu_item">Returns + Exchanges</a></li>
                  <li><a href="shipping-delivery.html" className="footer-menu_item">Shipping</a></li>
                  <li><a href="terms-conditions.html" className="footer-menu_item">Terms &amp; Conditions</a></li>
                  <li><a href="faq-1.html" className="footer-menu_item">FAQ’s</a></li>
                  <li><a href="compare.html" className="footer-menu_item">Compare</a></li>
                  <li><a href="wishlist.html" className="footer-menu_item">My Wishlist</a></li>
                </ul>
              </div>

              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>About us</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6>About us</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  <li><a href="about-us.html" className="footer-menu_item">Our Story</a></li>
                  <li><a href="our-store.html" className="footer-menu_item">Visit Our Store</a></li>
                  <li><a href="contact-1.html" className="footer-menu_item">Contact Us</a></li>
                  <li><a href="login.html" className="footer-menu_item">Account</a></li>
                </ul>
              </div>

              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-newsletter footer-col-block">
                  <div className="footer-heading footer-heading-desktop">
                    <h6>Sign Up for Email</h6>
                  </div>
                  <div className="tf-collapse-content">
                    <div className="footer-menu_item">
                      Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!
                    </div>
                    <Subscribe />

                    <div className="tf-cur">
                      <div className="tf-currencies">
                        <select className="image-select center style-default type-currencies">
                          <option data-thumbnail={countryFR}>EUR € | France</option>
                          <option data-thumbnail={countryDE}>EUR € | Germany</option>
                          <option data-thumbnail={countryUS} selected>USD $ | United States</option>
                          <option data-thumbnail={countryVN}>VND ₫ | Vietnam</option>
                        </select>
                      </div>
                      <div className="tf-languages">
                        <select className="image-select center style-default type-languages">
                          <option>English</option>
                          <option>العربية</option>
                          <option>简体中文</option>
                          <option>اردو</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
                  <div className="footer-menu_item">© 2025 Ecomus Store. All Rights Reserved</div>
                  <div className="tf-payment">
                    <img src={visa} alt="Visa" />
                    <img src={img1} alt="Payment 1" />
                    <img src={img2} alt="Payment 2" />
                    <img src={img3} alt="Payment 3" />
                    <img src={img4} alt="Payment 4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
