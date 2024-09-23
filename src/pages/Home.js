import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Header from '../components/Header';
import FilterComponent from '../components/Filter';
import {BottomHorizontalScroller, MiddleHorizontalScroller, TopHorizontalScroller} from '../components/HorizontalScroller';

function Explore({ API_URL,Companyname }) {
  const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };

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
      name: 'Refurbished',
      url: '/refurbished',
    },
    divisions: [
      {
        name: 'Laptops',
        url: '/refurbished/laptops',
        image: 'https://media.istockphoto.com/id/2164619317/photo/midsection-of-businessman-using-phone-and-laptop-at-table.jpg?s=612x612&w=0&k=20&c=VlgeUCBaItMsOOBSQwKElq01IEObMB8JNINSzkS1fY8=',
      },
      {
        name: 'Phones',
        url: '/refurbished/phones',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIF.XhmD0rcgcUbmKnkYlAe4ZQ%26pid%3DApi&f=1&ipt=f68126d1fa832e1a4490fa67d0a4826996b63dba4616a628919548b7682c1c60&ipo=images',
      },
      {
        name: 'Tablets',
        url: '/refurbished/tablets',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.obfx9Gj6WsmH8qbNbhDP7QAAAA%26pid%3DApi&f=1&ipt=b95099e84b6b71d2a2f11c9502fd0216f73e57143d2cfcf0c26b3b1d8795292c&ipo=images',
      },
      {
        name: 'Accessories',
        url: '/refurbished/accessories',
        image: 'https://img.kwcdn.com/product/fancy/c89a93ac-aa96-4940-afd1-de782e331375.jpg?imageView2/2/w/650/q/50/format/webp',
      },
    ],
  },
  {
    category: {
      name: 'Phones and Accessories',
      url: '/phones-accessories',
    },
    divisions: [
      {
        name: 'Smartphones',
        url: '/phones/smartphones',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0Z3MedIftNbB8nRj2KI75gHaF8%26pid%3DApi&f=1&ipt=a8d0eb1b2068e2f13b12aa3ea1c686b07cd6095b211cb12de82d094e6d6e6cfc&ipo=images',
      },
      {
        name: 'Cases',
        url: '/phones/cases',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tv4AhD07x7Rmi5Uu1ZWsbAHaHa%26pid%3DApi&f=1&ipt=22eae5549ce967338384153c724bb58acdba5931e1e184db41637f9c9b03192b&ipo=images',
      },
      {
        name: 'Chargers',
        url: '/phones/chargers',
        image: 'https://www.electricpoint.com/media/webp_image/catalog/product/cache/2744a43aec172f111f8d70aa521a60e0/h/y/hydra-cubus-5.webp',
      },
      {
        name: 'Headphones',
        url: '/phones/headphones',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.KzpHi9G0gGOUvCIgxqXzNgHaHa%26pid%3DApi&f=1&ipt=c39ef047dff6dfe9d4b56d125116fb4234142b387f6029d5dbae14aad3cdf888&ipo=images',
      },
    ],
  },
  {
    category: {
      name: 'Factories',
      url: '/factories',
    },
    divisions: [
      {
        name: 'Machinery',
        url: '/factories/machinery',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Niyuwg7TgCemKrPfSR5TqgHaD5%26pid%3DApi&f=1&ipt=04653a62b2349f664e765841bf963d257dc8852b6439df0f86334cf1714e0447&ipo=images',
      },
      {
        name: 'Tools',
        url: '/factories/tools',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.UHA3881NUTboly-Y6tdK5wHaEU%26pid%3DApi&f=1&ipt=525cf0545da7a4aa32389c76545150063017f04640196e5300649ffdd7414156&ipo=images',
      },
      {
        name: 'Equipment',
        url: '/factories/equipment',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.9f3ATJdlC8d76Iu-ahzHIQHaE8%26pid%3DApi&f=1&ipt=e39086472d22c70c78f29d8a49ebc232eef3a0a0b78991e85ecb1cd8bc49fe71&ipo=images',
      },
      {
        name: 'Supplies',
        url: '/factories/supplies',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.8N1IggxVOTchIAA-n45uFAHaE8%26pid%3DApi&f=1&ipt=73804b7547c0c274f6657770de5286fd27e6176c1795ef7ec1e941cc118126a2&ipo=images',
      },
    ],
  },
  {
    category: {
      name: 'Household',
      url: '/household',
    },
    divisions: [
      {
        name: 'Furniture',
        url: '/household/furniture',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.TwLq-50ZjEYXwuEwuuQW9QAAAA%26pid%3DApi&f=1&ipt=12fe7d56f690c2cf7142a52dcdd2413b37aa36364812e0e33509bffcb243e323&ipo=images',
      },
      {
        name: 'Appliances',
        url: '/household/appliances',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.SFX6BEcaKGCXiDrcEsCwqgHaFj%26pid%3DApi&f=1&ipt=feaeb9e39679a3d746cc1741c56a89eccdd77cf45bc5f4808f2dcd7d7982fe4b&ipo=images',
      },
      {
        name: 'Decor',
        url: '/household/decor',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.GzQ43SIcNP0lR1_lQA39_gAAAA%26pid%3DApi&f=1&ipt=00d8c1239ec7daa8e84522f345be1311c745dfe4b8f7b2147f530e4b914d6b82&ipo=images',
      },
      {
        name: 'Cleaning Supplies',
        url: '/household/cleaning-supplies',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.07tZs3eknI20YhpIanjdzQHaEV%26pid%3DApi&f=1&ipt=416615bd5b4f4d29a47ba8a067eed8c68fe8ab358c5178ccd3040a7cd80fa365&ipo=images',
      },
    ],
  },
  {
    category: {
      name: 'Vehicles',
      url: '/vehicles',
    },
    divisions: [
      {
        name: 'Cars',
        url: '/vehicles/cars',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FyuYs5rfN3m_q3g1sVN4ZgHaHa%26pid%3DApi&f=1&ipt=f1f5d225b7a956fa2fef1eaa989d34d20e4461eb3bdfb75b8e45ca70a6baec29&ipo=images',
      },
      {
        name: 'Bikes',
        url: '/vehicles/bikes',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.QrESk1E3KSAmGx0UKPGSwwHaFj%26pid%3DApi&f=1&ipt=153a2ed02bcf426e50dbe2d6bcd9dea6545d24e2543b6ded7d58b5ed6ee56ec3&ipo=images',
      },
      {
        name: 'Parts',
        url: '/vehicles/parts',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.r8A6ooQV0OTwKFx-1UDVeAHaD0%26pid%3DApi&f=1&ipt=66c90892140dd3ba77e04cb348efa795db708600b88d9f201ff987052f4c5157&ipo=images',
      },
      {
        name: 'Accessories',
        url: '/vehicles/accessories',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JXFyocEhMFUpG8ZH_duPYgHaF2%26pid%3DApi&f=1&ipt=1198fb452efaa793366fa0ec4715d87a2c63f2a3177a344c13f97dce83e38e2f&ipo=images',
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
        <BottomHorizontalScroller title={'Categories'} categories={categories} />

      </Container>
      
    </div>
  );
}

export default Explore;
