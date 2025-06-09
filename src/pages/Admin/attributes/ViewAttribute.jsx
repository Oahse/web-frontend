import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { fetchAttribute,updateAttribute } from '@/services/api/attributes';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";

import useAdminStyles from '@/hooks/useAdminStyles';



const ViewAdminAttributes = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[] })=>{
    useAdminStyles(); // ✅ dynamically manages admin styles
    const location = useLocation();
    console.log(location.state)
    const attributeId = location.state?.attributeId || location.state?.item?.id || null;
    const [attribute, setAttribute] = useState(location.state?.item || null);
    const [isEditing, setIsEditing] = useState(false);
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
        const loadAttribute = async () => {
            if (!attribute && attributeId) {
                setLoading(true);
                const result = await fetchAttribute({ id: attributeId });
                if (!result.error && result.data) {
                    setAttribute(result.data);
                }
                setLoading(false);
            }
        };
        loadAttribute();
      }, [attribute, attributeId]);
    
    useEffect(() => {
        if (attribute) {
            setFormData({ ...attribute });
        }
    }, [attribute]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = async () => {
        try {
            const result = await updateAttribute({ id: attribute.id, attributeData: formData });
        
            if (!result.error) {
                setAttribute(result.data);
                setIsEditing(false);
                // Success toast
                
                toast.success(<Toast title={result.message} subtitle='' />);
            } else {
                // Display success toast
                toast.error(<Toast title={result.error} subtitle='Something went wrong. Please try again.' />);
            }
            } catch (error) {
            // Catch any unexpected errors
            toast.error(<Toast title={error} subtitle='An error occurred. Please try again.' />);
            
            }
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
                                    <h3>View Attribute</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Attribute', href: 'javascript:void(0);' },
                                            { label: 'All Attributes', href: '/admin/Attributes' },
                                            { label: 'View Attribute' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- form-add-Attribute --> */}
                                <div className="wg-box">
                                    <form className="form-new-product form-style-1">
                                        <fieldset className="name">
                                            <div className="body-title">Attribute name</div>
                                            <input className="flex-grow" onChange={handleInputChange} type="text" placeholder="Attribute name" name="name" tabindex="0" value={formData?.name || ''} aria-required="true" required disabled={!isEditing}/>
                                        </fieldset>
                                        <fieldset className="name">
                                            <div className="body-title">Attribute value</div>
                                            <input className="flex-grow" onChange={(e) =>
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            values: e.target.value.split(',').map((val) => val.trim())
                                                                        }))
                                                                        } type="text" placeholder="Attribute value" name="values" tabindex="0" value={formData?.values?.join(', ') || ''} aria-required="true" required disabled={!isEditing}/>
                                        </fieldset>
                                        <div className="bot">
                                            {isEditing ? (
                                                <button className="tf-button w208" type="button" onClick={handleSave}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button className="tf-button w208" type="button" onClick={() => setIsEditing(true)}>
                                                    Edit
                                                </button>
                                            )}
                                            <ToastContainer/>
                                        </div>
                                    </form>
                                </div>
                                {/* <!-- /form-add-Attribute --> */}
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
export default ViewAdminAttributes;