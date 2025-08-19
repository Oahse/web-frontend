import React, { useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { createUser  } from "@/services/api/users";
import { convertImageToBase64 } from '@/services/helper';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import { rolePermissions } from "@/constants/permissions";
import Modal from "@/components/modal";
import useAdminStyles from '@/hooks/useAdminStyles';
const ViewAdminUsers = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[] })=>{
    useAdminStyles(); // ✅ dynamically manages admin styles
    const [formData, setFormData] = useState({active:false,permissions:[],});
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const [show, setShow]  =useState(false);
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
      
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let val = value;
    
        if (type === 'radio' && name === 'active') {
            val = value === 'true'; // Convert string to boolean
        }
    
        setFormData(prev => ({
            ...prev,
            [name]: val
        }));
    };
                
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertImageToBase64(file).then(base64 => {
            setFormData(prev => ({ ...prev, image: base64 }));
        }).catch(err => {
            console.error("Upload error:", err);
            setFormData(prev => ({ ...prev, image: file }));
        });
        }
    };
        const handleRemovePermission = (permission) => {
            setFormData(prev => ({
                ...prev,
                permissions: prev.permissions.filter(p => p !== permission)
            }));
        };
        const handleAddPermission = (permission) => {
            setFormData(prev => ({
                ...prev,
                permissions: [...prev.permissions, permission] 
            }));
        };
      
        const handleSave = async () => {
        
            try {
                const result = await createUser({ userData: formData });
        
            if (!result.error) {
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
                    <SideBar activeMenu={1}   onshowHideMenu={showHideMenu}  />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader isLoggedIn user={loggedInUser} />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div className="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div className="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div className="main-content-wrap">
                                <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>View User</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'User', href: 'javascript:void(0);' },
                                            { label: 'All Users', href: '/admin/Users' },
                                            { label: 'View User' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- form-add-User --> */}
                                <form className="form-add-new-user form-style-2">
                                    <div className="wg-box">
                                        <div className="left">
                                            <h5 className="mb-4">Account</h5>
                                            <div className="body-text">Fill in the information below to add a new account</div>
                                            <fieldset>
                                                <div className="body-title mb-10">Upload image</div>
                                                <div className="upload-image mb-16 flex-grow">
                                                    <div className="item up-load">
                                                        <label className="uploadfile h250" for="myFile">
                                                            <span className="icon">
                                                            <i className="icon-upload-cloud"></i>
                                                            </span>
                                                            <span className="body-text">Select your image <span className="tf-color">click to browse</span></span>
                                                            <img src={formData?.image} alt={formData?.title || formData?.name || 'User Image'} className="has-img"/>
                                                            <input type="file" id="myFile" name="filename" onChange={handleImageChange} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="right flex-grow">
                                            <fieldset className="name mb-24">
                                                <div className="body-title mb-10">Name</div>
                                                <input  onChange={handleInputChange} className="flex-grow" type="text" placeholder="Username" name="name" tabindex="0" value={formData?.name} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="email mb-24">
                                                <div className="body-title mb-10">Email</div>
                                                <input onChange={handleInputChange} className="flex-grow" type="email" placeholder="Email" name="email" tabindex="0" value={formData?.email} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="password mb-24">
                                                <div className="body-title mb-10">Password</div>
                                                <input onChange={handleInputChange}  className="password-input" type="password" placeholder="Enter password" name="password" tabindex="0" value={formData?.password} aria-required="true" required=""/>
                                                <span className="show-pass">
                                                    <i className="icon-eye view"></i>
                                                    <i className="icon-eye-off hide"></i>
                                                </span>
                                            </fieldset>
                                            <fieldset className="password">
                                                <div className="body-title mb-10">Confirm password</div>
                                                <input onChange={handleInputChange}  className="password-input" type="password" placeholder="Confirm password" name="confirmPassword" tabindex="0" value={formData?.confrimPassword} aria-required="true" required=""/>
                                                <span className="show-pass">
                                                    <i className="icon-eye view"></i>
                                                    <i className="icon-eye-off hide"></i>
                                                </span>
                                            </fieldset>
                                            <fieldset className="phone mb-24">
                                                <div className="body-title mb-10">Phone Number</div>
                                                <input
                                                    onChange={handleInputChange} 
                                                    className="flex-grow"
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    name="phoneNumber"
                                                    value={formData?.phoneNumber}
                                                    required
                                                />
                                                </fieldset>

                                            <fieldset className="role mb-24">
                                                <div className="body-title mb-10">Role</div>
                                                <input
                                                    onChange={handleInputChange} 
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Role"
                                                    name="role"
                                                    value={formData?.role}
                                                    required
                                                />
                                            </fieldset>

                                                

                                            <fieldset className="active mb-24">
                                                
                                                <div className="body-title mb-10">Active</div>
                                                <div className="radio-buttons">
                                                    <div className="item">
                                                        <input
                                                            type="radio"
                                                            name="active"
                                                            id="active-yes"
                                                            value={true}
                                                            checked={formData?.active === true}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label for="active-yes">
                                                            <span className="body-title-2">Active</span>
                                                        </label>
                                                    </div>
                                                    <div className="item">
                                                        <input
                                                            type="radio"
                                                            name="active"
                                                            id="active-no"
                                                            value={false}
                                                            checked={formData?.active === false}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label for="active-no">
                                                            <span className="body-title-2">Not Active</span>
                                                        </label>
                                                    </div>
                                                    </div>

                                            </fieldset>

                                            <fieldset className="age mb-24">
                                                <div className="body-title mb-10">Age</div>
                                                <input
                                                    onChange={handleInputChange} 
                                                    className="flex-grow"
                                                    type="number"
                                                    placeholder="Age"
                                                    name="age"
                                                    value={formData?.age}
                                                    required
                                                />
                                            </fieldset>

                                            <fieldset className="gender mb-24">
                                                <div className="body-title mb-10">Gender</div>
                                                <select
                                                    onChange={handleInputChange} 
                                                    className="flex-grow"
                                                    name="gender"
                                                    value={formData?.gender}
                                                    required
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                </fieldset>

                                        </div>
                                    </div>
                                    <div className="wg-box">
                                        <div className="left">
                                            <h5 className="mb-4">Permission</h5>
                                            <div className="body-text">Items that the account is allowed to edit</div>
                                        </div>
                                        <div className="right flex-grow d-flex flex-wrap gap-2">
                                            {formData?.permissions?.map((permission, index)=>(
                                                <div key={index} className="m-2">
                                                    <div
                                                        className="relative group bg-gray p-2 rounded"
                                                        style={{ position: 'relative' }}
                                                        >
                                                        {/* Image */}
                                                        <fieldset key={index} className={`${permission} mb-24`}>
                                                        
                                                            {/* <div className="body-title mb-10">{permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase()}</div> */}
                                                            <div className="radio-buttons">
                                                                <div className="item">
                                                                    <input
                                                                        type="radio"
                                                                        name={`${permission}`}
                                                                        id={`${permission}-yes`}
                                                                        value={true}
                                                                        disabled={true} 
                                                                        checked={rolePermissions.SuperAdmin?.includes(permission)}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label for={`${permission}-yes`}>
                                                                    <span
                                                                        href="javascript:void(0);"
                                                                        onClick={() => handleAddPermission(permission)}
                                                                        className="body-title-2 m-1 p-1 cursor-pointer"
                                                                        >
                                                                        {permission
                                                                            .split('_')
                                                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                            .join(' ')}
                                                                    </span>

                                                                    </label>
                                                                </div>
                                                                
                                                            </div>

                                                        </fieldset>

                                                        {/* Delete Icon with inline styles */}
                                                        <button
                                                            type="button"
                                                            // onClick={() => handleImageDelete(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                right: '95%',
                                                                color: 'red',
                                                                padding:'4px',
                                                                fontSize:'small',
                                                                opacity: 1,
                                                                transition: 'opacity 0.3s',
                                                                pointerEvents: 'auto',
                                                            }}
                                                            className="delete-icon"
                                                            onClick={()=>handleRemovePermission(permission)}
                                                        >
                                                            <i className="icon-trash-2"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            ))}
                                            
                                            <button onClick={() => setShow(prev => !prev)}  className="tf-button style-1" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="icon-plus"></i>
                                            </button>
                                            
                                            <Modal 
                                                id="choose_permissions"
                                                title='Choose Permissions'
                                                show={show}
                                                onClose={() => setShow(false)}
                                                className={`modalDemo tf-product-modal `}
                                                body={<div className="tf-rte" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                <ul className="list-unstyled">
                                                    {rolePermissions.SuperAdmin?.map((permission, index) => (
                                                            <li key={index} className="bg-light m-1 p-2 rounded">
                                                                <label className="d-flex align-items-center gap-2 w-100 m-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={formData?.permissions?.includes(permission)}
                                                                        onChange={(e) =>
                                                                            e.target.checked
                                                                            ? handleAddPermission(permission)
                                                                            : handleRemovePermission(permission)
                                                                        }
                                                                    />
                                                                    <span className="body-title-2 text-capitalize">
                                                                        {permission.replace(/_/g, ' ')}
                                                                    </span>
                                                                </label>
                                                            </li>
                                                    ))}
                                                </ul>
                                                </div>
                                                
                                                } 
                                            />
                                        </div>
                                    </div>
                                    <div className="bot">
                                            <button className="tf-button w180" type="button" onClick={handleSave}>
                                                Save
                                            </button>
                                    </div>

                                </form>
                                <ToastContainer/>
                                {/* <!-- /form-add-User --> */}
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
export default ViewAdminUsers;
