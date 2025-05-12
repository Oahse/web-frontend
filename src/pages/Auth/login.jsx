import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import { Link } from 'react-router-dom';
import Extras from '@/components/extra';
const Login =()=>{
    const { isMobile} = useDeviceType();
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
                        <div className="heading text-center">Login</div>
                    </div>
                </div>
                <section className="flat-spacing-10">
                    <div className="container">
                        <div className="form-register-wrap">
                            <div className="flat-title align-items-start gap-0 mb_30 px-0">
                                <h5 className="mb_18">Login</h5>
                                <p className="text_black-2"></p>
                            </div>
                            <div>
                                <form className="" id="register-form" action="#" method="post" accept-charset="utf-8"
                                    data-mailchimp="true">
                                    <div className="tf-field style-1 mb_15">
                                        <input className="tf-field-input tf-input" placeholder=" " type="email" id="property3"
                                            name="email"/>
                                        <label className="tf-field-label fw-4 text_black-2" for="property3">Email *</label>
                                    </div>
                                    <div className="tf-field style-1 mb_30">
                                        <input className="tf-field-input tf-input" placeholder=" " type="password" id="property4"
                                            name="password"/>
                                        <label className="tf-field-label fw-4 text_black-2" for="property4">Password *</label>
                                    </div>
                                    <div className="mb_20">
                                        <button type="submit"
                                            className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center">Login</button>
                                    </div>
                                    <div className="text-center">
                                        <Link to="/register" className="tf-btn btn-line">Do not have an account? Sign Up here<i
                                                className="icon icon-arrow1-top-left"></i></Link>
                                    </div>
                                </form>
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
export default Login;