import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra'
import { Link } from "react-router-dom";
import BreadCrumbs from '@/components/breadcrumbs';
const Faq =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title style-2">
                    <div className="container-full">
                        <div className="heading text-center">FAQ</div>
                        <BreadCrumbs
                            dir='center'
                            links={[
                                { name: 'Home', href: '/' },
                                { name: 'Faq' }
                            ]}
                            // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                            // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                            // back={{ href: '/products', tooltip: 'Back to Products' }}
                        />
                    </div>
                </div>
                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="tf-accordion-wrap d-flex justify-content-between">
                            <div className="content">
                                <h5 className="mb_24">Shopping Information</h5>
                                <div className="flat-accordion style-default has-btns-arrow mb_60">
                                    <div className="flat-toggle active">
                                        <div className="toggle-title active">Pellentesque habitant morbi tristique senectus et
                                            netus?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How much is shipping and how long will it take?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How long will it take to get my package?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">Branding is simply a more efficient way to sell things?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb_24">Payment Information</h5>
                                <div className="flat-accordion style-default has-btns-arrow mb_60">
                                    <div className="flat-toggle">
                                        <div className="toggle-title">Pellentesque habitant morbi tristique senectus et netus?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How much is shipping and how long will it take?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How long will it take to get my package?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">Branding is simply a more efficient way to sell things?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb_24">Order Returns</h5>
                                <div className="flat-accordion style-default has-btns-arrow">
                                    <div className="flat-toggle">
                                        <div className="toggle-title">Pellentesque habitant morbi tristique senectus et netus?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How much is shipping and how long will it take?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">How long will it take to get my package?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                    <div className="flat-toggle">
                                        <div className="toggle-title">Branding is simply a more efficient way to sell things?</div>
                                        <div className="toggle-content">
                                            <p>The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem
                                                vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel
                                                illum dolore eu feugiat nulla facilisis. For me, the most important part of
                                                improving at photography has been sharing it. Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box tf-other-content radius-10 bg_grey-8">
                                <h5 className="mb_20">Have a question</h5>
                                <p className="text_black-2 mb_40">If you have an issue or question that requires immediate
                                    assistance, you can click the button below to chat live with a Customer Service
                                    representative.<br/><br/>Please allow 06 - 12 business days from the time your package arrives
                                    back to us for a refund to be issued.</p>
                                <div className="d-flex gap-20 align-items-center">
                                    <Link to="/contact"
                                        className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center">Contact us</Link>
                                    <Link href="/contact" className="tf-btn btn-line">Live chat<i
                                            className="icon icon-arrow1-top-left"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
            <Extras categories={categories} />
        </div>
    )
}
export default Faq;