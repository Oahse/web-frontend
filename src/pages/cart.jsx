import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra';
import QuantitySelector from '@/components/quantityselector';
import { Link } from "react-router-dom";
import { fetchCartByUser } from "@/services/api/carts";
import useAuth from "@/hooks/useAuth";
import CountDownTimer from '@/components/countdown';
import BreadCrumbs from '@/components/breadcrumbs';

import orange1 from '@/assets/images/products/orange-1.jpg';
import white1 from '@/assets/images/products/white-1.jpg';
import black1 from '@/assets/images/products/black-1.jpg';
import hoodie1 from '@/assets/images/products/brown.jpg';
import hoodie2 from '@/assets/images/products/purple.jpg';
import jeans1 from '@/assets/images/products/green.jpg';
import jeans2 from '@/assets/images/products/white-2.jpg';
import sneakers1 from '@/assets/images/products/white-3.jpg';
import sneakers2 from '@/assets/images/products/white-4.jpg';
import pink1 from '@/assets/images/products/pink-1.jpg';
import brown2 from '@/assets/images/products/brown-2.jpg';
import dress1 from '@/assets/images/products/white-2.jpg';
import dress2 from '@/assets/images/products/pink-1.jpg';
import jacket1 from '@/assets/images/products/brown-2.jpg';
import jacket2 from '@/assets/images/products/brown-3.jpg';
import useDeviceType from '@/hooks/useDeviceType'
import { fetchCartRelatedProducts } from "../services/api/products";

const alsoLike = [
        {
            id: 1,
            name: 'Ribbed Tank Top',
            price: 16.95,
            currency: '$',
            discount: 20,
            discountStartDate: '2025-05-18T08:00:00Z',
            availability: 'In stock',
            brand: 'Ecomus',
            category: 'Fibers',  // tank top - fibers (like cotton/wool)
            images: [orange1, black1, white1, white1],
            colors: [
                { name: 'Orange', swatch: 'bg_orange-3', image: orange1 },
                { name: 'Black', swatch: 'bg_dark', image: black1 },
                { name: 'White', swatch: 'bg_white', image: white1 },
                ],
            sizes: [
                { label: 'S', id: 'values-s', price: 0 },
                { label: 'M', id: 'values-m', price: 9 },
                { label: 'XL', id: 'values-xl', price: 12 },
            ],
            rating: 4,
        },
        {
            id: 2,
            name: 'Slim Fit Jeans',
            price: 49.99,
            currency: '£',
            discount: 15,
            discountStartDate: '2025-05-15T12:30:00Z',
            availability: 'Limited stock',
            brand: 'DenimMax',
            category: 'Fibers',  // denim = fiber-based fabric
            images: [jeans1, jeans2, black1, white1],
            colors: [
                { name: 'Blue', swatch: 'bg_blue', image: jeans1 },
                { name: 'Black', swatch: 'bg_dark', image: black1 },
            ],
            sizes: [
                { label: 'M', id: 'values-m', price: 9 },
            ],
            rating: 4,
        },
        {
            id: 3,
            name: 'Cotton Hoodie',
            price: 39.5,
            currency: '€',
            discount: 10,
            discountStartDate: '2025-05-10T14:00:00Z',
            availability: 'Out of stock',
            brand: 'CozyWear',
            category: 'Fibers',
            images: [hoodie1, hoodie2, black1, white1],
            colors: [
                { name: 'Grey', swatch: 'bg_grey', image: hoodie1 },
                { name: 'Navy', swatch: 'bg_navy', image: hoodie2 },
            ],
            sizes: [
                { label: 'S', id: 'values-s', price: 0 },
            ],
            rating: 3,
        },
        {
            id: 4,
            name: 'Chunky Sneakers',
            price: 74.0,
            currency: '$',
            discount: 30,
            discountStartDate: '2025-05-17T09:15:00Z',
            availability: 'Pre-order',
            brand: 'StepUp',
            category: 'Nuts, Flowers & Beverages',  // shoes, let's loosely associate here
            images: [sneakers1, sneakers2, black1, white1],
            colors: [
                { name: 'White', swatch: 'bg_white', image: sneakers1 },
                { name: 'Black', swatch: 'bg_dark', image: black1 },
                { name: 'Beige', swatch: 'bg_beige', image: sneakers2 },
            ],
            sizes: [
                { label: 'L', id: 'values-l', price: 10 },
            ],
            rating: 5,
        },
        {
            id: 5,
            name: 'Floral Summer Dress',
            price: 29.99,
            currency: '€',
            discount: 25,
            discountStartDate: '2025-05-14T10:45:00Z',
            availability: 'In stock',
            brand: 'SunBreeze',
            category: 'Fibers',
            images: [dress1, dress2, white1, pink1],
            colors: [
                { name: 'Floral Red', swatch: 'bg_red', image: dress1 },
                { name: 'Light Blue', swatch: 'bg_lightblue', image: dress2 },
            ],
            sizes: [
                { label: 'S', id: 'values-s', price: 0 },
                { label: 'M', id: 'values-m', price: 9 },
                { label: 'L', id: 'values-l', price: 10 },
                { label: 'XL', id: 'values-xl', price: 12 },
            ],
            rating: 1,
        },
        {
            id: 6,
            name: 'Leather Jacket',
            price: 119.99,
            currency: '£',
            discount: 35,
            discountStartDate: '2025-05-13T16:00:00Z',
            availability: 'Limited stock',
            brand: 'UrbanRide',
            category: 'Meat, Fish & Sweeteners',  // leather comes from animals
            images: [jacket1, jacket2, brown2, black1],
            colors: [
                { name: 'Black', swatch: 'bg_dark', image: black1 },
                { name: 'Brown', swatch: 'bg_brown', image: jacket2 },
            ],
            sizes: [
                { label: 'S', id: 'values-s', price: 0 },
                { label: 'M', id: 'values-m', price: 9 },
                { label: 'L', id: 'values-l', price: 10 },
                { label: 'XL', id: 'values-xl', price: 12 },
            ],
            rating: 2,
        },
    ]
    
