import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Header from '../components/Header';
import FilterComponent from '../components/Filter';
import {BottomHorizontalScroller, MiddleHorizontalScroller, TopHorizontalScroller} from '../components/HorizontalScroller';

function Categories({ API_URL,Companyname }) {
  const { isloggedIn, userDetails } = { isloggedIn: false, userDetails: {} };

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const engineeringCategories = [
      { name: 'Electronics', url: '/electronics' },
      { name: 'Power Systems', url: '/power-systems' },
      { name: 'Software Engineering', url: '/software' },
      { name: 'Mechanical Engineering', url: '/mechanical' },
      { name: 'Civil Engineering', url: '/civil' },
      { name: 'Aerospace Engineering', url: '/aerospace' },
      { name: 'Chemical Engineering', url: '/chemical' },
      { name: 'Environmental Engineering', url: '/environmental' },
      { name: 'Robotics', url: '/robotics' },
      { name: 'Materials Science', url: '/materials' },
  ];
  // Example usage in trending items
  const trending = [
    {
        url: '/item1',
        name: 'Wireless Headphones',
        description: 'This is a great item for music lovers.',
        rating: 4.8,
        price: 29.99,
        currency: 'GBP',
        image: 'https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: '/item2',
        name: 'Smartphone',
        description: 'This is another great item with top features.',
        rating: 4.0,
        price: 19.99,
        currency: 'EUR',
        image: 'https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: '/item3',
        name: 'Smartwatch',
        description: 'An amazing gadget that you need!',
        rating: 4.5,
        price: 39.99,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: '/item4',
        name: 'Laptop',
        description: 'Top-notch quality and performance for professionals.',
        rating: 3.8,
        price: 49.99,
        currency: 'JPY',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        url: '/item5',
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
      url: '/item1',
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
      url: '/item2',
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
      url: '/item3',
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
      url: '/item4',
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
      url: '/item5',
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
          name: 'Smartphones',
          url: '/consumer-electronics/smartphones',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0Z3MedIftNbB8nRj2KI75gHaF8%26pid%3DApi&f=1&ipt=a8d0eb1b2068e2f13b12aa3ea1c686b07cd6095b211cb12de82d094e6d6e6cfc&ipo=images',
        },
        {
          name: 'Laptops',
          url: '/consumer-electronics/laptops',
          image: 'https://media.istockphoto.com/id/2164619317/photo/midsection-of-businessman-using-phone-and-laptop-at-table.jpg?s=612x612&w=0&k=20&c=VlgeUCBaItMsOOBSQwKElq01IEObMB8JNINSzkS1fY8=',
        },
        {
          name: 'Audio Equipment',
          url: '/consumer-electronics/audio',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.KzpHi9G0gGOUvCIgxqXzNgHaHa%26pid%3DApi&f=1&ipt=c39ef047dff6dfe9d4b56d125116fb4234142b387f6029d5dbae14aad3cdf888&ipo=images',
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
          name: 'Refrigerators',
          url: '/home-appliances/refrigerators',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.COSxEC1y-f90fiGb8c3PPgHaE8%26pid%3DApi&f=1&ipt=af2cf1160da2251bc33dbf1d6aeb2c528178d8a64878ff751f16f86da95f5e6c&ipo=images',
        },
        {
          name: 'Washing Machines',
          url: '/home-appliances/washing-machines',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.znKp7GGEljG3Pbn_xMmipgHaE8%26pid%3DApi&f=1&ipt=42efb94e6642056b7347e1637a735f76992b09ac18dc7c3e8bfc8ef2dc1a5b2a&ipo=images',
        },
        {
          name: 'Microwave Ovens',
          url: '/home-appliances/microwave-ovens',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZwKfBG4p1Y6QJ9XLHfl8GAHaE8%26pid%3DApi&f=1&ipt=6b4caa75ab9c8e4dc6884b6c0c7e7b2958e9ec745ea08360e689ebbe1d53b57b&ipo=images',
        },
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LcHkQQqVsAeTLQ-Jd70bsQHaD4%26pid%3DApi&f=1&ipt=fd8749e100c2e77a8ad83b90fa27a09d7245d7588a81f9498fa7e85f88910a5c&ipo=images',
        },
        {
          name: 'Women’s Clothing',
          url: '/fashion/womens-clothing',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.z5x3N7F36zmyC6hPUGj9hgHaE8%26pid%3DApi&f=1&ipt=8795aaaf375497005cf8eec0a1eb82f2a73a334d14b5184cd378207f818cb4d8&ipo=images',
        },
        {
          name: 'Footwear',
          url: '/fashion/footwear',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4rxMmzFe7bgqfj6EGBblTgHaE8%26pid%3DApi&f=1&ipt=32854f7f635c1e0eb328b77c514ae5d5c07e396641fa3cfc7c58c60e7009473a&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.GTI1sEtvnCX7BJeFyuXsZwHaE8%26pid%3DApi&f=1&ipt=1359e063ecb6a6633a205a6420d75e619c4d4b979b03402e1458aeb6da02b00&ipo=images',
        },
        {
          name: 'Outdoor Gear',
          url: '/sports-equipment/outdoor-gear',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.YfNq5C8tT42rbLlD4rDQeQHaHa%26pid%3DApi&f=1&ipt=db1b6ab1d74b3a3c79be90d3f5c9086311d04af44ca9fd64b9f30fbd7fc2a52e&ipo=images',
        },
        {
          name: 'Team Sports',
          url: '/sports-equipment/team-sports',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7P_zttE3YqOAWBdsV3R5vgHaF1%26pid%3DApi&f=1&ipt=3a670feeb036528f17deca1b88deeb6dc5d9c7a96cc409bb724075665f4731b9&ipo=images',
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
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FyuYs5rfN3m_q3g1sVN4ZgHaHa%26pid%3DApi&f=1&ipt=f1f5d225b7a956fa2fef1eaa989d34d20e4461eb3bdfb75b8e45ca70a6baec29&ipo=images',
        },
        {
          name: 'Motorcycles',
          url: '/automobiles/motorcycles',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.OyD-z8FGCByEXt1esqT3xgHaE8%26pid%3DApi&f=1&ipt=077f195dfe77f478f5a32b29b00be572abaf62aa8eec9bfe0ccf4fcb0e46227d&ipo=images',
        },
        {
          name: 'Parts & Accessories',
          url: '/automobiles/parts-accessories',
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.d9hZ24Ylj4YVpXPIuuv5kwHaE8%26pid%3DApi&f=1&ipt=4228ff0c27eaba0e5e3c9e949a5bc061c93fc4b1daaf035b2a5f0d8580a08ca5&ipo=images',
        },
      ],
    },
  ];
  
  const filterItems = ({ itemName, dateRange }) => {
    let filtered = items;

    if (itemName) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );
    }

    if (dateRange && dateRange.length === 2) {
        filtered = filtered.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= dateRange[0] && itemDate <= dateRange[1];
        });
    }

    setItems(filtered);

    setFilteredItems(filtered);
    console.log(filteredItems)
};
  useEffect(()=>{
    setIsLoading(false);
  }, [])
   if (isLoading){
    return <ImageLoader
      src={oahseicon}
      alt='oahse'
      src2 ={oahselogo}
      alt2='oahse'
    />
   }
  return (
    <div className="explore">
      <span className='d-flex flex-column topbar'>
        <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
        <FilterComponent onSearch={filterItems} name={true} date={true} price={true}/>
      </span>
      <Container fluid className='body-container'>
        <TopHorizontalScroller items={engineeringCategories} />
        <MiddleHorizontalScroller title={'Trending'} items={trending} toCurrency={"USD"} />
        <MiddleHorizontalScroller title={'New Arrivals'} items={newarrivals} toCurrency={"USD"} />
        {/* <MiddleHorizontalScroller title={'Categories'} items={categories} /> */}
        <BottomHorizontalScroller title={'Consumers Devices'} categories={categories} />

      </Container>
      
    </div>
  );
}

export default Categories;
