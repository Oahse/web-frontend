import React from 'react';
import { Link } from 'react-router-dom';

const TopHeader  =()=>{
    return (
        <div className="tf-top-bar bg_grey-7">
              <div className="px_15 lg-px_40">
                  <div className="tf-top-bar_wrap grid-3 gap-30 align-items-center">
                      <div className="tf-top-bar_left">
                          <ul className="d-flex gap-20">
                              <li>
                                  <Link to="/contact" className="fw-5">Contact</Link>
                              </li>
                              <li>
                                  <Link to="/blog" className="fw-5">Blog</Link>
                              </li>
                              <li>
                                  <Link to="/account/orders" className="fw-5">Orders</Link>
                              </li>
                          </ul>
                      </div>
                      <div className="text-center overflow-hidden">
                          <div dir="ltr" className="swiper tf-sw-top_bar" data-preview="1" data-space="0" data-loop="true"
                              data-speed="1000" data-delay="2000">
                              <div className="swiper-wrapper">
                                  <div className="swiper-slide">
                                      <p className="top-bar-text fw-5">Spring Sale: Sweet Crunchy Salad. <a
                                              href="shop-default.html" title="all collection" className="tf-btn btn-line">Shop
                                              now<i className="icon icon-arrow1-top-left"></i></a></p>
                                  </div>
                                  <div className="swiper-slide">
                                      <p className="top-bar-text fw-5">Summer sale discount off 70%</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="top-bar-language tf-cur justify-content-end">
                          <div className="d-inline-block">
                              Need help?
                              <span className="fw-7">
                                  Call Us: <a href="tel:+18001090" style={{textDecoration:'underline'}}
                                      aria-describedby="external-message">+18001090</a>
                              </span>
                          </div>
                          <div className="tf-currencies">
                              <select className="image-select center style-default type-currencies">
                                  <option data-thumbnail="images/country/fr.svg">EUR € | France</option>
                                  <option data-thumbnail="images/country/de.svg">EUR € | Germany</option>
                                  <option selected data-thumbnail="images/country/us.svg">USD $ | United States</option>
                                  <option data-thumbnail="images/country/vn.svg">VND ₫ | Vietnam</option>
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
    )
}
export default TopHeader;