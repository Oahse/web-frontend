import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Header from '../components/ui/Header/Header';
import FilterComponent from '../components/Filter';
import {BottomHorizontalScroller, MiddleHorizontalScroller, } from '../components/HorizontalScroller';
import { MiddleVerticalScroller } from '../components/VerticalScroller';
import { getProducts, useCategories, } from '../services/api';
import { useAuth } from '../services/auth';
import config from '../services/config';
import dayjs from 'dayjs';
import Footer from '../components/ui/Footer/Footer';
import useDeviceType from '../hooks/useDeviceType';
import useIsScrolled from '../hooks/useIsScrolled';

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
        <FilterComponent 
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
      </span>
      <Container fluid className='body-container'>
        {/* <TopHorizontalScroller 
            items = {engineeringcategories} 
            iscategoryLoading = {iscategoryLoading} 
            onSearch={filterItems} /> */}
        {(filteredItems?.length > 0) ?
        <>
        <MiddleVerticalScroller title={`Results: ${filteredItems.length}`} items={filteredItems} toCurrency={"USD"} noitemsPerPage={noitemsPerPage} />

        </>
        :
        <>
          <MiddleHorizontalScroller title={'Trending'} items={trending} toCurrency={"USD"} />
          <MiddleHorizontalScroller title={'New Arrivals'} items={newarrivals} toCurrency={"USD"} />
          <BottomHorizontalScroller title={'Consumers Devices'} categories={categories} />
        </>
        }
        
      </Container>
      <Footer className='footer'/>
    </div>
  );
}

export default MarketPlace;
