import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Extras from '@/components/extra';
import BreadCrumbs from '@/components/breadcrumbs';

const AccountDetails =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
      
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">Account Details</div>
                        <BreadCrumbs
                            dir='center'
                            links={[
                                { name: 'Home', href: '/' },
                                { name: 'Account', href: '/account' },
                                { name: 'Details' }
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
                                <AccountSideBar active={3}/>
                            </div>
                            <div className="col-lg-9">
                                <div className="my-account-content account-edit">
                                    <div className="">
                                        <form className="" id="form-password-change" action="#">
                                            <div className="tf-field style-1 mb_15">
                                                <input className="tf-field-input tf-input" placeholder=" " type="text"
                                                    id="property1" name="first name"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property1">First
                                                    name</label>
                                            </div>
                                            <div className="tf-field style-1 mb_15">
                                                <input className="tf-field-input tf-input" placeholder=" " type="text"
                                                    id="property2" name="last name"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property2">Last
                                                    name</label>
                                            </div>
                                            <div className="tf-field style-1 mb_15">
                                                <input className="tf-field-input tf-input" placeholder=" " type="email"
                                                    id="property3" name="email"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property3">Email</label>
                                            </div>
                                            <h6 className="mb_20">Password Change</h6>
                                            <div className="tf-field style-1 mb_30">
                                                <input className="tf-field-input tf-input" placeholder=" " type="password"
                                                    id="property4" name="password"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property4">Current
                                                    password</label>
                                            </div>
                                            <div className="tf-field style-1 mb_30">
                                                <input className="tf-field-input tf-input" placeholder=" " type="password"
                                                    id="property5" name="password"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property5">New
                                                    password</label>
                                            </div>
                                            <div className="tf-field style-1 mb_30">
                                                <input className="tf-field-input tf-input" placeholder=" " type="password"
                                                    id="property6" name="password"/>
                                                <label className="tf-field-label fw-4 text_black-2" for="property6">Confirm
                                                    password</label>
                                            </div>
                                            <div className="mb_20">
                                                <button type="submit"
                                                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center">Save
                                                    Changes</button>
                                            </div>
                                        </form>
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
            
            <Extras categories={categories}  active={3}/>
        </div>
    )
}
export default AccountDetails;