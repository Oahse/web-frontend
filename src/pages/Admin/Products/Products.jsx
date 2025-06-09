import { useEffect, useState } from "react";
import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import { fetchProducts, deleteProduct  } from "@/services/api/products";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import AdminTable from "@/components/admin/table";
import img1 from '@/assets/images/products/product-1.jpg';
import img2 from '@/assets/images/products/product-2.jpg';
import img3 from '@/assets/images/products/product-3.jpg';
import img4 from '@/assets/images/products/product-4.jpg';
import img5 from '@/assets/images/products/product-5.jpg';
import img6 from '@/assets/images/products/product-6.jpg';
import img7 from '@/assets/images/products/product-7.jpg';
import useAdminStyles from '@/hooks/useAdminStyles';

const defaultProductList = [
    {
      id: 1,
      name: "Dog Food, Chicken & Chicken Liver Recipe...",
      image: [img1],
      code: "#7712309",
      price: "$1,452.500",
      salePrice: "$1,199.99",
      description: "Premium dog food with real chicken and liver for optimal health.",
      brand: "HealthyPet",
      color: "Brown",
      size: "5kg",
      sku: "HP-DOG-001",
      stock: '8880',
      tags: ["dog", "food", "chicken", "premium"],
      sales: '1638',
      date: "08/24/2024",
      category: "Dog Food"
    },
    {
      id: 2,
      name: "Cat Litter, Natural Pine Scent",
      image: [img2],
      code: "#7712310",
      price: "$300.00",
      salePrice: "$250.00",
      description: "All-natural pine-scented cat litter for odor control.",
      brand: "EcoPaws",
      color: "Red",
      size: "10L",
      sku: "EP-CAT-002",
      stock: 80,
      tags: ["cat", "litter", "eco-friendly"],
      sales: 845,
      date: "09/01/2024",
      category: "Cat Supplies"
    },
    {
      id: 3,
      name: "Tough Chew Toy for Aggressive Dogs",
      image: [img3],
      code: "#7712311",
      price: "$75.00",
      salePrice: "$59.99",
      description: "Durable rubber chew toy for heavy chewers.",
      brand: "PawStrong",
      color: "Red",
      size: "Medium",
      sku: "PS-TOY-003",
      stock: 120,
      tags: ["dog", "toy", "chew"],
      sales: 526,
      date: "09/10/2024",
      category: "Dog Toys"
    },
    {
      id: 4,
      name: "Fish Flakes for Tropical Fish",
      image: [img4],
      code: "#7712312",
      price: "$40.00",
      salePrice: "$32.00",
      description: "Nutritious food flakes for all tropical aquarium fish.",
      brand: "AquaLife",
      color: "Multi",
      size: "200g",
      sku: "AL-FISH-004",
      stock: 300,
      tags: ["fish", "flakes", "aquarium"],
      sales: 1093,
      date: "07/15/2024",
      category: "Fish Food"
    },
    {
      id: 5,
      name: "Small Pet Bedding, Lavender Scent",
      image: [img5],
      code: "#7712313",
      price: "$90.00",
      salePrice: "$75.00",
      description: "Soft, absorbent bedding for hamsters, guinea pigs, and more.",
      brand: "SnuggleNest",
      color: "Purple",
      size: "20L",
      sku: "SN-BED-005",
      stock: 45,
      tags: ["small pets", "bedding", "lavender"],
      sales: 410,
      date: "10/05/2024",
      category: "Small Pet Supplies"
    },
    {
      id: 6,
      name: "Bird Cage Cleaner Spray",
      image: [img6],
      code: "#7712314",
      price: "$60.00",
      salePrice: "$49.99",
      description: "Non-toxic spray for cleaning bird cages safely.",
      brand: "FeatherFresh",
      color: "Clear",
      size: "500ml",
      sku: "FF-CLN-006",
      stock: 210,
      tags: ["bird", "cleaner", "spray"],
      sales: 623,
      date: "06/18/2024",
      category: "Bird Care"
    },
    {
      id: 7,
      name: "Reptile Heat Lamp Bulb 100W",
      image: [img7],
      code: "#7712315",
      price: "$110.00",
      salePrice: "$89.00",
      description: "Heat lamp for reptiles to maintain optimal basking temperatures.",
      brand: "HeatZone",
      color: "White",
      size: "100W",
      sku: "HZ-LAMP-007",
      stock: 75,
      tags: ["reptile", "heat", "lamp"],
      sales: 312,
      date: "05/30/2024",
      category: "Reptile Accessories"
    }
  ];

const AdminProducts = ({API_URL ,Companyname, isLoggedIn, loggedInUser,categories=[]  })=>{
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

    
    const [productList, setProductList] = useState(defaultProductList||null);
    
        useEffect(() => {
            const loadCategories = async () => {
                if (!productList || productList.length === 0) {
                    setLoading(true);
                    const result = await fetchProducts({});
                    if (!result.error && result.data) {
                    setProductList(result.data); // assumes API returns an array of categories
                    } else {
                    // fallback to static list if API fails
                    setProductList(defaultProductList);
                    }
                    setLoading(false);
                }
            };
        
            loadCategories();
          }, [productList]);
        
          const handleEdit = (product) => {
            console.log('Edit product', product);
            // Logic to handle editing
          };
        
          const handleDelete = (product) => {
            console.log('Delete product', product);
            // Logic to handle deleting
          };
        
          // Columns configuration
          const columns = [
            { title: 'Product', field: 'name' },
            { title: 'Category', field: 'category' },
            { title: 'Price', field: 'price' },
            { title: 'Sale Price', field: 'salePrice' },
            { title: 'Stock', field: 'stock' },
            // { title: 'Sales', field: 'sales' },
            // { title: 'SKU', field: 'sku' },
            // { title: 'Code', field: 'code' },
            // { title: 'Brand', field: 'brand' },
            // { title: 'Color', field: 'color' },
            // { title: 'Size', field: 'size' },
            // { title: 'Tags', field: 'tags' },
            // { title: 'Description', field: 'description' },
            { title: 'Date Added', field: 'date' }
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
                    <SideBar activeMenu={1}  onshowHideMenu={showHideMenu} />
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
                                    <h3>All Products</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Product', href: 'javascript:void(0);' },
                                            { label: 'All Products' }
                                        ]}
                                    />

                                </div>
                                {/* <!-- product-list --> */}
                                <div className="wg-box">
                                    <AdminTable
                                        items={productList}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        linkUrl={'/admin/products/'}
                                        columns={columns} // Pass the columns configuration
                                        deletecaller = {deleteProduct}
                                    />
                                </div>
                                {/* <!-- /product-list --> */}
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
export default AdminProducts;