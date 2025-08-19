import { useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { fetchOrder,updateOrder } from '@/services/api/orders';
import useAdminStyles from '@/hooks/useAdminStyles';



const ViewAdminOrders = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
    useAdminStyles(); // ✅ dynamically manages admin styles
  const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId || location.state?.item?.id || null;
    const [order, setOrder] = useState(location.state?.item || null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
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
    useEffect(() => {
        const loadOrder = async () => {
            if (!order && orderId) {
                setLoading(true);
                const result = await fetchOrder({ id: orderId });
                if (!result.error && result.data) {
                    setOrder(result.data);
                }
                setLoading(false);
            }
        };
        loadOrder();
      }, [order, orderId]);
    
    useEffect(() => {
        if (order) {
            setFormData({ ...order });
        }
    }, [order]);
    
    const handleTrackClick = (order) => {
        navigate(`/admin/orders/${order.id}/track`, { state: { item: order } }); // navigate to tracking page
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
                                            { label: 'All Orders', href: '/admin/Orders' },
                                            { label: 'View Order' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- order-detail --> */}
                                <div className="wg-order-detail">
                                    <div className="left flex-grow">
                                        <div className="wg-box mb-20">
                                            <div className="wg-table table-order-detail">
                                                <ul className="table-title flex items-center justify-between gap20 mb-24">
                                                    <li>
                                                        <div className="body-title">All items</div>
                                                    </li>    
                                                    <li>
                                                        <div className="dropdown default">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <span className="body-title-2 flex items-center gap8">Sort<i className="h6 icon-chevron-down"></i></span>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>  
                                                                    <a href="javascript:void(0);">Name</a>
                                                                </li>
                                                                <li>  
                                                                    <a href="javascript:void(0);">Quantity</a>
                                                                </li>
                                                                <li>  
                                                                    <a href="javascript:void(0);">Price</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="flex flex-column">
                                                    {order?.products?.map((product, index)=>(
                                                        <li key={index} className="wg-product">
                                                            <div className="name">
                                                                <div className="image">
                                                                    <img src={product.img} alt=""/>
                                                                </div>
                                                                <div>
                                                                    <div className="text-tiny">Product name</div>
                                                                    <div className="title">
                                                                        <a href="#" className="body-title-2">{product.name}</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-tiny">Quantity</div>
                                                                <div className="title">
                                                                    <div className="body-title-2">{product.qty}</div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-tiny">Price</div>
                                                                <div className="title">
                                                                    <div className="body-title-2">{product.price}</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="wg-box">
                                            <div className="wg-table table-cart-totals">
                                                <ul className="table-title flex mb-24">
                                                    <li>
                                                        <div className="body-title">Cart Totals</div>
                                                    </li>    
                                                    <li>
                                                        <div className="body-title">Price</div>
                                                    </li>    
                                                </ul>
                                                <ul className="flex flex-column gap14">
                                                    <li className="cart-totals-item">
                                                        <span className="body-text">Subtotal:</span>
                                                        <span className="body-title-2">{order.subtotal}</span>
                                                    </li>
                                                    <li className="divider"></li>
                                                    <li className="cart-totals-item">
                                                        <span className="body-text">Shipping:</span>
                                                        <span className="body-title-2">{order.shipping}</span>
                                                    </li>
                                                    <li className="divider"></li>
                                                    <li className="cart-totals-item">
                                                        <span className="body-text">Tax (GST):</span>
                                                        <span className="body-title-2">{order.tax}</span>
                                                    </li>
                                                    <li className="divider"></li>
                                                    <li className="cart-totals-item">
                                                        <span className="body-title">Total price:</span>
                                                        <span className="body-title tf-color-1">{order.total}</span>
                                                    </li>
                                                  
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="wg-box mb-20 gap10">
                                            <div className="body-title">Summary</div>
                                            <div className="summary-item">
                                                <div className="body-text">Order ID</div>
                                                <div className="body-title-2">{order.id}</div>
                                            </div>
                                            <div className="summary-item">
                                                <div className="body-text">Date</div>
                                                <div className="body-title-2">{order.date}</div>
                                            </div>
                                            <div className="summary-item">
                                                <div className="body-text">Total</div>
                                                <div className="body-title-2 tf-color-1">{order.total}</div>
                                            </div>
                                        </div>
                                        <div className="wg-box mb-20 gap10">
                                            <div className="body-title">Shipping Address</div>
                                            <div className="body-text">{order.shippingAddress}</div>
                                        </div>
                                        <div className="wg-box mb-20 gap10">
                                            <div className="body-title">Payment Method</div>
                                            <div className="body-text">{order.paymentMethod}</div>
                                        </div>
                                        <div className="wg-box gap10">
                                            <div className="body-title">Expected Date Of Delivery</div>
                                            <div className="body-title-2 tf-color-2">{order.expectedDelivery}</div>
                                            <a className="tf-button style-1 w-full" href='javascript:void(0);' onClick={() => handleTrackClick(order)}><i className="icon-truck"></i>Track order</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /order-detail --> */}
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
export default ViewAdminOrders;