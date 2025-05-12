import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";

const Shipping =()=>{
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title style-2">
                    <div className="container-full">
                        <div className="heading text-center">Shipping & Delivery</div>
                    </div>
                </div>
                <section className="flat-spacing-25">
                    <div className="container">
                        <div className="tf-main-area-page tf-page-delivery">
                            <div className="box">
                                <h4>Delivery</h4>
                                <p>All orders shipped with UPS Express.</p>
                                <p>Always free shipping for orders over US $250.</p>
                                <p>All orders are shipped with a UPS tracking number.</p>
                            </div>
                            <div className="box">
                                <h4>Returns</h4>
                                <p>Items returned within 14 days of their original shipment date in same as new condition will
                                    be eligible for a full refund or store credit.</p>
                                <p>Refunds will be charged back to the original form of payment used for purchase.</p>
                                <p>Customer is responsible for shipping charges when making returns and shipping/handling fees
                                    of original purchase is non-refundable.</p>
                                <p>All sale items are final purchases.</p>
                            </div>
                            <div className="box">
                                <h4>Help</h4>
                                <p>Give us a shout if you have any other questions and/or concerns.</p>
                                <p>Email: <a href="mailto:contact@domain.com" className="cf-mail">contact@domain.com</a></p>
                                <p>Phone: +1 (23) 456 789</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
            <Extras />
        </div>
    )
}
export default Shipping;