
import { useEffect, useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import { fetchUsers, deleteUser  } from "@/services/api/users";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import AdminTable from "@/components/admin/table";
import img1 from '@/assets/images/brand/brand-01.png';
import img2 from '@/assets/images/brand/brand-02.png';
import img3 from '@/assets/images/brand/brand-03.png';
import img4 from '@/assets/images/brand/brand-04.png';
import img5 from '@/assets/images/brand/brand-05.png';
import useAdminStyles from '@/hooks/useAdminStyles';
import { formatDateValue } from "@/services/helper";

const defaultUserList = [
    {
      id: 1,
      image: img1,
      name: "John A. Doe",
      phoneNumber: "+1-202-555-0143",
      email: "john.doe@example.com",
      role: "Admin",
      permissions: ["view_orders", "manage_products", "edit_users"],
      created_at: formatDateValue("2024-01-15T08:23:45Z"),
      updated_at: formatDateValue("2024-04-10T13:44:21Z"),
      active: true,
      age: 34,
      gender: "Male"
    },
    {
      id: 2,
      image: img2,
      name: "Emily B. Stone",
      phoneNumber: "+1-303-555-0198",
      email: "emily.stone@example.com",
      role: "Customer",
      permissions: ["view_products", "place_orders"],
      created_at: formatDateValue("2023-09-12T10:10:00Z"),
      updated_at: formatDateValue("2024-02-01T11:21:00Z"),
      active: true,
      age: 28,
      gender: "Female"
    },
    {
      id: 3,
      image: img3,
      name: "Carlos Ramirez",
      phoneNumber: "+44-789-555-1174",
      email: "carlos.ramirez@example.com",
      role: "Driver",
      permissions: ["view_deliveries", "update_delivery_status"],
      created_at: formatDateValue("2024-03-02T15:33:19Z"),
      updated_at: formatDateValue("2024-03-28T08:47:00Z"),
      active: true,
      age: 41,
      gender: "Male"
    },
    {
      id: 4,
      image: img4,
      name: "Sophia L. Nguyen",
      phoneNumber: "+61-490-555-0821",
      email: "sophia.nguyen@example.com",
      role: "Support",
      permissions: ["view_tickets", "respond_tickets"],
      created_at: formatDateValue("2023-07-18T12:00:00Z"),
      updated_at: formatDateValue("2024-05-01T10:15:00Z"),
      active: false,
      age: 30,
      gender: "Female"
    },
    {
      id: 5,
      image: img5,
      name: "Mohammed I. Al-Karim",
      phoneNumber: "+971-50-555-3344",
      email: "mohammed.alkarim@example.com",
      role: "Manager",
      permissions: ["view_reports", "manage_staff", "edit_settings"],
      created_at: formatDateValue("2022-11-25T09:20:00Z"),
      updated_at: formatDateValue("2024-01-10T14:05:00Z"),
      active: true,
      age: 39,
      gender: "Male"
    }
  ];
  

const AdminUsers = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[] })=>{
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

    
    const [UserList, setUserList] = useState(defaultUserList||null);
    
    useEffect(() => {
        const loadUsers = async () => {
            if (!UserList || UserList.length === 0) {
                setLoading(true);
                const result = await fetchUsers({});
                if (!result.error && result.data) {
                    setUserList(result.data); // assumes API returns an array of Users
                } else {
                // fallback to static list if API fails
                    setUserList(defaultUserList);
                }
                setLoading(false);
            }
        };
    
        loadUsers();
        }, [UserList]);
    
        const handleEdit = (User) => {
            console.log('Edit User', User);
            // Logic to handle editing
        };
    
        const handleDelete = (User) => {
            console.log('Delete User', User);
            // Logic to handle deleting
        };
    
        // Columns configuration
        const columns = [
            { title: 'User', field: 'name' },
            { title: 'Phone', field: 'phoneNumber' },
            { title: 'Email', field: 'email' }, // make sure `email` exists in the data
            { title: 'Role', field: 'role' },
            { title: 'Created Date', field: 'created_at' }
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
                    <SideBar activeMenu={5}  onshowHideMenu={showHideMenu} />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn user />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div className="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div className="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div className="main-content-wrap">
                                <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>All Users</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Users', href: 'javascript:void(0);' },
                                            { label: 'All Users' }
                                        ]}
                                    />

                                </div>
                                <div className="wg-box">
                                    <AdminTable
                                        items={UserList}
                                        showImages={false}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        linkUrl={'/admin/users/'}
                                        columns={columns} // Pass the columns configuration
                                        deletecaller = {deleteUser}
                                    />
                                </div>
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
export default AdminUsers;
