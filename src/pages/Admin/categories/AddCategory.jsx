import { useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { createCategory } from '@/services/api/categories';
import { convertImageToBase64 } from '@/services/helper';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';




const AddAdminCategory = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
  useAdminStyles(); // ✅ dynamically manages admin styles
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
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
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
      
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Call the function to activate the event listener
        convertImageToBase64(file).then(base64 => {
          // console.log("Image base64:", base64);
          setFormData((prev) => ({ ...prev, image: base64 }));
          setImagePreview(base64);
        }).catch(err => {
          console.error("Upload error:", err);
          setFormData((prev) => ({ ...prev, image: file }));
          setImagePreview(URL.createObjectURL(file));
        });
        // console.log(formData.image,"Image base64:", imagePreview);
        
      }
    };
    
    const handleSave = async () => {
      
      try {
        const result = await createCategory({ categoryData: formData });
    
        if (!result.error) {
          // setCategory(result.data);
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
                    <SideBar  activeMenu={2} onshowHideMenu={showHideMenu} />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser}  />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div class="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div class="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div class="main-content-wrap">
                                <div class="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>Category infomation</h3>
                                    
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Category', href: 'javascript:void(0);' },
                                            { label: 'Category info' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- new-category --> */}
                                <div class="wg-box">
                                    <form class="form-new-product form-style-1" >
                                        <fieldset class="name">
                                            <div class="body-title">Category name <span class="tf-color-1">*</span></div>
                                            <input
                                                onChange={handleInputChange}
                                                className="flex-grow"
                                                type="text"
                                                placeholder={formData?.title || ''}
                                                name="title"
                                                value={formData?.title || ''}
                                                required
                                              />
                                        </fieldset>
                                        <fieldset>
                                            <div class="body-title">Upload image <span class="tf-color-1">*</span></div>
                                            <div class="upload-image flex-grow">
                                              <div class="item up-load">
                                                  <label class="uploadfile h250" for="myFile">
                                                      <span class="icon">
                                                        <i class="icon-upload-cloud"></i>
                                                      </span>
                                                      <span class="body-text">Select your image here <span class="tf-color">Click to browse</span></span>
                                                      <img src={imagePreview} alt={formData?.title || 'Category Image'} class="has-img"/>
                                                      <input type="file" id="myFile" name="filename" onChange={handleImageChange} />
                                                  </label>
                                              </div>
                                          </div>
                                        </fieldset>
                                        <fieldset >
                                            <div class="body-text">Category Description <span class="tf-color-1">*</span></div>
                                            <textarea
                                                rows={7}
                                                onChange={handleInputChange}
                                                className="flex-grow"
                                                type="text"
                                                placeholder={formData?.description || ''}
                                                name="description"
                                                value={formData?.description || ''}
                                                required
                                              />
                                        </fieldset>
                                        <div class="bot">
                                            <div></div>
                                            <button className="tf-button w208" type="button" onClick={handleSave}>
                                              Save
                                            </button>
                                            <ToastContainer/>
                                        </div>
                                    </form>
                                </div>
                                {/* <!-- /new-category --> */}
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
export default AddAdminCategory;