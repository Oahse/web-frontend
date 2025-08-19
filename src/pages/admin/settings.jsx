import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { updateStore } from "@/services/api/stores";
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';

const AdminSetting = ({ isLoggedIn, loggedInUser,categories=[] }) => {
    useAdminStyles(); // ✅ dynamically manages admin styles
    const location = useLocation();
    const [store, setStore] = useState(location.state?.store || null); // initial store data
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(store || { enableGoogle: true,enableFaceBook: false, });

    const showHideMenu = (e) => {
        e.preventDefault();
        var layoutWrap = document.getElementById('layout-wrap');
        if (isHeaderFullWidth) {
            layoutWrap.classList.remove('full-width');
        } else {
            layoutWrap.classList.add('full-width');
        }
        setIsHeaderFullWidth(!isHeaderFullWidth);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val = value;

        if (type === 'radio' && (name ==='enableGoogle' || name ==='enableFaceBook')) {
            val = value === 'true'; // Convert string to boolean
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData || !formData.firstName || !formData.lastName || !formData.role || !formData.contact || !formData.email || !formData.address) {
            toast.error(<Toast title="Missing Fields" subtitle="All required fields must be filled in." />);
            return;
        }
        

        try {
            const result = await updateStore({ id: formData.id, formData });
            
            if (!result.error) {
                toast.success(<Toast title={result.message} subtitle="" />);
            } else {
                toast.error(<Toast title={result.error} subtitle="Something went wrong. Please try again." />);
            }
        } catch (error) {
            toast.error(<Toast title={error} subtitle="An error occurred. Please try again." />);
        }
    };

    return (
        <div id="wrapper">
            <div id="page" className="">
                <div id="layout-wrap" className="layout-wrap">
                    {loading && <Preloader />}
                    <SideBar activeMenu={1} onshowHideMenu={showHideMenu} />
                    <div className="section-content-right">
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser} />
                        <div className="main-content">
                            <div className="main-content-inner">
                                <div className="main-content-wrap">
                                    <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                        <h3>Store Setting</h3>
                                        <Breadcrumbs
                                            items={[
                                                { label: 'Dashboard', href: '/admin' },
                                                { label: 'Online Store', href: '/' },
                                                { label: 'Store Setting' }
                                            ]}
                                        />
                                    </div>
                                    <form className="form-setting form-style-2" onSubmit={handleSubmit}>
                                        {/* Store Information Section */}
                                <div className="wg-box">
                                    <div className="left">
                                        <h5 className="mb-4">General Information</h5>
                                        <div className="body-text">Setting General information</div>
                                    </div>
                                    <div className="right flex-grow">
                                    <div className="cols gap24">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">First Name</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="First Name"
                                                name="first"
                                                value={formData?.firstName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Middle Name</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Middle Name"
                                                name="middle"
                                                value={formData?.middleName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Last Name</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={formData?.lastName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="cols gap24">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Role</div>
                                            <input
                                                className="flex-grow"
                                                type="number"
                                                placeholder="Role"
                                                name="role"
                                                value={formData?.role}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Contact</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Contact"
                                                name="contact"
                                                value={formData?.contact}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="cols gap24">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Email</div>
                                            <input
                                                className="flex-grow"
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={formData?.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Address</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Address"
                                                name="address"
                                                value={formData?.address}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                    </div>
                        
                                    </div>
                                </div>


                                {/* Login */}
                                <div className="wg-box">
                                    <div className="left">
                                        <h5 className="mb-4">Login</h5>
                                        <div className="body-text">Setting Login information</div>
                                    </div>
                                    <div className="right flex-grow">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable Google Login?</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableGoogle"
                                                        id="enable-google1"
                                                        value="true"
                                                        checked={formData?.enableGoogle === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-google1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableGoogle"
                                                        id="enable-google2"
                                                        value="false"
                                                        checked={formData?.enableGoogle === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-google2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {formData?.enableGoogle && <>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Google Login Id</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter your Google Login Id"
                                                    name="googleLoginId"
                                                    value={formData?.googleLoginId}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Google Secret Key</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter your Google Secret Key"
                                                    name="googleSecretKey"
                                                    value={formData?.googleSecretKey}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                        </>}
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable FaceBook Login</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableFaceBook"
                                                        id="enable-facebook1"
                                                        value="true"
                                                        checked={formData?.enableFaceBook === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-google1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableFaceBook"
                                                        id="enable-facebook2"
                                                        value="false"
                                                        checked={formData?.enableFaceBook === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-google2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {formData?.enableFaceBook && <>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">FaceBook Id</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter your FaceBook Id"
                                                    name="faceBookId"
                                                    value={formData?.faceBookId}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">FaceBook Secret Key</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter your FaceBook Secret Key"
                                                    name="faceBookSecretKey"
                                                    value={formData?.faceBookSecretKey}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                        </>}
                                        
                                    </div>
                                </div>

                                
                                        <div className="cols gap10">
                                            {isEditing ? (
                                                <button className="tf-button w180" type="submit">Update</button>
                                            ) : (
                                                <button 
                                                    className="tf-button w180" 
                                                    type="button" 
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                    <ToastContainer />
                                </div>
                            </div>
                            <AdminFooter />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSetting;
