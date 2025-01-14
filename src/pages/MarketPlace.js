import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Header from '../components/ui/Header/Header';
import FilterComponent from '../components/Filter';
import {BottomHorizontalScroller, MiddleHorizontalScroller, TopHorizontalScroller, } from '../components/HorizontalScroller';
import { MiddleVerticalScroller } from '../components/VerticalScroller';
import { getProducts, useCategories, } from '../services/api';
import { useAuth } from '../services/auth';
import config from '../services/config';
import dayjs from 'dayjs';
import Footer from '../components/ui/Footer/Footer';
import useDeviceType from '../hooks/useDeviceType';
import useIsScrolled from '../hooks/useIsScrolled';
import { SearchInput } from '../components/ui/Input/Input';
import ScrollBar from '../components/ui/ScrollBar/ScrollBar';

function MarketPlace({ API_URL,Companyname }) {
  const { isLoggedIn:isloggedIn, userDetails, loading } = useAuth();
  const { isMobile, isTablet,isDesktop } = useDeviceType();
  const isScrolled = useIsScrolled();
  const {minprice, maxprice }  = { minprice: 0, maxprice :1000000};

  const [isLoading, setIsLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { categories:engineeringcategories, loading:iscategoryLoading, error:iscategoryerror } = useCategories(config.apiUrl);
  console.log(config.apiUrl,'===',iscategoryerror, '===', loading)
  const params ={};
  
  const [filteredItems, setFilteredItems] = useState([]);
  const noitemsPerPage = 20;

  
  // Example usage in trending items
  const trending = [
      {
          url: '/products/1',
          name: 'Wireless Headphones',
          description: 'This is a great item for music lovers.',
          rating: 4.8,
          price: 29.99,
          currency: 'GBP',
          image: 'https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
            {
              url: '/products/2',
              name: 'Wireless Headphones',
              description: 'This is a great item for music lovers.',
              rating: 4.8,
              price: 29.99,
              currency: 'GBP',
              image: 'https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
          {
            url: '/products/3',
            name: 'Wireless Headphones',
            description: 'This is a great item for music lovers.',
            rating: 4.8,
            price: 29.99,
            currency: 'GBP',
            image: 'https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          url: '/products/4',
          name: 'Wireless Headphones',
          description: 'This is a great item for music lovers.',
          rating: 4.8,
          price: 29.99,
          currency: 'GBP',
          image: 'https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
          url: '/products/5',
          name: 'Smartphone',
          description: 'This is another great item with top features.',
          rating: 4.0,
          price: 19.99,
          currency: 'EUR',
          image: 'https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
          url: '/products/6',
          name: 'Smartwatch',
          description: 'An amazing gadget that you need!',
          rating: 4.5,
          price: 39.99,
          currency: 'USD',
          image: 'https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
          url: '/products/7',
          name: 'Laptop',
          description: 'Top-notch quality and performance for professionals.',
          rating: 3.8,
          price: 49.99,
          currency: 'JPY',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
          url: '/products/8',
          name: 'Bluetooth Speaker',
          description: 'A must-have for tech lovers and music enthusiasts.',
          rating: 4.2,
          price: 24.99,
          currency: 'AUD',
          image: 'https://images.unsplash.com/photo-1618275648002-9758fc97dbf5?q=80&w=2146&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
  ];
  const newarrivals = [
    {
        url: '/products/1',
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
      url: '/products/2',
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
    url: '/products/3',
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
  url: '/products/4',
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
        url: '/products/5',
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
        url: '/products/6',
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
        url: '/products/7',
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
        url: '/products/8',
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
  const categories = [
    {
      category: {
        name: 'Consumer Electronics',
        url: '/consumer-electronics',
      },
      divisions: [
        {
          name: 'Screens',
          url: '/consumer-electronics/screens',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Wearable Devices',
          url: '/consumer-electronics/wearables',
          image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Audio Equipment',
          url: '/consumer-electronics/audio',
          image: 'https://images.unsplash.com/photo-1611532736637-13a8bdf96127?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Gaming Consoles',
          url: '/consumer-electronics/gaming',
          image: 'https://media.istockphoto.com/id/1828786159/photo/gaming-joystick-on-black-background-in-neon-light.webp?a=1&b=1&s=612x612&w=0&k=20&c=AMtECn5__foJDw2EmoYgMr_xf-Qysp_JwGBxGG3eyE4=',
        },
      ],
    },
    {
      category: {
        name: 'Home Appliances',
        url: '/home-appliances',
      },
      divisions: [
        {
          "name": "Yard",
          "url": "/home-appliances/refrigerators",
          "image": "https://images.unsplash.com/photo-1590820292118-e256c3ac2676?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Kitchen",
          "url": "/home-appliances/washing-machines",
          "image": "https://plus.unsplash.com/premium_photo-1664372899525-d99a419fd21a?q=80&w=2494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Bed Room",
          "url": "/home-appliances/fan",
          "image": "https://images.unsplash.com/photo-1629288357236-10f166066c19?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Living Room",
          "url": "/home-appliances/microwave-ovens",
          "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
    },
    {
      category: {
        name: 'Fashion',
        url: '/fashion',
      },
      divisions: [
        {
          name: 'Men’s Clothing',
          url: '/fashion/mens-clothing',
          image: 'https://images.unsplash.com/photo-1508978938672-3b8c2601c748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Women’s Clothing',
          url: '/fashion/womens-clothing',
          image: 'https://images.unsplash.com/photo-1515895691665-cb0f4a44c0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Footwear',
          url: '/fashion/footwear',
          image: 'https://images.unsplash.com/photo-1594905141417-c0c34c7e47b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
      ],
    },
    {
      category: {
        name: 'Sports Equipment',
        url: '/sports-equipment',
      },
      divisions: [
        {
          name: 'Fitness Gear',
          url: '/sports-equipment/fitness-gear',
          image: 'https://images.unsplash.com/photo-1504464751883-57d3e900f31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Outdoor Gear',
          url: '/sports-equipment/outdoor-gear',
          image: 'https://images.unsplash.com/photo-1496094241526-7c0bcd9b60d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Team Sports',
          url: '/sports-equipment/team-sports',
          image: 'https://images.unsplash.com/photo-1526394893114-e03060d70b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
      ],
    },
    {
      category: {
        name: 'Automobiles',
        url: '/automobiles',
      },
      divisions: [
        {
          name: 'Cars',
          url: '/automobiles/cars',
          image: 'https://images.unsplash.com/photo-1564188601404-48f70e1ae933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Motorcycles',
          url: '/automobiles/motorcycles',
          image: 'https://images.unsplash.com/photo-1598512001120-bb273c4ee7c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          name: 'Parts & Accessories',
          url: '/automobiles/parts-accessories',
          image: 'https://images.unsplash.com/photo-1522336541207-0e6a3fbcdb82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
      ],
    },
  ];
  // Function to simulate fetching products from API
  const fetchItems = async () => {
    try {
      const searchParams = {
          search: params?.itemName || '',
          price_range: `${params?.minPrice || minprice},${params?.maxPrice || maxprice}`,
          category: params?.selectedCategory || engineeringcategories[0].id,
          start_date: dayjs(params?.dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss') || dayjs(Date().now()).format('YYYY-MM-DD HH:mm:ss'),
          end_date: dayjs(params?.dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss')|| dayjs(Date().now()).format('YYYY-MM-DD HH:mm:ss')
      };
      const data = await getProducts(config.apiUrl, searchParams);
      
      setFilteredItems(data); // Set both full and filtered items
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
      
    }
  };

  const filterItems = ({ itemName, dateRange, minPrice, maxPrice, selectedCategory }) => {
    // Prepare the params object
    params.itemName = itemName.toLowerCase();  // Ensure lowercase for search compatibility
    params.dateRange = dateRange;
    params.minPrice=minPrice;
    params.maxPrice=maxPrice;
    params.selectedCategory = selectedCategory;


    // Pass the parameters to the API call
    fetchItems();
  };

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, []);


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
        <div className='m-2'>
          <SearchInput
              onSearch={filterItems} 
              onChangeDrawer={setDrawerVisible}
              drawervisible={drawerVisible}
              name={true} 
              date={true} 
              price={true} 
              categoryoptions={engineeringcategories}
              iscategoryLoading = {iscategoryLoading}
              minprice={minprice || 0}
              maxprice ={maxprice  || 1000000}
              />
        </div>
      </span>
      <Container fluid className='body-container'>
        <div className='top-quotation'>
          <TopHorizontalScroller 
            items = {engineeringcategories} 
            iscategoryLoading = {iscategoryLoading} 
            onSearch={filterItems} isMobile={isMobile} />
            <div className='d-flex justify-content-between align-items-center p-2 text-black'>
              <span >
                Welcome, to Oahse, <span className='fw-600'>Henrio</span>
              </span>
              <div>
                <span className='m-2' style={{cursor:'pointer'}}>
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2448 13.75V17.5H4.70255V2.5H12.5415V1.25H4.70255C4.28675 1.25 3.88798 1.3817 3.59396 1.61612C3.29994 1.85054 3.13477 2.16848 3.13477 2.5V17.5C3.13477 17.8315 3.29994 18.1495 3.59396 18.3839C3.88798 18.6183 4.28675 18.75 4.70255 18.75H17.2448C17.6607 18.75 18.0594 18.6183 18.3534 18.3839C18.6475 18.1495 18.8126 17.8315 18.8126 17.5V13.75H17.2448Z" fill="black"/>
                    <path d="M23.1571 3.60031L20.5703 1.53781C20.3358 1.35458 20.0206 1.25195 19.6923 1.25195C19.364 1.25195 19.0488 1.35458 18.8144 1.53781L7.83984 10.2878V13.7503H12.1748L23.1493 5.00031C23.3791 4.81338 23.5078 4.56206 23.5078 4.30031C23.5078 4.03856 23.3791 3.78724 23.1493 3.60031H23.1571ZM11.5241 12.5003H9.40763V10.8128L16.8076 4.90656L18.9319 6.60031L11.5241 12.5003ZM20.0372 5.71906L17.9129 4.02531L19.6923 2.60656L21.8167 4.30031L20.0372 5.71906Z" fill="black"/>
                  </svg>
                  Request for quote
                </span>
                <span className='m-2' style={{cursor:'pointer'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8.756V6.8C18 4.537 18 3.406 17.225 2.703C16.449 2 15.202 2 12.705 2H8.295C5.798 2 4.551 2 3.775 2.703C2.999 3.406 3 4.537 3 6.8V13.2C3 15.463 3 16.594 3.775 17.297C4.551 18 5.798 18 8.295 18H12.705M6 6H15M6 10H7M10 10H11M14 10H15M6 14H7M10 14H11M20.706 15.004C20.432 14.309 19.726 13.494 18.12 13.494C16.254 13.494 15.468 14.349 15.309 14.806C15.06 15.417 15.037 16.736 17.298 16.811C19.998 16.901 21.128 17.268 20.988 18.748C20.849 20.228 19.293 20.434 18.12 20.514C16.915 20.479 15.425 20.227 15 18.949M17.994 12V13.436M18.003 20.509V22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Estimate
                </span>
              </div>
            </div>
        </div>
        
        {(filteredItems?.length > 0) ?
            <div className=' mx-4'>
            <MiddleVerticalScroller title={`Results: ${filteredItems.length}`} items={filteredItems} toCurrency={"USD"} noitemsPerPage={noitemsPerPage} />

            </div>
            :
            <div className='mx-2'>
              <MiddleHorizontalScroller title={'Trending'} items={trending} toCurrency={"USD"} />
              
              <MiddleHorizontalScroller title={'New Arrivals'} items={newarrivals} toCurrency={"USD"} />
              <MiddleHorizontalScroller title={'Brands'} items={newarrivals} toCurrency={"USD"} />
              <BottomHorizontalScroller title={'Top Rated Products'} categories={categories} />
            </div>
        }
        <div className='recommended-for-you'>
          <MiddleHorizontalScroller title={'Recommended for you'} items={newarrivals} toCurrency={"USD"} />
        </div>
        
      </Container>
      <Footer className='footer' transparent={false}/>
    </div>
  );
}

export default MarketPlace;
