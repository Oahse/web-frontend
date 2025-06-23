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
    images: [img1],
    code: "#7712309",
    description: "Premium dog food with real chicken and liver for optimal health.",
    brand: "HealthyPet",
    variants: [
      {
        size: { label: 'S', qty: '2kg' },
        price: "$500.00",
        salePrice: "$450.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HP-#7712309-S",
        stock: 1200,
        sales: 540,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'M', qty: '5kg' },
        price: "$1,452.50",
        salePrice: "$1,199.99",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HP-#7712309-M",
        stock: 8880,
        sales: 1638,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'L', qty: '10kg' },
        price: "$2,000.00",
        salePrice: "$1,750.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HP-#7712309-L",
        stock: 5600,
        sales: 700,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["dog", "food", "chicken", "premium"],
    dateAdded: "2024-08-24T00:00:00Z",
    category: "Dog Food"
  },
  {
    id: 2,
    name: "Cat Litter, Natural Pine Scent",
    images: [img2],
    code: "#7712310",
    description: "All-natural pine-scented cat litter for odor control.",
    brand: "EcoPaws",
    variants: [
      {
        size: { label: 'Small', qty: '5L' },
        price: "$150.00",
        salePrice: "$130.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "EP-#7712310-SM",
        stock: 100,
        sales: 300,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'Standard', qty: '10L' },
        price: "$300.00",
        salePrice: "$250.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "EP-#7712310-STD",
        stock: 80,
        sales: 845,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'Large', qty: '20L' },
        price: "$500.00",
        salePrice: "$420.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "EP-#7712310-LG",
        stock: 50,
        sales: 100,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["cat", "litter", "eco-friendly"],
    dateAdded: "2024-09-01T00:00:00Z",
    category: "Cat Supplies"
  },
  {
    id: 3,
    name: "Tough Chew Toy for Aggressive Dogs",
    images: [img3],
    code: "#7712311",
    description: "Durable rubber chew toy for heavy chewers.",
    brand: "PawStrong",
    variants: [
      {
        size: { label: 'S', qty: 'Small' },
        price: "$60.00",
        salePrice: "$49.99",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "PS-#7712311-S",
        stock: 140,
        sales: 120,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'M', qty: 'Medium' },
        price: "$75.00",
        salePrice: "$59.99",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "PS-#7712311-M",
        stock: 120,
        sales: 526,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: 'L', qty: 'Large' },
        price: "$90.00",
        salePrice: "$75.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "PS-#7712311-L",
        stock: 90,
        sales: 200,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["dog", "toy", "chew"],
    dateAdded: "2024-09-10T00:00:00Z",
    category: "Dog Toys"
  },
  {
    id: 4,
    name: "Fish Flakes for Tropical Fish",
    images: [img4],
    code: "#7712312",
    description: "Nutritious food flakes for all tropical aquarium fish.",
    brand: "AquaLife",
    variants: [
      {
        size: { label: '100g', qty: '100g' },
        price: "$25.00",
        salePrice: "$20.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "AL-#7712312-100G",
        stock: 200,
        sales: 450,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '200g', qty: '200g' },
        price: "$40.00",
        salePrice: "$32.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "AL-#7712312-200G",
        stock: 300,
        sales: 1093,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '500g', qty: '500g' },
        price: "$80.00",
        salePrice: "$65.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "AL-#7712312-500G",
        stock: 150,
        sales: 320,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["fish", "flakes", "aquarium"],
    dateAdded: "2024-07-15T00:00:00Z",
    category: "Fish Food"
  },
  {
    id: 5,
    name: "Small Pet Bedding, Lavender Scent",
    images: [img5],
    code: "#7712313",
    description: "Soft, absorbent bedding for hamsters, guinea pigs, and more.",
    brand: "SnuggleNest",
    variants: [
      {
        size: { label: '10L', qty: '10L' },
        price: "$60.00",
        salePrice: "$50.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "SN-#7712313-10L",
        stock: 60,
        sales: 150,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '20L', qty: '20L' },
        price: "$90.00",
        salePrice: "$75.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "SN-#7712313-20L",
        stock: 45,
        sales: 410,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '30L', qty: '30L' },
        price: "$120.00",
        salePrice: "$99.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "SN-#7712313-30L",
        stock: 30,
        sales: 80,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["small pets", "bedding", "lavender"],
    dateAdded: "2024-10-05T00:00:00Z",
    category: "Small Pet Supplies"
  },
  {
    id: 6,
    name: "Bird Cage Cleaner Spray",
    images: [img6],
    code: "#7712314",
    description: "Non-toxic spray for cleaning bird cages safely.",
    brand: "FeatherFresh",
    variants: [
      {
        size: { label: '250ml', qty: '250ml' },
        price: "$35.00",
        salePrice: "$28.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "FF-#7712314-250ML",
        stock: 100,
        sales: 200,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '500ml', qty: '500ml' },
        price: "$60.00",
        salePrice: "$49.99",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "FF-#7712314-500ML",
        stock: 210,
        sales: 623,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '1L', qty: '1L' },
        price: "$110.00",
        salePrice: "$95.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "FF-#7712314-1L",
        stock: 90,
        sales: 250,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["bird", "cleaner", "spray"],
    dateAdded: "2024-06-18T00:00:00Z",
    category: "Bird Care"
  },
  {
    id: 7,
    name: "Reptile Heat Lamp Bulb 100W",
    images: [img7],
    code: "#7712315",
    description: "Heat lamp for reptiles to maintain optimal basking temperatures.",
    brand: "HeatZone",
    variants: [
      {
        size: { label: '50W', qty: '50W' },
        price: "$70.00",
        salePrice: "$60.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HZ-#7712315-50W",
        stock: 100,
        sales: 180,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '100W', qty: '100W' },
        price: "$110.00",
        salePrice: "$89.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HZ-#7712315-100W",
        stock: 75,
        sales: 312,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      },
      {
        size: { label: '150W', qty: '150W' },
        price: "$150.00",
        salePrice: "$130.00",
        discountEndDate: "2025-05-17T09:15:00Z",
        sku: "HZ-#7712315-150W",
        stock: 50,
        sales: 90,
        suppliers: [
          'bxyfoods',
          'freshfarm',
          'greenvalley',
          'sunshineprovisions',
          'qualitygoods',
          'organicroots',
          'harvesthub'
        ]
      }
    ],
    tags: ["reptile", "heat", "lamp"],
    dateAdded: "2024-05-30T00:00:00Z",
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
            { title: 'Brand', field: 'brand' },
            // { title: 'Sale Price', field: 'salePrice' },
            // { title: 'Stock', field: 'stock' },
            // { title: 'Sales', field: 'sales' },
            // { title: 'SKU', field: 'sku' },
            // { title: 'Code', field: 'code' },
            // { title: 'Brand', field: 'brand' },
            // { title: 'Size', field: 'size' },
            // { title: 'Tags', field: 'tags' },
            // { title: 'Description', field: 'description' },
            { title: 'Date Added', field: 'dateAdded' }
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