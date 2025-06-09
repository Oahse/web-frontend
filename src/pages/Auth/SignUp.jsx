import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import { Link } from 'react-router-dom';
import Extras from '@/components/extra';

const SignUp =({categories=[]})=>{
    const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title style-2">
                    <div className="container-full">
                        <div className="heading text-center">Register</div>
                    </div>
                </div>
                <section className="flat-spacing-10 mb_30">
                    <div className="container">
                        <div className="form-register-wrap">
                            <div className="flat-title align-items-start gap-0 mb_30 px-0">
                                <h5 className="mb_18">Register</h5>
                                <p className="text_black-2">Sign up for early Sale access plus tailored new arrivals, trends and
                                    promotions. To opt out, click unsubscribe in our emails</p>
                            </div>
                            <div>
                                <form className="" id="register-form" action="#" method="post" accept-charset="utf-8"
                                    data-mailchimp="true">
                                    <div className="tf-field style-1 mb_15">
                                        <input className="tf-field-input tf-input" placeholder=" " type="text" id="property1"
                                            name="first name"/>
                                        <label className="tf-field-label fw-4 text_black-2" for="property1">First name</label>
                                    </div>
                                    <div className="tf-field style-1 mb_15">
                                        <input className="tf-field-input tf-input" placeholder=" " type="text" id="property2"
                                            name="last name"/>
                                        <label className="tf-field-label fw-4 text_black-2" for="property2">Last name</label>
                                    </div>
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
                                            className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center">Register</button>
                                    </div>
                                    <div className="text-center">
                                        <Link to="/login" className="tf-btn btn-line">Already have an account? Log in here<i
                                                className="icon icon-arrow1-top-left"></i></Link>
                                    </div>
                                </form>
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
export default SignUp;