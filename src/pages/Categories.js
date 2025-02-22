import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/ui/Loader/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import {BottomHorizontalScroller, MiddleHorizontalScroller, TopHorizontalScroller} from '../components/ui/Scroller/HorizontalScroller';
import useDeviceType from '../hooks/useDeviceType';
import { useAuth } from '../services/auth';
import useIsScrolled from '../hooks/useIsScrolled';
import { getCategories, useCategories } from '../services/api';
import config from '../services/config';
import { Link } from 'react-router-dom';
import Text from '../components/ui/Typography/Text';
import { Breadcrumb } from 'antd';
import { SearchInput } from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import dayjs from 'dayjs';
import { MiddleVerticalScroller } from '../components/ui/Scroller/VerticalScroller';
import Footer from '../components/ui/Footer/Footer';
import Header from '../components/ui/Header/Header';

function Categories({ API_URL,Companyname }) {
    const { isLoggedIn:isloggedIn, userDetails, loading } = useAuth();
    const { isMobile, isTablet,isDesktop } = useDeviceType();
    const isScrolled = useIsScrolled();
    const {minprice, maxprice }  = { minprice: 0, maxprice :1000000};
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    
    const [drawerVisible, setDrawerVisible] = useState(false);
    

    const { categories:engineeringcategories, loading:iscategoryLoading, error:iscategoryerror } = useCategories(config.apiUrl);
    console.log(config.apiUrl,'===',iscategoryerror, '===', loading)
    const params ={};
    
    const [filteredItems, setFilteredItems] = useState([]);
    const noitemsPerPage = 12;

    // Function to simulate fetching products from API
  const fetchItems = async () => {
    try {
      const searchParams = {
          search: params?.itemName || '',
          price_range: `${params?.minPrice || minprice},${params?.maxPrice || maxprice}`,
          
          start_date: dayjs(params?.dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date().now()).format('YYYY-MM-DD HH:mm:ss'),
          end_date: dayjs(params?.dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss')|| dayjs(Date().now()).format('YYYY-MM-DD HH:mm:ss')
      };
      
      if (params?.selectedCategory){
        searchParams.categories = params?.selectedCategory;
      }
      const data = await getCategories(config.apiUrl, searchParams);
      console.log(data,'====',searchParams)
      
      setFilteredItems(data); // Set both full and filtered items
      setIsSearch(true);
    } catch (error) {
      
        console.error('Error fetching items:', error);
    } finally {
      
    }
  };

  const filterItems = ({ itemName, dateRange, minPrice, maxPrice, selectedCategory }) => {
    console.log({ itemName, dateRange, minPrice, maxPrice, selectedCategory })
    // Prepare the params object
    params.itemName = itemName.toLowerCase();  // Ensure lowercase for search compatibility
    params.dateRange = dateRange;
    params.minPrice=minPrice;
    params.maxPrice=maxPrice;
    params.selectedCategory = selectedCategory;


    // Pass the parameters to the API call
    fetchItems();
  };
  const newarrivals = [
    {
        url: '/shop/products/1',
        name: 'Electric Kettle',
        description: 'Boil water quickly and efficiently with this stylish kettle.',
        rating: 4.8,
        price: 49.99,
        currency: 'GBP',
        image: 'https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        brand: {
            name: 'Breville',
            logo: 'https://www.breville.com/content/dam/breville-brands/favicon.ico'
        }
    },
    {
      url: '/shop/products/2',
      name: 'Electric Kettle',
      description: 'Boil water quickly and efficiently with this stylish kettle.',
      rating: 4.8,
      price: 49.99,
      currency: 'GBP',
      image: 'https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      brand: {
          name: 'Breville',
          logo: 'https://www.breville.com/content/dam/breville-brands/favicon.ico'
      }
  },
  {
    url: '/shop/products/3',
    name: 'Electric Kettle',
    description: 'Boil water quickly and efficiently with this stylish kettle.',
    rating: 4.8,
    price: 49.99,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    brand: {
        name: 'Breville',
        logo: 'https://www.breville.com/content/dam/breville-brands/favicon.ico'
    }
},
{
  url: '/shop/products/4',
  name: 'Electric Kettle',
  description: 'Boil water quickly and efficiently with this stylish kettle.',
  rating: 4.8,
  price: 49.99,
  currency: 'GBP',
  image: 'https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  brand: {
      name: 'Breville',
      logo: 'https://www.breville.com/content/dam/breville-brands/favicon.ico'
  }
},
    {
        url: '/shop/products/5',
        name: 'Yoga Mat',
        description: 'Durable and eco-friendly yoga mat for all types of workouts.',
        rating: 4.6,
        price: 29.99,
        currency: 'EUR',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        brand: {
            name: 'Manduka',
            logo: 'https://www.logolynx.com/images/logolynx/c8/c8126407ec5e60c90d0b9ee1569ef619.jpeg'
        }
    },
    {
        url: '/shop/products/6',
        name: 'Bluetooth Tracker',
        description: 'Never lose your belongings again with this handy tracker.',
        rating: 4.3,
        price: 19.99,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1640631826644-ff6a6337a7ff?q=80&w=2373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        brand: {
            name: 'Tile',
            logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hQs5sj-USb-1xszopZiDnwHaH6%26pid%3DApi&f=1&ipt=0261ac7da3441f7cff3af3e2556b4e42d6da2fbede909d95a563df7af2272f31&ipo=images'
        }
    },
    {
        url: '/shop/products/7',
        name: 'Portable Blender',
        description: 'Make smoothies on the go with this compact, powerful blender.',
        rating: 4.7,
        price: 39.99,
        currency: 'JPY',
        image: 'https://plus.unsplash.com/premium_photo-1690291494818-068ed0f63c42?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        brand: {
            name: 'NutriBullet',
            logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.vNO3MU__60R1SvgKF8FrnQHaHa%26pid%3DApi&f=1&ipt=a926cde097ff84ba327dec8377e2fc1b1b97a7c4780344259d9b08e961fb84c8&ipo=images'
        }
    },
    {
        url: '/shop/products/8',
        name: 'Fitness Tracker',
        description: 'Track your workouts and health metrics with this advanced device.',
        rating: 4.5,
        price: 59.99,
        currency: 'AUD',
        image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        brand: {
            name: 'Fitbit',
            logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5O8cwFpEP_cSYQAnAxUkWwHaEK%26pid%3DApi&f=1&ipt=20b6b4771a9f9ee37d11218e856b466b2a4b14c4969b918fdf378e166d46169a&ipo=images'
        }
    },
  ];
    const frequentlysearched = [
      {name:'Lafarge Cement'},
      {name:'Arduino Kit'},
      {name:'Dry Wall'},
    ]
  const Breadcrumbitems=[
    {
      title: <Link to="/" style={{cursor:'pointer'}}>Home</Link>,
    },
    {
      title: <Link to="/shop" >Shop</Link>,
    },
    {
      title: 'Categories',
    },
  ]
  
  if (isLoading) {
    return (
      <ImageLoader
        src={oahseicon}
        alt='oahse'
        src2={oahselogo}
        alt2='oahse'
      />
    );
  }

  return (
    <div className="explore">
      <span className='d-flex flex-column topbar'>
        <Header Companyname={Companyname} isScrolled={isScrolled} isMobile={isMobile} user={userDetails}/>
        <div className={!isSearch && `homepage-content`}>
            {!isSearch && <div className='row mt-0'>
              <div className='col-12 col-md-8 col-lg-8'>
                <div className='homepage-content-second'>
                  <Text fontWeight='fw-800' fontColor='text-white' fontSize='fs-2xl' style={{lineHeight:'40px'}}>
                  Quality Engineering Products, <br/>readily acessible, <br/>procurement process simplified! 
                  </Text>
                </div>
                </div>
                <div className={`col-12 col-md-4 col-lg-4 `}>
                    <span className='d-flex flex-row justify-content-center mt-3'>
                      {/* <Button
                        type='link'
                        text="Get the App"
                        color="secondary"
                        variant='outlined'
                        className='fw-500 m-auto p-2 px-5'
                        onClick={() => console.log('Button clicked')}
                      /> */}
                    </span>
                  </div>

            </div>}
            <div className='mt-4'>
              <Breadcrumb items={Breadcrumbitems} />
                <SearchInput onSearch={filterItems} 
                    drawervisible={drawerVisible}
                    categoryoptions={engineeringcategories}
                    iscategoryLoading = {iscategoryLoading}
                    minprice={minprice || 0}
                    maxprice ={maxprice  || 1000000}/>
                <div className='row text-white m-2 mt-3'>
                    <div className='col' style={{color:'white', fontSize:isMobile?10:14}}>
                        Frequently searched: 
                    </div>
                    {frequentlysearched.map((item, index)=>(
                        <div className='col' key={index}>
                            <Button
                                type='link'
                                text={item.name}
                                color="primary"
                                variant='outlined'
                                href='/shop'
                                className='bg-transparent'
                                style={{color:'white', fontSize:isMobile?8:14, margin:'4px'}}
                                onClick={() => console.log('Button clicked')}
                                /> 
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
      </span>
      <Container fluid className='body-container'>
        <div className='top-quotation'>
            {(engineeringcategories.length >0) && <TopHorizontalScroller 
                items = {engineeringcategories} 
                iscategoryLoading = {iscategoryLoading} 
                onSearch={filterItems} isMobile={isMobile} />}
            <div className='d-flex justify-content-between align-items-center px-2 fs-30 text-black'>
              <span >
                Welcome, to Oahse, <span className='fw-600'>Henrio</span>
              </span>
              <div>
                <span className='mx-2' style={{cursor:'pointer'}}>
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2448 13.75V17.5H4.70255V2.5H12.5415V1.25H4.70255C4.28675 1.25 3.88798 1.3817 3.59396 1.61612C3.29994 1.85054 3.13477 2.16848 3.13477 2.5V17.5C3.13477 17.8315 3.29994 18.1495 3.59396 18.3839C3.88798 18.6183 4.28675 18.75 4.70255 18.75H17.2448C17.6607 18.75 18.0594 18.6183 18.3534 18.3839C18.6475 18.1495 18.8126 17.8315 18.8126 17.5V13.75H17.2448Z" fill="black"/>
                    <path d="M23.1571 3.60031L20.5703 1.53781C20.3358 1.35458 20.0206 1.25195 19.6923 1.25195C19.364 1.25195 19.0488 1.35458 18.8144 1.53781L7.83984 10.2878V13.7503H12.1748L23.1493 5.00031C23.3791 4.81338 23.5078 4.56206 23.5078 4.30031C23.5078 4.03856 23.3791 3.78724 23.1493 3.60031H23.1571ZM11.5241 12.5003H9.40763V10.8128L16.8076 4.90656L18.9319 6.60031L11.5241 12.5003ZM20.0372 5.71906L17.9129 4.02531L19.6923 2.60656L21.8167 4.30031L20.0372 5.71906Z" fill="black"/>
                  </svg>
                  Request for quote
                </span>
                <span className='mx-2' style={{cursor:'pointer'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8.756V6.8C18 4.537 18 3.406 17.225 2.703C16.449 2 15.202 2 12.705 2H8.295C5.798 2 4.551 2 3.775 2.703C2.999 3.406 3 4.537 3 6.8V13.2C3 15.463 3 16.594 3.775 17.297C4.551 18 5.798 18 8.295 18H12.705M6 6H15M6 10H7M10 10H11M14 10H15M6 14H7M10 14H11M20.706 15.004C20.432 14.309 19.726 13.494 18.12 13.494C16.254 13.494 15.468 14.349 15.309 14.806C15.06 15.417 15.037 16.736 17.298 16.811C19.998 16.901 21.128 17.268 20.988 18.748C20.849 20.228 19.293 20.434 18.12 20.514C16.915 20.479 15.425 20.227 15 18.949M17.994 12V13.436M18.003 20.509V22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Estimate
                </span>
              </div>
            </div>
        </div>
        <div className=' mx-4'>
              <MiddleVerticalScroller title={`Results: ${filteredItems.length}`} items={filteredItems} toCurrency={"USD"} noitemsPerPage={noitemsPerPage} />
             
              </div>
        
        <div className='recommended-for-you'>
          <MiddleHorizontalScroller title={'Recommended for you'} items={newarrivals} toCurrency={"USD"} />
        </div>
        
      </Container>
      <Footer className='footer' transparent={false}/>
    </div>
  );
}

export default Categories;
