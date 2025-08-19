// import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra'
const Payment =({categories=[]})=>{
    // const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
    const [issuccess, SetIsuccess] = useState(true);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>

                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">{issuccess?'Payment confirmation':'Payment Failure '}</div>
                    </div>
                </div>

                {issuccess ?
                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h5 className="fw-5 mb_20">Payment confirmation</h5>
                                <div className="tf-page-cart-checkout">
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Date</div>
                                        <p>01/01/2024</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Payment method</div>
                                        <p>Visa</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Card number</div>
                                        <p>**** **** **** 9999</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Cardholder name</div>
                                        <p>Themesflat</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Email</div>
                                        <p>info@fashionshop.com</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_15">
                                        <div className="fs-18">Phone</div>
                                        <p>(212) 555-1234</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb_24">
                                        <div className="fs-22 fw-6">Subtotal</div>
                                        <span className="total-value">$188.00 USD</span>
                                    </div>
                                    <div className="d-flex gap-10">
                                        <a href="checkout.html"
                                            className="tf-btn w-100 btn-outline animate-hover-btn rounded-0 justify-content-center">
                                            <span>Cancel Payment</span>
                                        </a>
                                        <a href="#"
                                            className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center">
                                            <span>Confirm Payment</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-lg-6 col-md-8">
                                <div className="tf-page-cart-checkout">
                                    <div className="d-flex gap-10 align-items-center mb_20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"
                                            fill="currentColor">
                                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                                            <path
                                                d="M15.32 3H8.68c-.26 0-.52.11-.7.29L3.29 7.98c-.18.18-.29.44-.29.7v6.63c0 .27.11.52.29.71l4.68 4.68c.19.19.45.3.71.3h6.63c.27 0 .52-.11.71-.29l4.68-4.68c.19-.19.29-.44.29-.71V8.68c0-.27-.11-.52-.29-.71l-4.68-4.68c-.18-.18-.44-.29-.7-.29zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm0-4.3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z">
                                            </path>
                                        </svg>
                                        <h5 className="fw-5">Payment Failure </h5>
                                    </div>
                                    <p className="mb_20">Hey there. We tried to charge your card but, something went wrong. Please
                                        update your payment method below to continue</p>
                                    <a href="checkout.html"
                                        className="tf-btn mb_20 w-100 btn-fill animate-hover-btn radius-3 justify-content-center">
                                        <span>Update Payment Method</span>
                                    </a>
                                    <p>Have a question? <a href="contact-1.html" className="text_primary">Contact Support</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }

                <Footer />
            </div>
            <Extras  categories={categories} />
        </div>
    )
}
export default Payment;
