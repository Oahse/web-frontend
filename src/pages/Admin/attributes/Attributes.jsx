import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import { fetchAttributes,deleteAttribute  } from "@/services/api/attributes";
import AdminTable from "@/components/admin/table";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import useAdminStyles from '@/hooks/useAdminStyles';


const defaultattributesList = [
    {
      id: 1,
      name: "Color",
      values: ["Blue", "Green", "White"]
    },
    {
      id: 2,
      name: "Size",
      values: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Material",
      values: ["Cotton", "Polyster"]
    },
    {
      id: 4,
      name: "Style",
      values: ["Classic", "Modern", "Ethnic", "Western"]
    },
    {
      id: 5,
      name: "Meat Type",
      values: ["Fresh", "Frozen", "Marinated"]
    },
    {
      id: 6,
      name: "Weight",
      values: ["1kg", "2kg", "3kg", "Over 5kg"]
    },
    {
      id: 7,
      name: "Packaging",
      values: ["Plastic box", "Paper", "Nylon", "Tin cans"]
    },
    {
      id: 8,
      name: "Kind of food",
      values: ["Dried food", "Wet food", "Supplementary food"]
    },
    {
      id: 9,
      name: "Milk",
      values: ["Formula milk", "Fresh milk"]
    },
    {
      id: 10,
      name: "Combo",
      values: ["Cat food", "Dog food"]
    }
  ];
  

const AdminAttributes = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
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
    
        
    const [attributeList, setAttributeList] = useState(defaultattributesList||null);
    
    useEffect(() => {
        const loadAttributes = async () => {
            if (!attributeList || attributeList.length === 0) {
                setLoading(true);
                const result = await fetchAttributes({});
                if (!result.error && result.data) {
                    setAttributeList(result.data); // assumes API returns an array of categories
                } else {
                // fallback to static list if API fails
                    setAttributeList(defaultattributesList);
                }
                setLoading(false);
            }
        };
    
        loadAttributes();
        }, [attributeList]);
    
        const handleEdit = (attribute) => {
        console.log('Edit attribute', attribute);
        // Logic to handle editing
        };
    
        const handleDelete = (attribute) => {
        console.log('Delete attribute', attribute);
        // Logic to handle deleting
        };
    
        // Columns configuration
        const columns = [
            { title: 'Category', field: 'name' },
            { title: 'Values', field: 'values' },
            { title: '', field: 'date' },
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
                    <SideBar  activeMenu={3} onshowHideMenu={showHideMenu} />
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
                                    <h3>All Attributes</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Attribute', href: 'javascript:void(0);' },
                                            { label: 'All Attributes' }
                                        ]}
                                    />

                                </div>
                                {/* <!-- Attribute-list --> */}
                                <div className="wg-box">
                                    <AdminTable
                                        items={defaultattributesList}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        linkUrl={'/admin/attributes/'}
                                        columns={columns} // Pass the columns configuration
                                        deletecaller = {deleteAttribute}
                                    />
                                </div>
                                {/* <!-- /Attribute-list --> */}
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
export default AdminAttributes;