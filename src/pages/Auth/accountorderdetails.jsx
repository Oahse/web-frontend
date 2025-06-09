import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Extras from '@/components/extra';
import BreadCrumbs from '@/components/breadcrumbs';

const AccountOrdersDetails =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">My Orders</div>
                        <BreadCrumbs
                            dir='center'
                            links={[
                                { name: 'Home', href: '/' },
                                { name: 'Account', href: '/account' },
                                { name: 'Orders', href: '/account/orders' },
                                { name: 'Orders Details' }
                            ]}
                            // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                            // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                            // back={{ href: '/products', tooltip: 'Back to Products' }}
                        />
                    </div>
                </div>

                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <AccountSideBar active={1}/>
                                
                            </div>
                            <div className="col-lg-9">
                                <div className="wd-form-order">
                                    <div className="order-head">
                                        <figure className="img-product">
                                            <img src="images/products/brown.jpg" alt="product"/>
                                        </figure>
                                        <div className="content">
                                            <div className="badge">In Progress</div>
                                            <h6 className="mt-8 fw-5">Order #17493</h6>
                                        </div>
                                    </div>
                                    <div className="tf-grid-layout md-col-2 gap-15">
                                        <div className="item">
                                            <div className="text-2 text_black-2">Item</div>
                                            <div className="text-2 mt_4 fw-6">Fashion</div>
                                        </div>
                                        <div className="item">
                                            <div className="text-2 text_black-2">Courier</div>
                                            <div className="text-2 mt_4 fw-6">Ribbed modal T-shirt</div>
                                        </div>
                                        <div className="item">
                                            <div className="text-2 text_black-2">Start Time</div>
                                            <div className="text-2 mt_4 fw-6">04 September 2024, 13:30:23</div>
                                        </div>
                                        <div className="item">
                                            <div className="text-2 text_black-2">Address</div>
                                            <div className="text-2 mt_4 fw-6">1234 Fashion Street, Suite 567, New York</div>
                                        </div>
                                    </div>
                                    <div className="widget-tabs style-has-border widget-order-tab">
                                        <ul className="widget-menu-tab">
                                            <li className="item-title active">
                                                <span className="inner">Order History</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Item Details</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Courier</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Receiver</span>
                                            </li>
                                        </ul>
                                        <div className="widget-content-tab">
                                            <div className="widget-content-inner active">
                                                <div className="widget-timeline">
                                                    <ul className="timeline">
                                                        <li>
                                                            <div className="timeline-badge success"></div>
                                                            <div className="timeline-box">
                                                                <a className="timeline-panel" href="javascript:void(0);">
                                                                    <div className="text-2 fw-6">Product Shipped</div>
                                                                    <span>10/07/2024 4:30pm</span>
                                                                </a>
                                                                <p><strong>Courier Service : </strong>FedEx World Service Center
                                                                </p>
                                                                <p><strong>Estimated Delivery Date : </strong>12/07/2024</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-badge success"></div>
                                                            <div className="timeline-box">
                                                                <a className="timeline-panel" href="javascript:void(0);">
                                                                    <div className="text-2 fw-6">Product Shipped</div>
                                                                    <span>10/07/2024 4:30pm</span>
                                                                </a>
                                                                <p><strong>Tracking Number : </strong>2307-3215-6759</p>
                                                                <p><strong>Warehouse : </strong>T-Shirt 10b</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-badge"></div>
                                                            <div className="timeline-box">
                                                                <a className="timeline-panel" href="javascript:void(0);">
                                                                    <div className="text-2 fw-6">Product Packaging</div>
                                                                    <span>12/07/2024 4:34pm</span>
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-badge"></div>
                                                            <div className="timeline-box">
                                                                <a className="timeline-panel" href="javascript:void(0);">
                                                                    <div className="text-2 fw-6">Order Placed</div>
                                                                    <span>11/07/2024 2:36pm</span>
                                                                </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="widget-content-inner">
                                                <div className="order-head">
                                                    <figure className="img-product">
                                                        <img src="images/products/brown.jpg" alt="product"/>
                                                    </figure>
                                                    <div className="content">
                                                        <div className="text-2 fw-6">Ribbed modal T-shirt</div>
                                                        <div className="mt_4"><span className="fw-6">Price :</span> $28.95</div>
                                                        <div className="mt_4"><span className="fw-6">Size :</span> XL</div>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <li className="d-flex justify-content-between text-2">
                                                        <span>Total Price</span>
                                                        <span className="fw-6">$28.95</span>
                                                    </li>
                                                    <li className="d-flex justify-content-between text-2 mt_4 pb_8 line">
                                                        <span>Total Discounts</span>
                                                        <span className="fw-6">$10</span>

                                                    </li>
                                                    <li className="d-flex justify-content-between text-2 mt_8">
                                                        <span>Order Total</span>
                                                        <span className="fw-6">$18.95</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="widget-content-inner">
                                                <p>Our courier service is dedicated to providing fast, reliable, and secure
                                                    delivery solutions tailored to meet your needs. Whether you're sending
                                                    documents, parcels, or larger shipments, our team ensures that your items
                                                    are handled with the utmost care and delivered on time. With a commitment to
                                                    customer satisfaction, real-time tracking, and a wide network of routes, we
                                                    make it easy for you to send and receive packages both locally and
                                                    internationally. Choose our service for a seamless and efficient delivery
                                                    experience.</p>
                                            </div>
                                            <div className="widget-content-inner">
                                                <p className="text-2 text_success">Thank you Your order has been received</p>
                                                <ul className="mt_20">
                                                    <li>Order Number : <span className="fw-7">#17493</span></li>
                                                    <li>Date : <span className="fw-7"> 17/07/2024, 02:34pm</span></li>
                                                    <li>Total : <span className="fw-7">$18.95</span></li>
                                                    <li>Payment Methods : <span className="fw-7">Cash on Delivery</span></li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="btn-sidebar-account">
                    <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount" aria-controls="offcanvas"><i
                            className="icon icon-sidebar-2"></i></button>
                </div>
                <Footer />
            </div>
            
            <Extras categories={categories}  active={1}/>
        </div>
    )
}
export default AccountOrdersDetails;