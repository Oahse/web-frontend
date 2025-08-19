import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Extras from '@/components/extra'
import useAuth from "@/hooks/useAuth";
import { Link } from 'react-router-dom';
const Account =({categories=[]})=>{
    const { isMobile} = useDeviceType();
    const { loading:isloading, error:iserror, user} = useAuth();
    const [loading, setLoading] = useState(isloading);
    
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">My Account</div>
                    </div>
                </div>

                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <AccountSideBar active={0}/>
                                
                            </div>
                            <div className="col-lg-9">
                                <div className="my-account-content account-dashboard">
                                    <div className="mb_60">
                                        <h5 className="fw-5 mb_20">Hello {user?.firstname} {user?.lastname}</h5>
                                        <p>
                                            From your account dashboard you can view your <Link className="text_primary"
                                                to="/account/orders">recent orders</Link>, manage your <Link
                                                className="text_primary" to="/account/address">shipping and billing
                                                address</Link>, and <Link className="text_primary" to="/account/settings">edit your
                                                password and account details</Link>.
                                        </p>
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
            
            <Extras categories={categories} active={0}/>
        </div>
    )
}
export default Account;