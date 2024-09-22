// src/pages/Map.js
import React, {useState, useEffect} from 'react';
import ImageLoader from '../components/Loader';
import Header from '../components/Header';
import FilterComponent from '../components/Filter';
import { Container } from 'react-bootstrap';
import oahseicon from '../assets/oahse-icon.png';
import oahselogo from '../assets/oahse-logo.png';

const Map= ({ API_URL,Companyname }) => {
    const { isloggedIn, userDetails } = { isloggedIn: true, userDetails: {} };
    const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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
        <div className="map">
            <span className='d-flex flex-column topbar'>
                <Header Companyname ={Companyname} isloggedIn={isloggedIn} userDetails={userDetails} />
                <FilterComponent onSearch={filterItems} name={true} date={true} price={true}/>
                <Container fluid>

                </Container>
            </span>
            
        </div>
    );
};


export default Map;
