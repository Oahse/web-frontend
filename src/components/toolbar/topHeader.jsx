import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import paypal from '@/assets/images/payments/paypal.png';
// import visa from '@/assets/images/payments/visa.png';
import mastercard from '@/assets/images/payments/img-2.png';
// Add these imports for your other images:
import applepay from '@/assets/images/payments/applepay.jpg';
import googlepay from '@/assets/images/payments/googlepay.png';
import amazonpay from '@/assets/images/payments/amazonpay.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import white1 from '@/assets/images/products/white-1.jpg';
import black1 from '@/assets/images/products/black-1.jpg';
import orange1 from '@/assets/images/products/orange-1.jpg';
import bag1 from '@/assets/images/products/black-4.jpg';
import bag2 from '@/assets/images/products/black-8.jpg';
const TopHeader  =()=>{
    const ads =[
        {
            id: 10,
            name: 'Spring Sale: Sweet Crunchy Salad.',
            price: 38.0,
            currency: '£',
            discount: 28,
            discountStartDate: '2025-05-12T13:00:00Z',
            availability: 'In stock',
            brand: 'PackRight',
            category: 'Fibers',
            images: [bag1, bag2, black1, white1],
            colors: [
              { name: 'Navy', swatch: 'bg_navy', image: bag1 },
              { name: 'Beige', swatch: 'bg_beige', image: bag2 },
            ],
            sizes: [
              { label: 'S', id: 'values-s', price: 0 },
              { label: 'M', id: 'values-m', price: 9 },
              { label: 'L', id: 'values-l', price: 10 },
              { label: 'XL', id: 'values-xl', price: 12 },
            ],
            rating: 4,
            description:{
              desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
              features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
              materialscareleft:[
                {
                  name:'Content: 100% LENZING™ ECOVERO™ Viscose'
                },
                {
                  name:'Care: Hand wash'
                },
                {
                  name:'Imported'
                }
        
              ],
              materialscareright:[
                {
                  icon:'icon-machine',
                  name:'Machine wash max. 30ºC. Short spin.'
                },
                {
                  icon:'icon-iron',
                  name:'Iron maximum 110ºC.'
                },
                {
                  icon:'icon-bleach',
                  name:'Do not bleach/bleach.'
                },
                {
                  icon:'icon-dry-clean',
                  name:'Do not dry clean.'
                },
                {
                  icon:'icon-tumble-dry',
                  name:'Tumble dry, medium hear.'
                }
        
              ]
            },
            additionalinfo:[
              {
                label:'Color',
                value:'White, Pink, Black'
              },
              {
                label:'Size',
                value:'S, M, L, XL'
              }
            ],
            checkout:{
              title:{
                icon:'icon-safe',
                name:'Guarantee Safe Checkout'
              },
              methods:[
                {
                  image:paypal,
                  maxHeight:'18px',
                  marginLeft:'2rem'
                },
                {
                  image:mastercard,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:googlepay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:applepay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:amazonpay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                }
              ]
            }
          },
          {
            id: 11,
            name: 'Classic White Tee',
            price: 12.99,
            currency: '$',
            discount: 10,
            discountStartDate: '2025-05-13T10:00:00Z',
            availability: 'Limited stock',
            brand: 'BasicThreads',
            category: 'Fibers',
            images: [white1, black1, orange1, white1],
            colors: [
              { name: 'White', swatch: 'bg_white', image: white1 },
              { name: 'Black', swatch: 'bg_dark', image: black1 },
            ],
            sizes: [
              { label: 'S', id: 'values-s', price: 0 },
              { label: 'M', id: 'values-m', price: 9 },
              { label: 'L', id: 'values-l', price: 10 },
              { label: 'XL', id: 'values-xl', price: 12 },
            ],
            rating: 4,
            description:{
              desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
              features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
              materialscareleft:[
                {
                  name:'Content: 100% LENZING™ ECOVERO™ Viscose'
                },
                {
                  name:'Care: Hand wash'
                },
                {
                  name:'Imported'
                }
        
              ],
              materialscareright:[
                {
                  icon:'icon-machine',
                  name:'Machine wash max. 30ºC. Short spin.'
                },
                {
                  icon:'icon-iron',
                  name:'Iron maximum 110ºC.'
                },
                {
                  icon:'icon-bleach',
                  name:'Do not bleach/bleach.'
                },
                {
                  icon:'icon-dry-clean',
                  name:'Do not dry clean.'
                },
                {
                  icon:'icon-tumble-dry',
                  name:'Tumble dry, medium hear.'
                }
        
              ]
            },
            additionalinfo:[
              {
                label:'Color',
                value:'White, Pink, Black'
              },
              {
                label:'Size',
                value:'S, M, L, XL'
              }
            ],
            checkout:{
              title:{
                icon:'icon-safe',
                name:'Guarantee Safe Checkout'
              },
              methods:[
                {
                  image:paypal,
                  maxHeight:'18px',
                  marginLeft:'2rem'
                },
                {
                  image:mastercard,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:googlepay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:applepay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                },
                {
                  image:amazonpay,
                  maxHeight:'24px',
                  marginLeft:'2rem'
                }
              ]
            }
          }
    ]
      const swiperRef = useRef(null);
      const [activeIndex, setActiveIndex] = useState(0);
        const duration = 5000;
      const slidesPerView = 1
    //   const totalPages = Math.ceil(items.length / slidesPerView);
    
      useEffect(() => {
        const swiperInstance = swiperRef.current?.swiper;

        if (!swiperInstance) return;

        const interval = setInterval(() => {
            swiperInstance.slideNext(); // Move to next slide every 3s
        }, duration);

        const onSlideChange = () => {
            const currentIndex = Math.ceil(swiperInstance.activeIndex / slidesPerView);
            setActiveIndex(currentIndex);
        };

        swiperInstance.on("slideChange", onSlideChange);

        return () => {
            clearInterval(interval);
            swiperInstance.off("slideChange", onSlideChange);
        };
        }, [slidesPerView,duration]);
    
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
                          
                          <Swiper
                                ref={swiperRef}
                                slidesPerView={slidesPerView}
                                spaceBetween={15}
                                autoplay={{ delay: duration }}
                                speed={2500}
                                lazy={true}
                                loop={true} // <-- enable looping
                                className="tf-sw-top_bar" data-preview="1" data-space="0" data-loop="true"
                                data-speed="1000" data-delay="2000"
                                pagination={false}
                            >
                                {ads.map((product, index)=>(
                                    <SwiperSlide key={index} >
                                        <p className="top-bar-text fw-5">{product.name} <Link
                                                        to={`/products/${product?.id}`} title="all collection" className="tf-btn btn-line">Shop
                                                        now<i className="icon icon-arrow1-top-left"></i></Link></p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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