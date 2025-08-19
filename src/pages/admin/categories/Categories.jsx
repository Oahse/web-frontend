import { useEffect, useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import img1 from '@/assets/images/products/product-1.jpg';
import img2 from '@/assets/images/products/product-2.jpg';
import img3 from '@/assets/images/products/product-3.jpg';
import img4 from '@/assets/images/products/product-4.jpg';
import img5 from '@/assets/images/products/product-5.jpg';
import { fetchCategories,deleteCategory  } from "@/services/api/categories";
import AdminTable from "@/components/admin/table";
import useAdminStyles from '@/hooks/useAdminStyles';



const defaultcategoryList = [
    {
      id: 1,
      title: 'Oversized Motif T-shirt',
      image: img1,
      qty: '1,638',
      description: '20',
      date: '20 Nov 2023'
    },
    {
      id: 2,
      title: 'Oversized Motif T-shirt',
      image: img2,
      qty: '1,638',
      description: '20',
      date: '20 Nov 2023'
    },
    {
      id: 3,
      title: 'Oversized Motif T-shirt',
      image: img3,
      qty: '1,638',
      description: '20',
      date: '20 Nov 2023'
    },
    {
      id: 4,
      title: 'Oversized Motif T-shirt',
      image: img4,
      qty: '1,638',
      description: '20',
      date: '20 Nov 2023'
    },
    {
      id: 5,
      title: 'Oversized Motif T-shirt',
      image: img5,
      qty: '1,638',
      description: '20',
      date: '20 Nov 2023'
    }
  ];

  
const AdminCategories = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
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

    
    const [categoryList, setCategoryList] = useState(defaultcategoryList||null);

    useEffect(() => {
        const loadCategories = async () => {
            if (!categoryList || categoryList.length === 0) {
                setLoading(true);
                const result = await fetchCategories({});
                if (!result.error && result.data) {
                setCategoryList(result.data); // assumes API returns an array of categories
                } else {
                // fallback to static list if API fails
                setCategoryList(defaultcategoryList);
                }
                setLoading(false);
            }
        };
    
        loadCategories();
      }, [categoryList]);
    
      const handleEdit = (category) => {
        console.log('Edit category', category);
        // Logic to handle editing
      };
    
      const handleDelete = (category) => {
        console.log('Delete category', category);
        // Logic to handle deleting
      };
    
      // Columns configuration
      const columns = [
        { title: 'Category', field: 'title' },
        { title: 'Qty', field: 'qty' },
        { title: 'Date Added', field: 'date' },
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
                    <SideBar activeMenu={2} onshowHideMenu={showHideMenu} />
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
                                    <h3>All Categories</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Product', href: 'javascript:void(0);' },
                                            { label: 'All Categories' }
                                        ]}
                                    />

                                </div>
                                {/* <!-- product-list --> */}
                                <div className="wg-box">
                                    
                                    <AdminTable
                                        items={categoryList}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        linkUrl={'/admin/categories/'}
                                        columns={columns} // Pass the columns configuration
                                        deletecaller = {deleteCategory}
                                    />
                                    

                                </div>
                                {/* <!-- /product-list --> */}
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
export default AdminCategories;