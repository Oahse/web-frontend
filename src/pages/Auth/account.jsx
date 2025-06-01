import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Extras from '@/components/extra'
const Account =()=>{
    const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
    const navLinks = [
        {
          "href": "my-account-dashboard.html",
          "active": true,
          "name": "Dashboard"
        },
        {
          "href": "my-account-orders.html",
          "active": false,
          "name": "Orders"
        },
        {
          "href": "my-account-address.html",
          "active": false,
          "name": "Address"
        },
        {
          "href": "my-account-edit.html",
          "active": false,
          "name": "Account Details"
        },
        {
          "href": "my-account-wishlist.html",
          "active": false,
          "name": "Wishlist"
        },
        {
          "href": "login.html",
          "active": false,
          "name": "Logout"
        }
    ]
      
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
                                <AccountSideBar />
                                
                            </div>
                            <div className="col-lg-9">
                                <div className="my-account-content account-dashboard">
                                    <div className="mb_60">
                                        <h5 className="fw-5 mb_20">Hello Themesflat</h5>
                                        <p>
                                            From your account dashboard you can view your <a className="text_primary"
                                                href="my-account-orders.html">recent orders</a>, manage your <a
                                                className="text_primary" href="my-account-address.html">shipping and billing
                                                address</a>, and <a className="text_primary" href="my-account-edit.html">edit your
                                                password and account details</a>.
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
            <Extras />
        </div>
    )
}
export default Account;