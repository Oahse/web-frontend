import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { fetchCategory,updateCategory } from '@/services/api/categories';
import { convertImageToBase64 } from '@/services/helper';
import DatePicker from "@/components/Date";
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';




const ViewAdminCategory = ({ API_URL, Companyname, isLoggedIn, loggedInUser,categories=[]  }) => {
  useAdminStyles(); // ✅ dynamically manages admin styles
  const location = useLocation();
  console.log(location.state)
  const categoryId = location.state?.categoryId || location.state?.item?.id || null;
  const [category, setCategory] = useState(location.state?.item || null);
  const [isEditing, setIsEditing] = useState(false);
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
  useEffect(() => {
    const loadCategory = async () => {
      if (!category && categoryId) {
        setLoading(true);
        const result = await fetchCategory({ id: categoryId });
        if (!result.error && result.data) {
          setCategory(result.data);
        }
        setLoading(false);
      }
    };
    loadCategory();
  }, [category, categoryId]);

  useEffect(() => {
    if (category) {
      setFormData({ ...category });
      setImagePreview(category.image);
    }
  }, [category]);

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
    setLoading(true); // Show loading indicator
  
    try {
      const result = await updateCategory({ id: category.id, categoryData: formData });
  
      if (!result.error) {
        setCategory(result.data);
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
      
    } finally {
      setLoading(false); // Always hide loading indicator after completion
    }
  };
  
  

  return (
    <div id="wrapper">
      <div id="page">
        <div id="layout-wrap" className="layout-wrap">
          {loading && <Preloader />}
          <SideBar  activeMenu={2} onshowHideMenu={showHideMenu} />
          <div className="section-content-right">
            <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser} />
            <div className="main-content">
              <div className="main-content-inner">
                <div className="main-content-wrap">
                  <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                    <h3>Category Information</h3>
                    <Breadcrumbs
                      items={[
                        { label: 'Dashboard', href: '/admin' },
                        { label: 'Category', href: 'javascript:void(0);' },
                        { label: 'All Categories', href: '/admin/categories' },
                        { label: 'Category Info' },
                      ]}
                    />
                  </div>
                  <div className="wg-box">
                    <form className="form-new-product form-style-1">
                      <fieldset className="name mb-20">
                        <div className="body-title">Category Name</div>
                        <input
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="flex-grow"
                          type="text"
                          placeholder={formData?.title || formData?.name || ''}
                          name="title"
                          value={formData?.title || formData?.name || ''}
                          required
                        />
                      </fieldset>

                      <fieldset className="mb-20">
                        <div className="body-title">Category Image</div>
                        <div className="upload-image">
                          {(imagePreview && !isEditing) && (
                              <img
                                src={imagePreview}
                                alt={formData?.title || 'Category Image'}
                                style={{ maxHeight: '150px' }}
                              />
                          )}
                          {isEditing && (
                            
                            <div class="upload-image flex-grow">
                                <div class="item up-load">
                                    <label class="uploadfile h250" for="myFile">
                                        <span class="icon">
                                          <i class="icon-upload-cloud"></i>
                                        </span>
                                        <span class="body-text">Drop your images here or select <span class="tf-color">click to browse</span></span>
                                        <img src={imagePreview} alt={formData?.title || 'Category Image'} class="has-img"/>
                                        <input type="file" id="myFile" name="filename" onChange={handleImageChange} disabled={!isEditing}/>
                                    </label>
                                </div>
                            </div>
                          )}
                        </div>
                      </fieldset>

                      <fieldset className="mb-20">
                        <div className="body-title">Qty</div>
                        <input
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="flex-grow"
                          type="number"
                          placeholder={formData?.qty || ''}
                          name="views"
                          value={formData?.qty || ''}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb-20">
                          <div class="body-text">Category Description</div>
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

                      <fieldset>
                        <div className="body-title">Date Added</div>
                          <DatePicker
                            value={formData?.date || ''}
                            formatStr="dd MMM yyyy"
                            disabled={!isEditing}
                            // onChange={(val) => console.log('Selected date:', val)}
                          />
                      </fieldset>
                    </form>
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

export default ViewAdminCategory;
