import { useEffect, useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import { fetchOrders, deleteOrder } from "@/services/api/orders";
import AdminTable from "@/components/admin/table";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import productImg1 from '@/assets/images/products/product-1.jpg';
import productImg2 from '@/assets/images/products/product-2.jpg';
import productImg3 from '@/assets/images/products/product-3.jpg';
import useAdminStyles from '@/hooks/useAdminStyles';


const defaultordersList = [
    {
      id: "7712309-A",
      date: "20 Nov 2023",
      price: "$1,452.500",
      products: [
        { img: productImg1, name: 'Product 1', qty: 10, price: '$19.99' },
        { img: productImg2, name: 'Product 2', qty: 5, price: '$29.99' },
        { img: productImg3, name: 'Product 3', qty: 8, price: '$24.99' }
      ],
      quantity: 1638,
      payment: 20,
      status: "Success",
      tracking: true,
      subtotal: "$70.13",
      shipping: "$10.00",
      tax: "$5.00",
      total: "$90.58",
      shippingAddress: "123 Elm Street, Springfield, IL, 62704",
      paymentMethod: "Credit Card",
      expectedDelivery: "25 Nov 2023",
      currentStep: "delivering",  // could be 'receiving', 'processing', 'delivering', or 'delivered'
      trackingHistory: [
        {
          date: "20 Nov 2023",
          time: "2:30 PM",
          description: "The sender is preparing the goods",
          location: "2715 Ash Dr. San Jose, South Dakota 83475"
        },
        {
          date: "20 Nov 2023",
          time: "01:00 PM",
          description: "The order has arrived at the post office",
          location: "3517 W. Gray St. Utica, Pennsylvania 57867"
        },
        {
          date: "21 Nov 2023",
          time: "03:58 AM",
          description: "The carrier is picking up the goods",
          location: "1901 Thornridge Cir. Shiloh, Hawaii 81063"
        },
        {
          date: "22 Nov 2023",
          time: "06:26 PM",
          description: "The order has been shipped",
          location: "4140 Parker Rd. Allentown, New Mexico 31134"
        },
        {
          date: "22 Nov 2023",
          time: "03:45 PM",
          description: "Your order will be delivered to you in 30 minutes",
          location: "8502 Preston Rd. Inglewood, Maine 98380"
        },
        {
          date: "23 Nov 2023",
          time: "12:21 AM",
          description: "The order has been delivered successfully",
          location: "3891 Ranchview Dr. Richardson, California 62639"
        }
      ]
      
    },
    {
      id: "7712309-B",
      date: "21 Nov 2023",
      price: "$1,452.500",
      products: [
        { img: productImg1, name: 'Product 1', qty: 10, price: '$19.99' },
        { img: productImg2, name: 'Product 2', qty: 5, price: '$29.99' },
        { img: productImg3, name: 'Product 3', qty: 8, price: '$24.99' }
      ],
      quantity: 1638,
      payment: 20,
      status: "Pending",
      tracking: true,
      subtotal: "$70.13",
      shipping: "$10.00",
      tax: "$5.00",
      total: "$90.58",
      shippingAddress: "456 Oak Avenue, Metropolis, NY, 10001",
      paymentMethod: "PayPal",
      expectedDelivery: "26 Nov 2023",
      currentStep: "delivering",  // could be 'receiving', 'processing', 'delivering', or 'delivered'
      trackingHistory: [
        {
          date: "20 Nov 2023",
          time: "2:30 PM",
          description: "The sender is preparing the goods",
          location: "2715 Ash Dr. San Jose, South Dakota 83475"
        },
        {
          date: "20 Nov 2023",
          time: "01:00 PM",
          description: "The order has arrived at the post office",
          location: "3517 W. Gray St. Utica, Pennsylvania 57867"
        },
        {
          date: "21 Nov 2023",
          time: "03:58 AM",
          description: "The carrier is picking up the goods",
          location: "1901 Thornridge Cir. Shiloh, Hawaii 81063"
        },
        {
          date: "22 Nov 2023",
          time: "06:26 PM",
          description: "The order has been shipped",
          location: "4140 Parker Rd. Allentown, New Mexico 31134"
        },
        {
          date: "22 Nov 2023",
          time: "03:45 PM",
          description: "Your order will be delivered to you in 30 minutes",
          location: "8502 Preston Rd. Inglewood, Maine 98380"
        },
        {
          date: "23 Nov 2023",
          time: "12:21 AM",
          description: "The order has been delivered successfully",
          location: "3891 Ranchview Dr. Richardson, California 62639"
        }
      ]
      
    },
    {
      id: "7712309-C",
      date: "22 Nov 2023",
      price: "$1,452.500",
      products: [
        { img: productImg1, name: 'Product 1', qty: 10, price: '$19.99' },
        { img: productImg2, name: 'Product 2', qty: 5, price: '$29.99' },
        { img: productImg3, name: 'Product 3', qty: 8, price: '$24.99' }
      ],
      quantity: 1638,
      payment: 20,
      status: "Success",
      tracking: true,
      subtotal: "$70.13",
      shipping: "$10.00",
      tax: "$5.00",
      total: "$90.58",
      shippingAddress: "789 Pine Road, Gotham City, NJ, 07001",
      paymentMethod: "Bank Transfer",
      expectedDelivery: "27 Nov 2023",
      currentStep: "delivering",  // could be 'receiving', 'processing', 'delivering', or 'delivered'
      trackingHistory: [
        {
          date: "20 Nov 2023",
          time: "2:30 PM",
          description: "The sender is preparing the goods",
          location: "2715 Ash Dr. San Jose, South Dakota 83475"
        },
        {
          date: "20 Nov 2023",
          time: "01:00 PM",
          description: "The order has arrived at the post office",
          location: "3517 W. Gray St. Utica, Pennsylvania 57867"
        },
        {
          date: "21 Nov 2023",
          time: "03:58 AM",
          description: "The carrier is picking up the goods",
          location: "1901 Thornridge Cir. Shiloh, Hawaii 81063"
        },
        {
          date: "22 Nov 2023",
          time: "06:26 PM",
          description: "The order has been shipped",
          location: "4140 Parker Rd. Allentown, New Mexico 31134"
        },
        {
          date: "22 Nov 2023",
          time: "03:45 PM",
          description: "Your order will be delivered to you in 30 minutes",
          location: "8502 Preston Rd. Inglewood, Maine 98380"
        },
        {
          date: "23 Nov 2023",
          time: "12:21 AM",
          description: "The order has been delivered successfully",
          location: "3891 Ranchview Dr. Richardson, California 62639"
        }
      ]
      
    },
    {
      id: "7712309-D",
      date: "23 Nov 2023",
      price: "$1,452.500",
      products: [
        { img: productImg1, name: 'Product 1', qty: 10, price: '$19.99' },
        { img: productImg2, name: 'Product 2', qty: 5, price: '$29.99' },
        { img: productImg3, name: 'Product 3', qty: 8, price: '$24.99' }
      ],
      quantity: 1638,
      payment: 20,
      status: "Success",
      tracking: true,
      subtotal: "$70.13",
      shipping: "$10.00",
      tax: "$5.00",
      total: "$90.58",
      shippingAddress: "321 Birch Blvd, Star City, CA, 90001",
      paymentMethod: "Debit Card",
      expectedDelivery: "28 Nov 2023",
      currentStep: "delivering",  // could be 'receiving', 'processing', 'delivering', or 'delivered'
      trackingHistory: [
        {
          date: "20 Nov 2023",
          time: "2:30 PM",
          description: "The sender is preparing the goods",
          location: "2715 Ash Dr. San Jose, South Dakota 83475"
        },
        {
          date: "20 Nov 2023",
          time: "01:00 PM",
          description: "The order has arrived at the post office",
          location: "3517 W. Gray St. Utica, Pennsylvania 57867"
        },
        {
          date: "21 Nov 2023",
          time: "03:58 AM",
          description: "The carrier is picking up the goods",
          location: "1901 Thornridge Cir. Shiloh, Hawaii 81063"
        },
        {
          date: "22 Nov 2023",
          time: "06:26 PM",
          description: "The order has been shipped",
          location: "4140 Parker Rd. Allentown, New Mexico 31134"
        },
        {
          date: "22 Nov 2023",
          time: "03:45 PM",
          description: "Your order will be delivered to you in 30 minutes",
          location: "8502 Preston Rd. Inglewood, Maine 98380"
        },
        {
          date: "23 Nov 2023",
          time: "12:21 AM",
          description: "The order has been delivered successfully",
          location: "3891 Ranchview Dr. Richardson, California 62639"
        }
      ]
      
    },
    {
      id: "7712309-E",
      date: "24 Nov 2023",
      price: "$1,452.500",
      products: [
        { img: productImg1, name: 'Product 1', qty: 10, price: '$19.99' },
        { img: productImg2, name: 'Product 2', qty: 5, price: '$29.99' },
        { img: productImg3, name: 'Product 3', qty: 8, price: '$24.99' }
      ],
      quantity: 1638,
      payment: 20,
      status: "Success",
      tracking: true,
      subtotal: "$70.13",
      shipping: "$10.00",
      tax: "$5.00",
      total: "$90.58",
      shippingAddress: "654 Maple Lane, Central City, TX, 73301",
      paymentMethod: "Cash on Delivery",
      expectedDelivery: "29 Nov 2023",
      currentStep: "delivering",  // could be 'receiving', 'processing', 'delivering', or 'delivered'

      trackingHistory: [
        {
          date: "20 Nov 2023",
          time: "2:30 PM",
          description: "The sender is preparing the goods",
          location: "2715 Ash Dr. San Jose, South Dakota 83475"
        },
        {
          date: "20 Nov 2023",
          time: "01:00 PM",
          description: "The order has arrived at the post office",
          location: "3517 W. Gray St. Utica, Pennsylvania 57867"
        },
        {
          date: "21 Nov 2023",
          time: "03:58 AM",
          description: "The carrier is picking up the goods",
          location: "1901 Thornridge Cir. Shiloh, Hawaii 81063"
        },
        {
          date: "22 Nov 2023",
          time: "06:26 PM",
          description: "The order has been shipped",
          location: "4140 Parker Rd. Allentown, New Mexico 31134"
        },
        {
          date: "22 Nov 2023",
          time: "03:45 PM",
          description: "Your order will be delivered to you in 30 minutes",
          location: "8502 Preston Rd. Inglewood, Maine 98380"
        },
        {
          date: "23 Nov 2023",
          time: "12:21 AM",
          description: "The order has been delivered successfully",
          location: "3891 Ranchview Dr. Richardson, California 62639"
        }
      ]
      
    }
  ];
  
const AdminOrders = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
  useAdminStyles(); // ✅ dynamically manages admin styles
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
    
        
    const [orderList, setorderList] = useState(defaultordersList||null);
    
    useEffect(() => {
        const loadorders = async () => {
            if (!orderList || orderList.length === 0) {
                setLoading(true);
                const result = await fetchOrders({});
                if (!result.error && result.data) {
                    setorderList(result.data); // assumes API returns an array of categories
                } else {
                // fallback to static list if API fails
                    setorderList(defaultordersList);
                }
                setLoading(false);
            }
        };
    
        loadorders();
        }, [orderList]);
    
        const handleEdit = (order) => {
        console.log('Edit order', order);
        // Logic to handle editing
        };
    
        const handleDelete = (order) => {
        console.log('Delete order', order);
        // Logic to handle deleting
        };
    
        // Columns configuration
        const columns = [
            { title: 'Order ID', field: 'id' },
            { title: 'Price', field: 'price' },
            { title: 'Quantity', field: 'quantity' },
            { title: 'Payment', field: 'payment' },
            { title: 'Status', field: 'status' },
            { title: 'Tracking', field: 'tracking' },
          ];
          
    

    
    
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
                                    <h3>All orders</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'order', href: 'javascript:void(0);' },
                                            { label: 'All orders' }
                                        ]}
                                    />

                                </div>
                                {/* <!-- order-list --> */}
                                <div className="wg-box">
                                    <AdminTable
                                        items={defaultordersList}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        linkUrl={'/admin/orders/'}
                                        columns={columns} // Pass the columns configuration
                                        deletecaller = {deleteOrder}
                                    />
                                </div>
                                {/* <!-- /order-list --> */}
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
export default AdminOrders;