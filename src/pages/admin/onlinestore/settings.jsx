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


const AdminStoreSetting = ({ isLoggedIn, loggedInUser,categories=[] }) => {
    useAdminStyles(); // ✅ dynamically manages admin styles
    const location = useLocation();
    const [store, setStore] = useState(location.state?.store || null); // initial store data
    const [loading, setLoading] = useState(false);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(store || { enableCash: false,
        enableStripe: false,enablePaypal: false,enableGoogle: true,enableNewsletter: false, });

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

        if (type === 'radio' && (name === 'enableCash' ||name === 'enablePaypal' || name ==='enableStripe' || name ==='enableGoogle' || name ==='enableNewsletter')) {
            val = value === 'true'; // Convert string to boolean
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData || !formData.name || !formData.email) {
            toast.error(<Toast title="Missing Fields" subtitle="Shop Name, Email, and Company Name are required." />);
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
                        <h5 className="mb-4">Store Information</h5>
                        <div className="body-text">Setting Store & Invoice information</div>
                    </div>
                    <div className="right flex-grow">
                        <div className="cols gap24">
                            <fieldset className="mb-24">
                                <div className="body-title mb-10">Shop Name</div>
                                <input
                                    className="flex-grow"
                                    type="text"
                                    placeholder="Shop Name"
                                    name="name"
                                    value={formData?.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </fieldset>
                            <fieldset className="mb-24">
                                <div className="body-title mb-10">Company Name</div>
                                <input
                                    className="flex-grow"
                                    type="text"
                                    placeholder="Company Name"
                                    name="companyName"
                                    value={formData?.companyName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </fieldset>
                        </div>
                        <div className="cols gap24">
                            <fieldset className="mb-24">
                                <div className="body-title mb-10">Tax ID</div>
                                <input
                                    className="flex-grow"
                                    type="number"
                                    placeholder="Tax ID"
                                    name="taxId"
                                    value={formData?.taxId}
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
                        <div className="cols gap24">
                            <fieldset className="mb-24">
                                <div className="body-title mb-10">City</div>
                                <input
                                    className="flex-grow"
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={formData?.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </fieldset>
                            <fieldset className="mb-24">
                                        <div className="body-title mb-10">Zipcode</div>
                                                <input
                                                    className="flex-grow"
                                                    type="number"
                                                    placeholder="Zipcode"
                                                    name="zipcode"
                                                    value={formData?.zipcode}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="wg-box">
                                    <div className="left">
                                        <h5 className="mb-4">Payment</h5>
                                        <div className="body-text">Setting payment information</div>
                                    </div>
                                    <div className="right flex-grow">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable Cash on Delivery?</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableCash"
                                                        id="enable-cash1"
                                                        value="true"
                                                        checked={formData?.enableCash === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-cash1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableCash"
                                                        id="enable-cash2"
                                                        value="false"
                                                        checked={formData?.enableCash === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-cash2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable Stripe Payment?</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableStripe"
                                                        id="enable-stripe1"
                                                        value="true"
                                                        checked={formData?.enableStripe === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-stripe1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableStripe"
                                                        id="enable-stripe2"
                                                        value="false"
                                                        checked={formData?.enableStripe === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-stripe2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {formData?.enableStripe && <div className="cols gap24">
                                            
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Stripe Key</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter Stripe Key"
                                                    name="stripeKey"
                                                    value={formData?.stripeKey}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Stripe Secret</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter Stripe Secret"
                                                    name="stripeSecret"
                                                    value={formData?.stripeSecret}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                        </div>}
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable Paypal Payment?</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enablePaypal"
                                                        id="enable-paypal1"
                                                        value="true"
                                                        checked={formData?.enablePaypal === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-paypal1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enablePaypal"
                                                        id="enable-paypal2"
                                                        value="false"
                                                        checked={formData?.enablePaypal === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-paypal2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {formData?.enablePaypal && <div className="cols gap24">
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Paypal ID</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter Paypal ID"
                                                    name="paypalId"
                                                    value={formData?.paypalId}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset className="mb-24">
                                                <div className="body-title mb-10">Paypal Secret Key</div>
                                                <input
                                                    className="flex-grow"
                                                    type="text"
                                                    placeholder="Enter Paypal Secret Key"
                                                    name="paypalSecretKey"
                                                    value={formData?.paypalSecretKey}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </fieldset>
                                        </div>}
                                        
                                    </div>
                                </div>

                                {/* Google Analytics Section */}
                                <div className="wg-box">
                                    <div className="left">
                                        <h5 className="mb-4">Google Analytics</h5>
                                        <div className="body-text">Config Credentials for Google Analytics</div>
                                    </div>
                                    <div className="right flex-grow">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable Google Analytics?</div>
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
                                            <div className="body-title mb-10">Google API Key</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Enter your Google API Key"
                                                name="googleApiKey"
                                                value={formData?.googleApiKey}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        <div className="block-warning type-main w-full mb-24">
                                            <i className="icon-alert-octagon"></i>
                                            <a
                                                href="https://support.google.com/analytics/answer/9539598#find-G-ID"
                                                className="text"
                                            >
                                                https://support.google.com/analytics/answer/9539598#find-G-ID
                                            </a>
                                        </div>
                                        </>}
                                        
                                    </div>
                                </div>

                                {/* Newsletter Section */}
                                <div className="wg-box">
                                    <div className="left">
                                        <h5 className="mb-4">Newsletter</h5>
                                        <div className="body-text">Settings for newsletter (auto send newsletter email to SendGrid, Mailchimp... when someone register newsletter on website).</div>
                                    </div>
                                    <div className="right flex-grow">
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Enable newsletter contacts list Popup?</div>
                                            <div className="radio-buttons">
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableNewsletter"
                                                        id="enable-newsletter1"
                                                        value="true"
                                                        checked={formData?.enableNewsletter === true}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-newsletter1"><span className="body-title-2">Yes</span></label>
                                                </div>
                                                <div className="item">
                                                    <input
                                                        type="radio"
                                                        name="enableNewsletter"
                                                        id="enable-newsletter2"
                                                        value="false"
                                                        checked={formData?.enableNewsletter === false}
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                    />
                                                    <label htmlFor="enable-newsletter2"><span className="body-title-2">No</span></label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {formData?.enableNewsletter && <>
                                            <fieldset className="mb-24">
                                            <div className="body-title mb-10">Mailchimp API Key</div>
                                            <input
                                                className="flex-grow"
                                                type="text"
                                                placeholder="Enter your Mailchimp API Key"
                                                name="mailchimpApiKey"
                                                value={formData?.mailchimpApiKey}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                            />
                                        </fieldset>
                                        <fieldset className="mb-24">
                                            <div className="body-title mb-10">Email Newsletter Content</div>
                                            <textarea
                                                className="flex-grow h100"
                                                name="newsletterContent"
                                                placeholder="Short description for newsletter pop-up"
                                                value={formData?.newsletterContent}
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

export default AdminStoreSetting;
