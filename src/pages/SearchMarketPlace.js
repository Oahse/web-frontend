import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ImageLoader from '../components/Loader';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';
import Header from '../components/Header';
import FilterComponent from '../components/Filter';
import { MiddleVerticalScroller } from '../components/VerticalScroller';
import { getProducts, useCategories, } from '../services/api';
import config from '../services/config';
import dayjs from 'dayjs';

function SearchMarketPlace({ API_URL,Companyname }) {
  const { isloggedIn, userDetails } = { isloggedIn: false, userDetails: {} };
  const {minprice, maxprice }  = { minprice: 0, maxprice :1000000};

  const [isLoading, setIsLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { categories:engineeringcategories, loading:iscategoryLoading, error:iscategoryerror } = useCategories(config.apiUrl);
  console.log(iscategoryerror)
  const params ={};
  
  // const { products:items, loading:itemsloading, error:itemserror } = useProducts(config.apiUrl, searchParams);
  const [filteredItems, setFilteredItems] = useState([]);
  const noitemsPerPage = 20;

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
        <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
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
        <span className='topscrollitem'>
          No Item matching the query found.
        </ span>
        }
        
      </Container>
      
    </div>
  );
}

export default SearchMarketPlace;
