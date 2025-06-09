import React, { useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';




const TrackAdminOrders = ({API_URL, adminMenu=[] ,Companyname, isLoggedIn, loggedInUser, categories=[]  })=>{
  useAdminStyles(); // ✅ dynamically manages admin styles
    const location = useLocation();
    const [order, setOrder] = useState(location.state?.item || null);
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const orderSteps = [
      { label: "Receiving orders", key: "receiving" },
      { label: "Order processing", key: "processing" },
      { label: "Being delivered", key: "delivering" },
      { label: "Delivered", key: "delivered" }
    ];
    
    const showHideMenu = (e) => {
        e.preventDefault()
        // Find the layout-wrap element
    
        var layoutWrap = document.getElementById('layout-wrap');
      
        // Toggle the full-width class based on the state
        if (isHeaderFullWidth) {
          layoutWrap.classList.remove('full-width');
          
        } else {
          layoutWrap.classList.add('full-width');
        }
      
        // Toggle the state of the full-width flag
        setIsHeaderFullWidth(!isHeaderFullWidth);
        
      };
    
    
    return(
        <div id="wrapper">
            {/* <!-- #page --> */}
            <div id="page" className="">
                {/* <!-- layout-wrap --> */}
                <div id="layout-wrap" className="layout-wrap">
                    {/* <!-- preload --> */}
                    {loading && <Preloader />} 
                    {/* <!-- /preload --> */}
                    {/* <!-- section-menu-left --> */}
                    <SideBar  activeMenu={4} onshowHideMenu={showHideMenu} />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser}  />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div className="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div className="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div className="main-content-wrap">
                                <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>{order.id}</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Order', href: 'javascript:void(0);' },
                                            { label: 'Track Order'}
                                        ]}
                                    />
                                </div>
                                
                                {/* <!-- detail --> */}
                                <div className="wg-box mb-20">
                                    <div>
                                        <h6 className="mb-10">Detail</h6>
                                        <div className="body-text">Your items is on the way. Tracking information will be available within 24 hours.</div>
                                    </div>
                                    <div className="road-map">
                                      {orderSteps.map((step, index) => {
                                        const isActive =
                                          order.currentStep &&
                                          orderSteps.findIndex(s => s.key === order.currentStep) >= index;

                                        const stepTime = order.trackingHistory?.find(event =>
                                          step.label.toLowerCase().includes(event.description.toLowerCase())
                                        )?.time || "Pending";

                                        return (
                                          <div
                                            key={index}
                                            className={`road-map-item ${isActive ? "active" : ""}`}
                                          >
                                            <div className="icon"><i className="icon-check"></i></div>
                                            <h6>{step.label}</h6>
                                            <div className="body-text">{isActive ? stepTime : "Pending"}</div>
                                          </div>
                                        );
                                      })}
                                    </div>


                                </div>
                                {/* <!-- /detail --> */}
                                {/* <!-- table --> */}
                                <div className="wg-box">
                                    <div className="wg-table table-order-track">
                                        <ul className="table-title flex mb-24 gap20">
                                            <li>
                                                <div className="body-title">Date</div>
                                            </li>    
                                            <li>
                                                <div className="body-title">Time</div>
                                            </li>    
                                            <li>
                                                <div className="body-title">Description</div>
                                            </li>   
                                            <li>
                                                <div className="body-title">Location</div>
                                            </li>   
                                        </ul>
                                        <ul className="flex flex-column gap14">
                                          {order.trackingHistory?.map((event, index) => (
                                            <React.Fragment key={index}>
                                              <li className="cart-totals-item">
                                                <div className="body-text">{event.date}</div>
                                                <div className="body-text">{event.time}</div>
                                                <div className="body-text">{event.description}</div>
                                                <div className="body-text">{event.location}</div>
                                              </li>
                                              <li className="divider"></li>
                                            </React.Fragment>
                                          ))}
                                        </ul>

                                    </div>
                                </div>
                                {/* <!-- /table -->/ */}
                            </div>
                            {/* <!-- /main-content-wrap --> */}
                        </div>
                        {/* <!-- /main-content-wrap --> */}
                        {/* <!-- bottom-page --> */}
                        <AdminFooter />
                            {/* <!-- /bottom-page --> */}
                    </div>
                        {/* <!-- /main-content --> */}
                    </div>

                </div>
                {/* <!-- /layout-wrap --> */}
            </div>
            {/* <!-- /#page --> */}
        </div>
    )
}
export default TrackAdminOrders;