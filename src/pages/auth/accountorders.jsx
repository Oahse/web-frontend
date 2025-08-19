// import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Table from '../../components/table';
import Extras from '@/components/extra';
import BreadCrumbs from '@/components/breadcrumbs';

const AccountOrders =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    const columns = [
        { key: "id", label: "Order" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
        { key: "total", label: "Total" },
        { key: "actions", label: "Actions" },
    ];
    
    const orders = [
        {
            id: "#123",
            date: "August 1, 2024",
            status: "On hold",
            total: "$200.0",
            items: 1,
            link: "my-account-orders-details.html",
        },
        {
            id: "#345",
            date: "August 2, 2024",
            status: "Completed",
            total: "$300.0",
            items: 2,
            link: "my-account-orders-details.html",
        },
        {
            id: "#567",
            date: "August 3, 2024",
            status: "Pending",
            total: "$150.0",
            items: 1,
            link: "my-account-orders-details.html",
        },
        {
            id: "#789",
            date: "August 4, 2024",
            status: "Cancelled",
            total: "$0.0",
            items: 0,
            link: "my-account-orders-details.html",
        },
        {
            id: "#910",
            date: "August 5, 2024",
            status: "On hold",
            total: "$500.0",
            items: 3,
            link: "my-account-orders-details.html",
        },
        {
            id: "#1112",
            date: "August 6, 2024",
            status: "Completed",
            total: "$420.0",
            items: 2,
            link: "my-account-orders-details.html",
        },
    ];
    
    
      
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
                                { name: 'Orders' }
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
                                <div className="my-account-content account-order">
                                    <div className="wrap-account-order">
                                        <Table columns={columns} orders={orders} />

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
export default AccountOrders;