import { useState } from "react";
import DropDown from '@/components/admin/DropDown';
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { createProduct } from '@/services/api/products';
import { convertImageToBase64,formatToMMMDDYYYY } from '@/services/helper';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';
import { uploadMultipleFiles, deleteMultipleFiles } from "@/services/github";


const AddAdminProducts = ({ API_URL, Companyname, isLoggedIn, loggedInUser,categories=[]  }) => {
    useAdminStyles(); // ✅ dynamically manages admin styles
    // const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
            name:'',
            category: null,
            discountEndDate: '',
            variants: [],
            dateAdded: '',
            brand: '',
            tags: '',
            description: '',
            images: ''
          });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [githubImages, setGithubImages] = useState([]);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL'];
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
            handleFormDataChange(name, value);                                                                          
          };

    const handleFormDataChange = (name, value) => {
      console.log({ name, value })
      setFormData((prev) => ({ ...prev, [name]: value }));                                                                          
    };
    const handleVariantChange = (index, name, value) => {
      console.log({ name, value })
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((v, i) =>
          i === index ? { ...v, [name]: value } : v
        ),
      }));
    };
    
        
    const handleImageChange = async (e) => {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: files })); // Just store files

      // Optional: Generate previews
      const base64Previews = await Promise.all(
        files.map(file => convertImageToBase64(file).catch(() => URL.createObjectURL(file)))
      );
      setImagePreview(base64Previews);
    };

    const handleRemoveImage = (img) => {
      setFormData(prev => ({ ...prev, images: prev.images.filter(item => item !== img) }));
      
      setImagePreview((prev) => prev.filter((item) => item !== img));
    };
  
    const handleSave = async () => {
        if (
            !formData.name ||
            !formData.category ||
            !formData.discountEndDate ||
            !formData.variants ||
            !formData.dateAdded ||
            !formData.brand ||
            !formData.tags ||
            !formData.description ||
            !formData.images ||
            !formData.suppliers
          ) {
            toast.error(<Toast title="Validation Error" subtitle="Please fill out all required fields." />);
            return;
          }
          
  
      try {
        // Upload images to GitHub
        const uploadedResults = await uploadMultipleFiles(formData.images, formData.category);
        
        const failedUploads = uploadedResults.filter(res => !res?.url);
        if (failedUploads.length > 0) {
            failedUploads.forEach(res => {
                toast.error(<Toast title="Upload error" subtitle={res?.error?.message || String(res?.error) || "Unknown error"} />);
            });
          return; // Don't submit product if uploads failed
        }
        const githubPaths = uploadedResults.filter(res => res?.githubPath);
        setGithubImages(githubPaths)
        // Update image URLs
        const imageUrls = uploadedResults.map(res => res.url);
    
        const result = await createProduct({ productData: {
              ...formData,
              images: imageUrls
            } });
  
        if (!result.error) {
          // setFormData(result.data);
          toast.success(<Toast title={result.message} subtitle="" />);
        } else {
          await deleteMultipleFiles(githubPaths);
          toast.error(<Toast title={result.error} subtitle="Something went wrong. Please try again." />);
        }
        
      } catch (error) {
        toast.error(<Toast title="An error occurred. Please try again." subtitle={error} />);
      } 
    };
    const chunkArray = (arr, size) => {
          const chunks = [];
          for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
          }
          return chunks;
        };
    const [activeVariant, setActiveVariant] = useState(true);
    const [productCategories, setProductCategories] = useState([
      { id: '1', name: 'Cat Supplies' },
      { id: '2', name: "Dog Food"},
      { id: '3', name: "Dog Toys" },
      { id: '4', name: "Bird Care" },
      { id: '5', name: 'Reptile Supplies' },
      { id: '6', name: 'Small Pet Supplies' },
      { id: '7', name: "Fish Food" },
      { id: '8', name: 'Pet Toys' },
      { id: '9', name: 'Pet Grooming' },
      { id: '10', name: 'Pet Bedding' },
      { id: '11', name: 'Pet Health & Wellness' },
      { id: '12', name: 'Pet Training Supplies' },
      { id: '13', name: 'Pet Carriers & Travel' },
      { id: '14', name: 'Pet Cleaning & Waste' },
      { id: '15', name: 'Reptile Accessories' }
    ]);
  
    
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
                    <SideBar activeMenu={1} onshowHideMenu={showHideMenu} />
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
                                    <h3>Add Product</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Product', href: 'javascript:void(0);' },
                                            { label: 'Add Products' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- form-add-product --> */}
                                <form className="form-add-product" >
                                  
                                  <div className="wg-box mb-30">
                                      <fieldset className="name">
                                          <div className="body-title mb-10">Product title <span className="tf-color-1">*</span></div>
                                          <input  onChange={handleInputChange} className="mb-10" type="text" placeholder="Enter title" name="name" tabindex="0" value={formData?.name || ''} aria-required="true" required="" />
                                          <div className="text-tiny text-surface-2">Do not exceed 20 characters when entering the product name.</div>
                                      </fieldset>
                                      <fieldset className="category">
                                          <div className="body-title  mb-10">Product Category <span className="tf-color-1">*</span></div>
                                          <DropDown
                                            isImage={false}
                                            dropdownbtn={
                                                <div
                                                    className="dropdown-toggle w-100 date"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                <input  readOnly className="w-100" type="text" placeholder="Choose category" name="category" tabindex="0" value={formData?.category || ''} aria-required="true" required=""/>
                                                
                                                </div>
                                                
                                            }
                                            content=
                                            {
                                              <div className="p-3" style={{maxHeight:'400px', overflowY:'auto'}}>
                                                  {productCategories.map((item, index) => (
                                                      <div key={item.id || index} disabled={true} 
                                                        className={`mt-4 mx-4  tf-btn  select-item ${item.name === formData?.category ? "bg-success text-white" : ""}`} 
                                                        role="button"
                                                        tabindex="0" 
                                                        onClick={()=>handleFormDataChange('category', item.name)}
                                                        style={{ cursor: 'pointer' }}
                                                        >{item.name}</div>
                                                      
                                                  ))}
                                              </div>
                                            }
                                          />
                                      </fieldset>
                                      {formData.category 
                                      && 
                                      <fieldset>
                                          <div className="body-title mb-10">Upload images</div>
                                          <div className="upload-image mb-16 flex-grow">
                                              
                                              <div className="cols gap10 d-flex justify-content-between">
                                                    <div className="item up-load">
                                                      <label className="uploadfile h250" for="myFile">
                                                          <span className="icon">
                                                          <i className="icon-upload-cloud"></i>
                                                          </span>
                                                          <span className="body-text">Select your images <span className="tf-color">click to browse</span></span>
                                                          <img src='' alt={formData?.title || formData?.name || 'Category Image'} className="has-img"/>
                                                          <input type="file" id="myFile" name="filename" onChange={handleImageChange} />
                                                      </label>
                                                  </div>
                                                  <button className="tf-button w208 m-2" type="button" onClick={handleSave}>
                                                    Save
                                                  </button>
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
                                      </fieldset>}
                                      <fieldset className="variants">
                                            {/* <div className="body-title mb-10">Variants <span className="tf-color-1">*</span></div> */}
                                            <div className="flat-accordion style-default has-btns-arrow mb_60">
                                                <div
                                                        className={`flat-toggle ${activeVariant ? 'active' : ''}`}
                                                    >
                                                        <div className="d-flex align-items-center justify-content-between">
                                                              <div
                                                                  className={`toggle-title ${activeVariant ? 'active' : ''} flex-grow-1`}
                                                                  onClick={() => setActiveVariant(!activeVariant)}
                                                                >
                                                                  Variants
                                                                  <span className="toggle-icon">
                                                                    <i className="icon-chevron-down" ></i>
                                                                  </span>
                                                                  
                                                              </div>
                                                              <span className="tf-btn ms-4 bg-success text-white">
                                                                    <i className="icon-plus" ></i>
                                                              </span>
                                                        </div>
                                                        <div
                                                            className={`toggle-content ${activeVariant ? 'active' : ''}`}
                                                            style={{ display: activeVariant ? 'block' : 'none', transition: 'all 0.2s ease' }}
                                                        >
                                                            <div>
                                                              {formData?.variants.map((variant, index) => (
                                                                <div key={index} className="variant-section mb-4 border rounded-4 p-4">
                                                                  {chunkArray(Object.entries(variant), 3).map((group, groupIndex) => (
                                                                    <div key={groupIndex} className="cols-lg gap22 d-flex">
                                                                      {group.map((entry, keyIndex) =>
                                                                        entry[0] === "size" ? (
                                                                          <fieldset key={keyIndex} className={`variant-picker-item ${entry[0]}`}>
                                                                            
                                                                            <div className="variant-picker-label body-text">
                                                                                Size: <span className="body-title-2 variant-picker-label-value">{entry[1].label}</span>
                                                                            </div>
                                                                            <div className="variant-picker-values">
                                                                                {sizes.map(size => (
                                                                                  <React.Fragment key={size}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name={`size-${index}`} // unique per variant
                                                                                        id={`values-${size.toLowerCase()}-${index}`}
                                                                                        checked={entry[1].label === size}
                                                                                        onChange={() => {
                                                                                          const updatedVariants = [...formData.variants];
                                                                                          updatedVariants[index].size.label = size;
                                                                                          setFormData((prev) => ({ ...prev, variants: updatedVariants }));
                                                                                        }}
                                                                                    
                                                                                        
                                                                                      />
                                                                                      <label
                                                                                        className="style-text"
                                                                                        htmlFor={`values-${size.toLowerCase()}-${index}`}
                                                                                        data-value={size}
                                                                                      >
                                                                                        <div className="text">{size}</div>
                                                                                      </label>

                                                                                  </React.Fragment>
                                                                                ))}
                                                                              </div>
                                                                          </fieldset>
                                                                        
                                                                        ) : (
                                                                          <>
                                                                          { entry[0] === 'suppliers'?
                                                                            <fieldset className="name">
                                                                              <div className="body-title  mb-10">Suppliers <span className="tf-color-1">*</span></div>
                                                                              <DropDown
                                                                                  isImage={false}
                                                                                  dropdownbtn={
                                                                                      <div
                                                                                          className="dropdown-toggle w-100 date"
                                                                                          data-bs-toggle="dropdown"
                                                                                          aria-haspopup="true"
                                                                                          aria-expanded="false"
                                                                                      >
                                                                                      <input  readOnly className="" type="text" placeholder={entry[1].length || ''} name="suppliers" tabindex="0" value={entry[1].length || ''} aria-required="true" required=""/>
                                                                                      
                                                                                      </div>
                                                                                      
                                                                                  }
                                                                                  
                                                                                  content=
                                                                                  { entry[1].length &&
                                                                                    <div className="p-3" style={{maxHeight:'400px', overflowY:'auto'}}>
                                                                                        {entry[1].map((item, index) => (
                                                                                            <div key={index} disabled={true} 
                                                                                              className={`mt-4 mx-4 tf-btn  select-item   bg-success text-white`} 
                                                                                              role="button"
                                                                                              // onClick={()=>handleFormDataChange('category', item.name)}
                                                                                              style={{ cursor: 'pointer' }}
                                                                                              >{item}</div>
                                                                                            
                                                                                        ))}
                                                                                    </div>
                                                                                  }
                                                                              />
                                                                            </fieldset>
                                                                            :
                                                                            <fieldset key={keyIndex} className={entry[0]}>
                                                                            <div className="body-title mb-10">
                                                                              {entry[0]} <span className="tf-color-1">*</span>
                                                                            </div>
                                                                            {entry[0]?.toLowerCase().includes('date') ? 
                                                                            <DatePicker
                                                                              value={formatToMMMDDYYYY(formData?.discountEndDate) || ''}
                                                                              formatStr="MMM/dd/yyyy"
                                                                              onChange={(val) =>
                                                                                      setFormData((prev) => ({
                                                                                        ...prev,
                                                                                        variants: prev.variants.map((v, i) =>
                                                                                          i === index
                                                                                            ? { ...v, [entry[0]]: val }
                                                                                            : v
                                                                                        ),
                                                                                      }))
                                                                                    }
                                                                                    /> 
                                                                            :
                                                                            <input
                                                                              onChange={(e)=>handleVariantChange(index, e.target.name, e.target.value)}
                                                                                    
                                                                              type="text"
                                                                              placeholder={entry[1]}
                                                                              name={entry[0]}
                                                                              tabIndex="0"
                                                                              value={formData?.variants?.[index]?.[entry[0]] || ''}
                                                                              aria-required="true"
                                                                              required
                                                                              
                                                                              className="mb-10"
                                                                            />}
                                                                            
                                                                          </fieldset>
                                                                          }
                                                                          </>
                                                                        )
                                                                      )}
                                                                    </div>
                                                                  ))}
                                                                </div>
                                                              ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        
                                      </fieldset>
                                      <div className="cols-lg gap22">
                                          <fieldset className="brand">
                                              <div className="body-title mb-10">Brand <span className="tf-color-1">*</span></div>
                                              <input  onChange={handleInputChange} className="" type="text" placeholder="Choose brand" name="brand" tabindex="0" value={formData?.brand || ''} aria-required="true" required=""/>
                                          </fieldset>
                                          
                                          <fieldset className="tags">
                                              <div className="body-title mb-10">Tags</div>
                                              <input  onChange={handleInputChange} className="" type="text" placeholder="Enter a tag" name="tags" tabindex="0" value={formData?.tags || ''} aria-required="true" required=""/>
                                          </fieldset>
                                          
                                      </div>
                                      <fieldset className="description">
                                          <div className="body-title mb-10">Description <span className="tf-color-1">*</span></div>
                                          <textarea  value={formData?.description || ''} onChange={handleInputChange} className="mb-10" name="description" placeholder="Short description about product" tabindex="0" aria-required="true" required=""></textarea>
                                          <div className="text-tiny">Do not exceed 100 characters when entering the product name.</div>
                                      </fieldset>
                                  </div>
                                  
                                  <div className="cols gap10 d-flex justify-content-between">
                                      <button className="tf-button w208" type="button" onClick={handleSave}>
                                          Save
                                      </button>
                                  </div>
                                </form>
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
            <ToastContainer />
            {/* <!-- /#page --> */}
        </div>
    )
}
export default AddAdminProducts;