import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { fetchProducts, updateProduct  } from "@/services/api/products";
import { convertImageToBase64,generateColorCode } from '@/services/helper';
import DatePicker from "@/components/Date";
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';
const ViewAdminProducts = ({API_URL ,Companyname, isLoggedIn, user })=>{
  useAdminStyles(); // ✅ dynamically manages admin styles
    const location = useLocation();
      console.log(location.state)
      const productId = location.state?.productId || location.state?.item?.id || null;
      const [product, setProduct] = useState(location.state?.item || null);
      const [isEditing, setIsEditing] = useState(false);
      const [formData, setFormData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [imagePreview, setImagePreview] = useState([]);
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
          if (!product && productId) {
            setLoading(true);
            const result = await fetchProducts({ id: productId });
            if (!result.error && result.data) {
              setProduct(result.data);
            }
            setLoading(false);
          }
        };
        loadCategory();
      }, [product, productId]);
    
      useEffect(() => {
        if (product) {
          setFormData({
            name: product.name || '',
            category: product.category || '',
            price: product.price || '',
            salePrice: product.salePrice || '',
            date: product.date || '',
            brand: product.brand || '',
            color: product.color || '',
            size: product.size || '',
            sku: product.sku || '',
            stock: product.stock || '',
            tags: product.tags || '',
            description: product.description || '',
            image: product.image || '',
          });
        //   setLastImagePreview(product.image[0] || '');
          setImagePreview(product.image);
        }
      }, [product]);
      
    
      const handleInputChange = (e) => {
      
        
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          convertImageToBase64(file).then(base64 => {
            setFormData(prev => ({ ...prev, image: base64 }));
            setImagePreview(prev => [...prev, base64 || '']);
            // setLastImagePreview(base64);
          }).catch(err => {
            console.error("Upload error:", err);
            setFormData(prev => ({ ...prev, image: file }));
            setImagePreview(prev => [...prev, URL.createObjectURL(file) || '']);
            // setLastImagePreview(URL.createObjectURL(file));
          });
        }
      };
      const handleRemoveImage = (img) => {
        setImagePreview((prev) => prev.filter((item) => item !== img));
      };
      
      
      const handleSave = async () => {
      
        try {
          const result = await updateProduct({ id: product.id, productData: formData });
      
          if (!result.error) {
            setProduct(result.data);
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
                    <SideBar activeMenu={1}   onshowHideMenu={showHideMenu}  />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={user} />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div className="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div className="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div className="main-content-wrap">
                                <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>View Product</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Product', href: 'javascript:void(0);' },
                                            { label: 'All Products', href: '/admin/products' },
                                            { label: 'View Product' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- form-add-product --> */}
                                <form className="form-add-product" >
                                    
                                    <div className="wg-box mb-30">
                                        <fieldset className="name">
                                            <div className="body-title mb-10">Product title <span className="tf-color-1">*</span></div>
                                            <input disabled={!isEditing} onChange={handleInputChange} className="mb-10" type="text" placeholder="Enter title" name="text" tabindex="0" value={formData?.name || ''} aria-required="true" required="" />
                                            <div className="text-tiny text-surface-2">Do not exceed 20 characters when entering the product name.</div>
                                        </fieldset>
                                        <fieldset className="category">
                                            <div className="body-title mb-10">Category <span className="tf-color-1">*</span></div>
                                            <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Choose category" name="text" tabindex="0" value={formData?.category || ''} aria-required="true" required=""/>
                                        </fieldset>
                                        <div className="cols-lg gap22">
                                            <fieldset className="price">
                                                <div className="body-title mb-10">Price <span className="tf-color-1">*</span></div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Price" name="text" tabindex="0" value={formData?.price || ''} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="sale-price">
                                                <div className="body-title mb-10">Sale Price </div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Sale Price " name="text" tabindex="0" value={formData?.salePrice || ''} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="schedule">
                                                <div className="body-title mb-10">Schedule</div>
                                                <DatePicker
                                                    value={formData?.date || ''}
                                                    formatStr="MMM/dd/yyyy"
                                                    disabled={!isEditing}
                                                    // onChange={(val) => console.log('Selected date:', val)}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="cols-lg gap22">
                                            <fieldset className="choose-brand">
                                                <div className="body-title mb-10">Brand <span className="tf-color-1">*</span></div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Choose brand" name="text" tabindex="0" value={formData?.brand || ''} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="variant-picker-item">
                                                <div className="variant-picker-label body-title">
                                                    Color: <span className="body-title-2 fw-4 variant-picker-label-value">{formData?.color || ''}</span>
                                                </div>
                                                <div className="variant-picker-values">
                                                    {(Array.isArray(formData?.color) ? formData.color : [formData?.color]).map((color) => {
                                                        if (typeof color !== 'string') return null;

                                                        const colorId = `values-${color.toLowerCase()}`;
                                                        return (
                                                          <React.Fragment key={color}>
                                                            <input
                                                              disabled={!isEditing}
                                                              onChange={handleInputChange}
                                                              id={colorId}
                                                              type="radio"
                                                              name="color"
                                                              value={color}
                                                              checked={formData?.color === color}
                                                            />
                                                            <label
                                                              className="radius-60"
                                                              htmlFor={colorId}
                                                              data-value={color}
                                                            >
                                                              <span className={`btn-checkbox `} style={{backgroundColor:`${generateColorCode(color.toLowerCase())}`}}></span>
                                                            </label>
                                                          </React.Fragment>
                                                        );
                                                        })}
                                                    </div>

                                            </fieldset>
                                            <fieldset className="variant-picker-item">
                                                <div className="variant-picker-label body-text">
                                                    Size: <span className="body-title-2 variant-picker-label-value">S</span>
                                                </div>
                                                <div className="variant-picker-values">
                                                    {(Array.isArray(formData?.size) ? formData.size : [formData?.size]).map((size, index) => (
                                                        <React.Fragment key={index}>
                                                        <input
                                                            disabled={!isEditing}
                                                            type="radio"
                                                            name="size"
                                                            id={`values-${size}`}
                                                            value={size}
                                                            checked={formData?.selectedSize === size}
                                                            onChange={handleInputChange} // optional if you want to track selected size
                                                        />
                                                        <label className="style-text" htmlFor={`values-${size}`} data-value={size}>
                                                            <div className="text">{size}</div>
                                                        </label>
                                                        </React.Fragment>
                                                    ))}
                                                </div>

                                            </fieldset>
                                        </div>
                                        <div className="cols-lg gap22">
                                            <fieldset className="sku">
                                                <div className="body-title mb-10">SKU</div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Enter SKU" name="text" tabindex="0" value={formData?.sku || ''} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="category">
                                                <div className="body-title mb-10">Stock <span className="tf-color-1">*</span></div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Enter Stock" name="text" tabindex="0" value={formData?.stock || ''} aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="sku">
                                                <div className="body-title mb-10">Tags</div>
                                                <input disabled={!isEditing} onChange={handleInputChange} className="" type="text" placeholder="Enter a tag" name="text" tabindex="0" value={formData?.tags || ''} aria-required="true" required=""/>
                                            </fieldset>
                                        </div>
                                        <fieldset className="description">
                                            <div className="body-title mb-10">Description <span className="tf-color-1">*</span></div>
                                            <textarea disabled={!isEditing} value={formData?.description || ''} onChange={handleInputChange} className="mb-10" name="description" placeholder="Short description about product" tabindex="0" aria-required="true" required=""></textarea>
                                            <div className="text-tiny">Do not exceed 100 characters when entering the product name.</div>
                                        </fieldset>
                                    </div>
                                    <div className="wg-box mb-30">
                                        <fieldset>
                                            <div className="body-title mb-10">Upload images</div>
                                            <div className="upload-image mb-16 flex-grow">
                                                <div className="item up-load">
                                                    <label className="uploadfile h250" for="myFile">
                                                        <span className="icon">
                                                        <i className="icon-upload-cloud"></i>
                                                        </span>
                                                        <span className="body-text">Drop your images here or select <span className="tf-color">click to browse</span></span>
                                                        <img src='' alt={formData?.title || formData?.name || 'Category Image'} className="has-img"/>
                                                        <input type="file" id="myFile" name="filename" onChange={handleImageChange} disabled={!isEditing}/>
                                                    </label>
                                                </div>
                                                <div className="flex flex-wrap justify-center -mx-1">
                                                    {imagePreview.map((img, index) => (
                                                    <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 px-1 mb-2">
                                                        <div
                                                        className="relative group bg-gray-100 p-2 rounded"
                                                        style={{ position: 'relative' }}
                                                        >
                                                        {/* Image */}
                                                        <img
                                                            src={img}
                                                            alt={`Preview ${index}`}
                                                            style={{ width: '100px', height: '100px', borderRadius: '6px' }}
                                                        />

                                                        {/* Delete Icon with inline styles */}
                                                        <button
                                                            type="button"
                                                            // onClick={() => handleImageDelete(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                right: '4px',
                                                                color: 'red',
                                                                padding:'4px',
                                                                fontSize:'large',
                                                                opacity: 1,
                                                                transition: 'opacity 0.3s',
                                                                pointerEvents: 'auto',
                                                            }}
                                                            className="delete-icon"
                                                            onClick={()=>handleRemoveImage(img)}
                                                        >
                                                            <i className="icon-trash-2"></i>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    ))}

                                                </div>

                                            </div>
                                            <div className="body-text">You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</div>
                                        </fieldset>
                                    </div>
                                
                                    <div className="cols gap10">
                                        {isEditing ? (
                                            <button className="tf-button w208" type="button" onClick={handleSave}>
                                                Save
                                            </button>
                                            ) : (
                                            <button className="tf-button w208" type="button" onClick={() => setIsEditing(true)}>
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    
                                </form>
                                <ToastContainer/>
                                {/* <!-- /form-add-product --> */}
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
export default ViewAdminProducts;