const Cart =({categories=[]})=>{
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const { loading:isloading, error:iserror, user} = useAuth();
    const [loading, setLoading] = useState(isloading);
    const [isempty, setIsEmpty] = useState(true);
    const [error, setError] = useState(iserror);
    const [products, setProducts] = useState([]);
    const [cartrelatedproducts, setCartRelatedProducts] = useState(alsoLike || []);
    const [cartrelatedproductsloading, setCartRelatedProductsLoading] = useState(isloading);

    useEffect(() => {
        const loadCartProducts = async () => {
            const response = await fetchCartByUser({ userId:user?.id });
            // Assuming your response contains products in response.data or similar
            // console.log(response,'---')
            if (response.data.length > 0 ){
                setProducts(response.data || []);
                setIsEmpty(false);
            }else{
                setIsEmpty(true);
            }
            setError(response.error);
            setLoading(response.loading);
        };

        if (user?.id) {
            loadCartProducts();
        }
    }, [user?.id]);

    useEffect(() => {
        
        const loadCartRelatedProducts = async () => {
            const response = await fetchCartRelatedProducts({ cartId:user?.cartId });
            // Assuming your response contains products in response.data or similar
            // console.log(response,'---')
            setCartRelatedProducts(response.data || []);
            setError(response.error);
            setCartRelatedProductsLoading(response.loading);
        };

        if (user?.cartId) {
            loadCartRelatedProducts();
        }

    }, [user?.cartId]);
    
    // Initialize quantities: { [productId]: quantity }
    const [quantities, setQuantities] = useState(() => {
        const initial = {};
        products?.forEach(p => {
            initial[p.id] = p.amount || 1; // or default 1
        });
        return initial;
    });
    const getDiscountPrice = (price, discount) => {
        return (price-(price * (discount / 100))).toFixed(2);
    };
    const [shippingThreshold, setShippingThreshold]= useState(100);
    const [total, setTotal] = useState(30);
    const [currency, setCurrency] = useState('$');
    const [totalstring, setTotalString] = useState('$0');

    useEffect(() => {
        // calculate total whenever quantities or products change
        const newTotal = products?.reduce((sum, product) => {
            const qty = quantities[product?.id] || 1;
            setCurrency(product?.currency);
            return sum + getDiscountPrice(product?.price,product?.discount) * qty;
        }, 0);

        setTotal(Math.min(100,newTotal||total));
        setTotalString(`${currency}${Math.min(100,newTotal||total)}`)
    }, [quantities, products,currency,total]);

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity < 1 ? 1 : newQuantity, // minimum 1
        }));
    };

    const [progress, setProgress] = useState(total.toFixed(0));
    
    const isDiscountActive = (product) => {
        if (!product.discountStartDate) return false;
        return new Date(product.discountStartDate) <= new Date();
    };
    
      
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">Shopping Cart</div>
                        <BreadCrumbs
                              dir='center'
                              links={[
                                  { name: 'Home', href: '/' },
                                  { name: 'Cart' }
                              ]}
                              // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                              // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                              // back={{ href: '/products', tooltip: 'Back to Products' }}
                          />
                    </div>
                </div>

                {/* <!-- page-cart --> */}
                <section className="flat-spacing-11">
                    <div className="container">
                        {isempty?
                            <div className="tf-page-cart text-center mt_4 mb_20">
                                <h5 className="mb_24">Your cart is empty</h5>
                                <p className="mb_24">You may check out all the available products and buy some in the shop</p>
                                <Link to="/products" className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Return to shop<i className="icon icon-arrow1-top-left"></i></Link>
                            </div>
                        :
                        <>
                            <div className="tf-cart-countdown">
                                <div className="title-left">
                                    <svg className="d-inline-block" xmlns="http://www.w3.org/2000/svg" width="16" height="24"
                                        viewBox="0 0 16 24" fill="rgb(219 18 21)">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.0899 24C11.3119 22.1928 11.4245 20.2409 10.4277 18.1443C10.1505 19.2691 9.64344 19.9518 8.90645 20.1924C9.59084 18.2379 9.01896 16.1263 7.19079 13.8576C7.15133 16.2007 6.58824 17.9076 5.50148 18.9782C4.00436 20.4517 4.02197 22.1146 5.55428 23.9669C-0.806588 20.5819 -1.70399 16.0418 2.86196 10.347C3.14516 11.7228 3.83141 12.5674 4.92082 12.8809C3.73335 7.84186 4.98274 3.54821 8.66895 0C8.6916 7.87426 11.1062 8.57414 14.1592 12.089C17.4554 16.3071 15.5184 21.1748 10.0899 24Z">
                                        </path>
                                    </svg>
                                    <p>Checkout within </p>
                                </div>
                                {/* <div className="js-countdown timer-count" data-timer="600" data-labels="d:,h:,m:,s"></div> */}
                                
                                <div className="count-down">
                                    <div className="tf-countdown-v2">
                                        <CountDownTimer starttime={7200000} />
                                    </div>
                                </div>
                            </div>
                            <div className="tf-page-cart-wrap">
                                <div className="tf-page-cart-item">
                                    <form>
                                        <table className="tf-table-page-cart">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products?.map((product, index)=>(
                                                    <tr key={index} className="tf-cart-item file-delete">
                                                        <td className="tf-cart-item_product">
                                                            <a href={`/products/${product.id}`} className="img-box">
                                                                <img src={product.image} alt="img-product"/>
                                                            </a>
                                                            <div className="cart-info">
                                                                <a href={`/products/${product.id}`} className="cart-title link">{product.name}</a>
                                                                <div className="cart-meta-variant">White / M</div>
                                                                <span className="remove-cart link remove">Remove</span>
                                                            </div>
                                                        </td>
                                                        <td className="tf-cart-item_price tf-variant-item-price" cart-data-title="Price">
                                                            <div className="cart-price price">
                                                                {(product?.discountStartDate && product?.discount) ?
                                                                    <span>{product?.currency}{getDiscountPrice(product?.price, product?.discount)}</span>:
                                                                    <span>{product?.currency}{product?.price}</span>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="tf-cart-item_quantity" cart-data-title="Quantity">
                                                            <div className="cart-quantity">
                                                                <QuantitySelector onChange={(quantity)=>handleQuantityChange(product?.id, quantity)}/>
                                                            </div>
                                                        </td>
                                                        <td className="tf-cart-item_total tf-variant-item-total" cart-data-title="Total">
                                                            <div className="cart-total price">{product?.currency}{quantities[product?.id]}</div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="tf-page-cart-note">
                                            <label for="cart-note">Total: {totalstring || 0}</label>
                                        </div>
                                        <div className="tf-page-cart-note">
                                            <label for="cart-note">Add Order Note</label>
                                            <textarea name="note" id="cart-note" placeholder="How can we help you?"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="tf-page-cart-footer">
                                    <div className="tf-cart-footer-inner">
                                        <div className="tf-free-shipping-bar">
                                            <div className="tf-progress-bar">
                                                <span style={{width:"50%;",left:`${progress}%`}}>
                                                    <div className="progress-car">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14"
                                                            viewBox="0 0 21 14" fill="currentColor">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M0 0.875C0 0.391751 0.391751 0 0.875 0H13.5625C14.0457 0 14.4375 0.391751 14.4375 0.875V3.0625H17.3125C17.5867 3.0625 17.845 3.19101 18.0104 3.40969L20.8229 7.12844C20.9378 7.2804 21 7.46572 21 7.65625V11.375C21 11.8582 20.6082 12.25 20.125 12.25H17.7881C17.4278 13.2695 16.4554 14 15.3125 14C14.1696 14 13.1972 13.2695 12.8369 12.25H7.72563C7.36527 13.2695 6.39293 14 5.25 14C4.10706 14 3.13473 13.2695 2.77437 12.25H0.875C0.391751 12.25 0 11.8582 0 11.375V0.875ZM2.77437 10.5C3.13473 9.48047 4.10706 8.75 5.25 8.75C6.39293 8.75 7.36527 9.48046 7.72563 10.5H12.6875V1.75H1.75V10.5H2.77437ZM14.4375 8.89937V4.8125H16.8772L19.25 7.94987V10.5H17.7881C17.4278 9.48046 16.4554 8.75 15.3125 8.75C15.0057 8.75 14.7112 8.80264 14.4375 8.89937ZM5.25 10.5C4.76676 10.5 4.375 10.8918 4.375 11.375C4.375 11.8582 4.76676 12.25 5.25 12.25C5.73323 12.25 6.125 11.8582 6.125 11.375C6.125 10.8918 5.73323 10.5 5.25 10.5ZM15.3125 10.5C14.8293 10.5 14.4375 10.8918 14.4375 11.375C14.4375 11.8582 14.8293 12.25 15.3125 12.25C15.7957 12.25 16.1875 11.8582 16.1875 11.375C16.1875 10.8918 15.7957 10.5 15.3125 10.5Z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </div>
                                            {(shippingThreshold - total != 0)?
                                                <div className="tf-progress-msg">
                                                    Buy <span className="price fw-6">{currency}{(shippingThreshold - total).toFixed(2)}</span> more to enjoy <span className="fw-6">Free
                                                        Shipping</span>
                                                </div>
                                            :
                                                <div className="tf-progress-msg">
                                                    <span className="fw-6 text_success">Free Shipping</span>
                                                </div>
                                            }
                                        </div>
                                        <div className="tf-page-cart-checkout">
                                            <div className="shipping-calculator">
                                                <summary
                                                    className="accordion-shipping-header d-flex justify-content-between align-items-center collapsed"
                                                    data-bs-target="#shipping" data-bs-toggle="collapse" aria-controls="shipping">
                                                    <h3 className="shipping-calculator-title">Estimate Shipping</h3>
                                                    <span className="shipping-calculator_accordion-icon"></span>
                                                </summary>
                                                <div className="collapse" id="shipping">
                                                    <div className="accordion-shipping-content">
                                                        <fieldset className="field">
                                                            <label className="label">Country</label>
                                                            <select className="tf-select w-100" id="ShippingCountry_CartDrawer-Form"
                                                                name="address[country]" data-default="">
                                                                <option value="---" data-provinces="[]">---</option>
                                                                <option value="Australia"
                                                                    data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]">
                                                                    Australia</option>
                                                                <option value="Austria" data-provinces="[]">Austria</option>
                                                                <option value="Belgium" data-provinces="[]">Belgium</option>
                                                                <option value="Canada"
                                                                    data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]">
                                                                    Canada</option>
                                                                <option value="Czech Republic" data-provinces="[]">Czechia</option>
                                                                <option value="Denmark" data-provinces="[]">Denmark</option>
                                                                <option value="Finland" data-provinces="[]">Finland</option>
                                                                <option value="France" data-provinces="[]">France</option>
                                                                <option value="Germany" data-provinces="[]">Germany</option>
                                                                <option value="Hong Kong"
                                                                    data-provinces="[['Hong Kong Island','Hong Kong Island'],['Kowloon','Kowloon'],['New Territories','New Territories']]">
                                                                    Hong Kong SAR</option>
                                                                <option value="Ireland"
                                                                    data-provinces="[['Carlow','Carlow'],['Cavan','Cavan'],['Clare','Clare'],['Cork','Cork'],['Donegal','Donegal'],['Dublin','Dublin'],['Galway','Galway'],['Kerry','Kerry'],['Kildare','Kildare'],['Kilkenny','Kilkenny'],['Laois','Laois'],['Leitrim','Leitrim'],['Limerick','Limerick'],['Longford','Longford'],['Louth','Louth'],['Mayo','Mayo'],['Meath','Meath'],['Monaghan','Monaghan'],['Offaly','Offaly'],['Roscommon','Roscommon'],['Sligo','Sligo'],['Tipperary','Tipperary'],['Waterford','Waterford'],['Westmeath','Westmeath'],['Wexford','Wexford'],['Wicklow','Wicklow']]">
                                                                    Ireland</option>
                                                                <option value="Israel" data-provinces="[]">Israel</option>
                                                                <option value="Italy"
                                                                    data-provinces="[['Agrigento','Agrigento'],['Alessandria','Alessandria'],['Ancona','Ancona'],['Aosta','Aosta Valley'],['Arezzo','Arezzo'],['Ascoli Piceno','Ascoli Piceno'],['Asti','Asti'],['Avellino','Avellino'],['Bari','Bari'],['Barletta-Andria-Trani','Barletta-Andria-Trani'],['Belluno','Belluno'],['Benevento','Benevento'],['Bergamo','Bergamo'],['Biella','Biella'],['Bologna','Bologna'],['Bolzano','South Tyrol'],['Brescia','Brescia'],['Brindisi','Brindisi'],['Cagliari','Cagliari'],['Caltanissetta','Caltanissetta'],['Campobasso','Campobasso'],['Carbonia-Iglesias','Carbonia-Iglesias'],['Caserta','Caserta'],['Catania','Catania'],['Catanzaro','Catanzaro'],['Chieti','Chieti'],['Como','Como'],['Cosenza','Cosenza'],['Cremona','Cremona'],['Crotone','Crotone'],['Cuneo','Cuneo'],['Enna','Enna'],['Fermo','Fermo'],['Ferrara','Ferrara'],['Firenze','Florence'],['Foggia','Foggia'],['Forlì-Cesena','Forlì-Cesena'],['Frosinone','Frosinone'],['Genova','Genoa'],['Gorizia','Gorizia'],['Grosseto','Grosseto'],['Imperia','Imperia'],['Isernia','Isernia'],['L'Aquila','L’Aquila'],['La Spezia','La Spezia'],['Latina','Latina'],['Lecce','Lecce'],['Lecco','Lecco'],['Livorno','Livorno'],['Lodi','Lodi'],['Lucca','Lucca'],['Macerata','Macerata'],['Mantova','Mantua'],['Massa-Carrara','Massa and Carrara'],['Matera','Matera'],['Medio Campidano','Medio Campidano'],['Messina','Messina'],['Milano','Milan'],['Modena','Modena'],['Monza e Brianza','Monza and Brianza'],['Napoli','Naples'],['Novara','Novara'],['Nuoro','Nuoro'],['Ogliastra','Ogliastra'],['Olbia-Tempio','Olbia-Tempio'],['Oristano','Oristano'],['Padova','Padua'],['Palermo','Palermo'],['Parma','Parma'],['Pavia','Pavia'],['Perugia','Perugia'],['Pesaro e Urbino','Pesaro and Urbino'],['Pescara','Pescara'],['Piacenza','Piacenza'],['Pisa','Pisa'],['Pistoia','Pistoia'],['Pordenone','Pordenone'],['Potenza','Potenza'],['Prato','Prato'],['Ragusa','Ragusa'],['Ravenna','Ravenna'],['Reggio Calabria','Reggio Calabria'],['Reggio Emilia','Reggio Emilia'],['Rieti','Rieti'],['Rimini','Rimini'],['Roma','Rome'],['Rovigo','Rovigo'],['Salerno','Salerno'],['Sassari','Sassari'],['Savona','Savona'],['Siena','Siena'],['Siracusa','Syracuse'],['Sondrio','Sondrio'],['Taranto','Taranto'],['Teramo','Teramo'],['Terni','Terni'],['Torino','Turin'],['Trapani','Trapani'],['Trento','Trentino'],['Treviso','Treviso'],['Trieste','Trieste'],['Udine','Udine'],['Varese','Varese'],['Venezia','Venice'],['Verbano-Cusio-Ossola','Verbano-Cusio-Ossola'],['Vercelli','Vercelli'],['Verona','Verona'],['Vibo Valentia','Vibo Valentia'],['Vicenza','Vicenza'],['Viterbo','Viterbo']]">
                                                                    Italy</option>
                                                                <option value="Japan"
                                                                    data-provinces="[['Aichi','Aichi'],['Akita','Akita'],['Aomori','Aomori'],['Chiba','Chiba'],['Ehime','Ehime'],['Fukui','Fukui'],['Fukuoka','Fukuoka'],['Fukushima','Fukushima'],['Gifu','Gifu'],['Gunma','Gunma'],['Hiroshima','Hiroshima'],['Hokkaidō','Hokkaido'],['Hyōgo','Hyogo'],['Ibaraki','Ibaraki'],['Ishikawa','Ishikawa'],['Iwate','Iwate'],['Kagawa','Kagawa'],['Kagoshima','Kagoshima'],['Kanagawa','Kanagawa'],['Kumamoto','Kumamoto'],['Kyōto','Kyoto'],['Kōchi','Kochi'],['Mie','Mie'],['Miyagi','Miyagi'],['Miyazaki','Miyazaki'],['Nagano','Nagano'],['Nagasaki','Nagasaki'],['Nara','Nara'],['Niigata','Niigata'],['Okayama','Okayama'],['Okinawa','Okinawa'],['Saga','Saga'],['Saitama','Saitama'],['Shiga','Shiga'],['Shimane','Shimane'],['Shizuoka','Shizuoka'],['Tochigi','Tochigi'],['Tokushima','Tokushima'],['Tottori','Tottori'],['Toyama','Toyama'],['Tōkyō','Tokyo'],['Wakayama','Wakayama'],['Yamagata','Yamagata'],['Yamaguchi','Yamaguchi'],['Yamanashi','Yamanashi'],['Ōita','Oita'],['Ōsaka','Osaka']]">
                                                                    Japan</option>
                                                                <option value="Malaysia"
                                                                    data-provinces="[['Johor','Johor'],['Kedah','Kedah'],['Kelantan','Kelantan'],['Kuala Lumpur','Kuala Lumpur'],['Labuan','Labuan'],['Melaka','Malacca'],['Negeri Sembilan','Negeri Sembilan'],['Pahang','Pahang'],['Penang','Penang'],['Perak','Perak'],['Perlis','Perlis'],['Putrajaya','Putrajaya'],['Sabah','Sabah'],['Sarawak','Sarawak'],['Selangor','Selangor'],['Terengganu','Terengganu']]">
                                                                    Malaysia</option>
                                                                <option value="Netherlands" data-provinces="[]">Netherlands</option>
                                                                <option value="New Zealand"
                                                                    data-provinces="[['Auckland','Auckland'],['Bay of Plenty','Bay of Plenty'],['Canterbury','Canterbury'],['Chatham Islands','Chatham Islands'],['Gisborne','Gisborne'],['Hawke's Bay','Hawke’s Bay'],['Manawatu-Wanganui','Manawatū-Whanganui'],['Marlborough','Marlborough'],['Nelson','Nelson'],['Northland','Northland'],['Otago','Otago'],['Southland','Southland'],['Taranaki','Taranaki'],['Tasman','Tasman'],['Waikato','Waikato'],['Wellington','Wellington'],['West Coast','West Coast']]">
                                                                    New Zealand</option>
                                                                <option value="Norway" data-provinces="[]">Norway</option>
                                                                <option value="Poland" data-provinces="[]">Poland</option>
                                                                <option value="Portugal"
                                                                    data-provinces="[['Aveiro','Aveiro'],['Açores','Azores'],['Beja','Beja'],['Braga','Braga'],['Bragança','Bragança'],['Castelo Branco','Castelo Branco'],['Coimbra','Coimbra'],['Faro','Faro'],['Guarda','Guarda'],['Leiria','Leiria'],['Lisboa','Lisbon'],['Madeira','Madeira'],['Portalegre','Portalegre'],['Porto','Porto'],['Santarém','Santarém'],['Setúbal','Setúbal'],['Viana do Castelo','Viana do Castelo'],['Vila Real','Vila Real'],['Viseu','Viseu'],['Évora','Évora']]">
                                                                    Portugal</option>
                                                                <option value="Singapore" data-provinces="[]">Singapore</option>
                                                                <option value="South Korea"
                                                                    data-provinces="[['Busan','Busan'],['Chungbuk','North Chungcheong'],['Chungnam','South Chungcheong'],['Daegu','Daegu'],['Daejeon','Daejeon'],['Gangwon','Gangwon'],['Gwangju','Gwangju City'],['Gyeongbuk','North Gyeongsang'],['Gyeonggi','Gyeonggi'],['Gyeongnam','South Gyeongsang'],['Incheon','Incheon'],['Jeju','Jeju'],['Jeonbuk','North Jeolla'],['Jeonnam','South Jeolla'],['Sejong','Sejong'],['Seoul','Seoul'],['Ulsan','Ulsan']]">
                                                                    South Korea</option>
                                                                <option value="Spain"
                                                                    data-provinces="[['A Coruña','A Coruña'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almería'],['Asturias','Asturias Province'],['Badajoz','Badajoz'],['Balears','Balears Province'],['Barcelona','Barcelona'],['Burgos','Burgos'],['Cantabria','Cantabria Province'],['Castellón','Castellón'],['Ceuta','Ceuta'],['Ciudad Real','Ciudad Real'],['Cuenca','Cuenca'],['Cáceres','Cáceres'],['Cádiz','Cádiz'],['Córdoba','Córdoba'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Guipúzcoa','Gipuzkoa'],['Huelva','Huelva'],['Huesca','Huesca'],['Jaén','Jaén'],['La Rioja','La Rioja Province'],['Las Palmas','Las Palmas'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid Province'],['Melilla','Melilla'],['Murcia','Murcia'],['Málaga','Málaga'],['Navarra','Navarra'],['Ourense','Ourense'],['Palencia','Palencia'],['Pontevedra','Pontevedra'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa Cruz de Tenerife'],['Segovia','Segovia'],['Sevilla','Seville'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia'],['Valladolid','Valladolid'],['Vizcaya','Biscay'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Álava','Álava'],['Ávila','Ávila']]">
                                                                    Spain</option>
                                                                <option value="Sweden" data-provinces="[]">Sweden</option>
                                                                <option value="Switzerland" data-provinces="[]">Switzerland</option>
                                                                <option value="United Arab Emirates"
                                                                    data-provinces="[['Abu Dhabi','Abu Dhabi'],['Ajman','Ajman'],['Dubai','Dubai'],['Fujairah','Fujairah'],['Ras al-Khaimah','Ras al-Khaimah'],['Sharjah','Sharjah'],['Umm al-Quwain','Umm al-Quwain']]">
                                                                    United Arab Emirates</option>
                                                                <option value="United Kingdom"
                                                                    data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]">
                                                                    United Kingdom</option>
                                                                <option value="United States"
                                                                    data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]">
                                                                    United States</option>
                                                                <option value="Vietnam" data-provinces="[]">Vietnam</option>
                                                            </select>
                                                        </fieldset>
                                                        <fieldset className="field">
                                                            <label className="label">Zip code</label>
                                                            <input type="text" name="text" placeholder=""/>
                                                        </fieldset>
                                                        <button
                                                            className="tf-btn btn-fill animate-hover-btn radius-3 justify-content-center">
                                                            <span>Estimate</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="cart-checkbox">
                                                <input type="checkbox" className="tf-check" id="cart-gift-checkbox"/>
                                                <label for="cart-gift-checkbox" className="fw-4">
                                                    <span>Do you want a gift wrap?</span> Only <span className="fw-5">$5.00</span>
                                                </label>
                                            </div> */}
                                            <div className="tf-cart-totals-discounts">
                                                <h3>Subtotal</h3>
                                                <span className="total-value">{totalstring}</span>
                                            </div>
                                            <p className="tf-cart-tax">
                                                Taxes and <Link to="/shipping">shipping</Link> calculated at checkout
                                            </p>
                                            <div className="cart-checkbox">
                                                <input type="checkbox" className="tf-check" id="check-agree"/>
                                                <label for="check-agree" className="fw-4">
                                                    I agree with the <Link to="/terms">terms and conditions</Link>
                                                </label>
                                            </div>
                                            <div className="cart-checkout-btn">
                                                <Link to="/account/orders/checkout" state={{products:products}}
                                                    className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center">
                                                    <span>Check out</span>
                                                </Link>
                                            </div>
                                            <div className="tf-page-cart_imgtrust">
                                                <p className="text-center fw-6">Guarantee Safe Checkout</p>
                                                <div className="cart-list-social">
                                                    <div className="payment-item">
                                                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"
                                                            width="38" height="24" aria-labelledby="pi-visa">
                                                            <title id="pi-visa">Visa</title>
                                                            <path opacity=".07"
                                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z">
                                                            </path>
                                                            <path fill="#fff"
                                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32">
                                                            </path>
                                                            <path
                                                                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                                                                fill="#142688"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="payment-item">
                                                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38"
                                                            height="24" role="img" aria-labelledby="pi-paypal">
                                                            <title id="pi-paypal">PayPal</title>
                                                            <path opacity=".07"
                                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z">
                                                            </path>
                                                            <path fill="#fff"
                                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32">
                                                            </path>
                                                            <path fill="#003087"
                                                                d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z">
                                                            </path>
                                                            <path fill="#3086C8"
                                                                d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z">
                                                            </path>
                                                            <path fill="#012169"
                                                                d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div className="payment-item">
                                                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"
                                                            width="38" height="24" aria-labelledby="pi-master">
                                                            <title id="pi-master">Mastercard</title>
                                                            <path opacity=".07"
                                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z">
                                                            </path>
                                                            <path fill="#fff"
                                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32">
                                                            </path>
                                                            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                                                            <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                                                            <path fill="#FF5F00"
                                                                d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div className="payment-item">
                                                        <svg xmlns="http://www.w3.org/2000/svg" role="img"
                                                            aria-labelledby="pi-american_express" viewBox="0 0 38 24" width="38"
                                                            height="24">
                                                            <title id="pi-american_express">American Express</title>
                                                            <path fill="#000"
                                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                                                                opacity=".07"></path>
                                                            <path fill="#006FCF"
                                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z">
                                                            </path>
                                                            <path fill="#FFF"
                                                                d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z">
                                                            </path>
                                                            <path fill="#006FCF"
                                                                d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z">
                                                            </path>
                                                            <path fill="#006FCF"
                                                                d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z">
                                                            </path>
                                                            <path fill="#FFF"
                                                                d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z">
                                                            </path>
                                                            <path fill="#006FCF"
                                                                d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z">
                                                            </path>
                                                            <path fill="#006FCF"
                                                                d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div className="payment-item">
                                                        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24"
                                                            width="38" height="24" aria-labelledby="pi-amazon">
                                                            <title id="pi-amazon">Amazon</title>
                                                            <path
                                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                                                fill="#000" fillRule="nonzero" opacity=".07"></path>
                                                            <path
                                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                                                fill="#FFF" fillRule="nonzero"></path>
                                                            <path
                                                                d="M25.26 16.23c-1.697 1.48-4.157 2.27-6.275 2.27-2.97 0-5.644-1.3-7.666-3.463-.16-.17-.018-.402.173-.27 2.183 1.504 4.882 2.408 7.67 2.408 1.88 0 3.95-.46 5.85-1.416.288-.145.53.222.248.47v.001zm.706-.957c-.216-.328-1.434-.155-1.98-.078-.167.024-.193-.148-.043-.27.97-.81 2.562-.576 2.748-.305.187.272-.047 2.16-.96 3.063-.14.138-.272.064-.21-.12.205-.604.664-1.96.446-2.29h-.001z"
                                                                fill="#F90" fillRule="nonzero"></path>
                                                            <path
                                                                d="M21.814 15.291c-.574-.498-.676-.73-.993-1.205-.947 1.012-1.618 1.315-2.85 1.315-1.453 0-2.587-.938-2.587-2.818 0-1.467.762-2.467 1.844-2.955.94-.433 2.25-.51 3.25-.628v-.235c0-.43.033-.94-.208-1.31-.212-.333-.616-.47-.97-.47-.66 0-1.25.353-1.392 1.085-.03.163-.144.323-.3.33l-1.677-.187c-.14-.033-.296-.153-.257-.38.386-2.125 2.223-2.766 3.867-2.766.84 0 1.94.234 2.604.9.842.82.762 1.918.762 3.11v2.818c0 .847.335 1.22.65 1.676.113.164.138.36-.003.482-.353.308-.98.88-1.326 1.2a.367.367 0 0 1-.414.038zm-1.659-2.533c.34-.626.323-1.214.323-1.918v-.392c-1.25 0-2.57.28-2.57 1.82 0 .782.386 1.31 1.05 1.31.487 0 .922-.312 1.197-.82z"
                                                                fill="#221F1F"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        }
                        
                        
                    </div>
                </section>
                {/* <!-- page-cart --> */}


                {/* <!-- product --> */}
                { cartrelatedproductsloading ? 
                    <span>Loading Products you may like...</span> 
                    :
                    <section className="flat-spacing-17 pt_0">
                        <div className="container">
                            <div className="flat-title">
                                <span className="title">You may also like</span>
                            </div>
                            <div className="hover-sw-nav hover-sw-2">
                                <div className={`tf-grid-layout wrapper-shop ${isDesktop && 'tf-col-5'} ${isTablet && 'tf-col-3'} ${isMobile && 'tf-col-2'}`} id="gridLayout">
                                    
                                    {cartrelatedproducts?.map((product) => (
                                        <div key={product?.id} className="card-product grid" data-availability={product?.availability} data-brand={product?.brand}>
                                            <div className="card-product-wrapper">
                                                <Link to={`/products/${product.id}`} state={{ product }} className="product-img">
                                                    <img data-src={product?.images[0]} className=" lazyload img-product" src={product?.images[0]} alt={product?.name} />
                                                    <img className="lazyload img-hover" data-src={product?.images[1]} src={product?.images[1]} alt={`${product?.name} hover`} />
                                                </Link>
                                                <div className="list-product-btn absolute-2">
                                                    <a href="#quick_add" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white quick-add tf-btn-loading">
                                                        <span className="icon icon-bag"></span>
                                                        <span className="tooltip">Quick Add</span>
                                                    </a>
                                                    <a href="#quick_add" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white wishlist btn-icon-action">
                                                        <span className="icon icon-heart"></span>
                                                        <span className="tooltip">Add to Wishlist</span>
                                                        <span className="icon icon-delete"></span>
                                                    </a>
                                                    <a href="#quick_view" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white quickview tf-btn-loading">
                                                        <span className="icon icon-view"></span>
                                                        <span className="tooltip">Quick View</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="card-product-info">
                                                <Link to={`/products/${product.id}`} state={{ product}} className="title link">
                                                    {product?.name} (<small><strong>{product?.brand}</strong></small>)
                                                </Link>

                                                {isDiscountActive(product) && product.discount ? (
                                                    <span className="price current-price">
                                                        <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                            <small className="text-success">{product.currency}{getDiscountPrice(product.price, product.discount)}</small>
                                                            <span className="d-flex gap-2 mx-2">
                                                                {product?.sizes.map((size) => {
                                                                    const uniqueId = `${product?.id}-${size?.id}`;
                                                                    return (
                                                                        <label key={uniqueId} className="style-text small" htmlFor={uniqueId}>
                                                                            <p className="mb-0">{size.label}</p>
                                                                        </label>
                                                                    );
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="small mt-1">
                                                            <span style={{ textDecoration: 'line-through', textDecorationThickness: '0.1px', fontWeight: 'lighter' }}>
                                                                {product.currency}{product.price}
                                                            </span>
                                                            <span className="ms-2 small text-danger">{product.discount}% OFF</span>
                                                        </div>
                                                    </span>
                                                ) : (
                                                    <span className="price current-price">
                                                        <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                            <small>{product.currency}{product.price}</small>
                                                            <span className="d-flex gap-2 mx-2">
                                                                {product.sizes.map((size) => {
                                                                    const uniqueId = `${product.id}-${size.id}`;
                                                                    return (
                                                                        <label key={uniqueId} className="style-text small" htmlFor={uniqueId}>
                                                                            <p className="mb-0">{size.label}</p>
                                                                        </label>
                                                                    );
                                                                })}
                                                            </span>
                                                        </div>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                }
                
                {/* <!-- /product --> */}
                <Footer />
            </div>
            
            <Extras categories={categories} />
        </div>
    )
}
export default Cart;