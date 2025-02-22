import React, {useState, useEffect } from 'react'
import FormInput from '../components/ui/Input/FormInput/FormInput'
import FormSelect from '../components/ui/Input/FormInput/FormSelect'
import { Form, message } from 'antd'
import axios from 'axios'



function TestingPage() {

    const [countries, setCountries] = useState([])
        // const [selectedCountry, setSelectedCountry] = useState('')

    // useEffect(() => {
    //     // Fetch countries and flags
    //     axios
    //       .get("https://restcountries.com/v3.1/all")
    //       .then((response) => {
    //         const countryData = response.data.map((country) => ({
    //           value: country.name.common,
    //           flag: country.flags.svg, // URL for the flag
    //           label: country.cca2, // ISO code
    //         }))
    //         .sort((a, b) => a.name.localeCompare(b.name));
    //         setCountries(countryData);
    //       })
    //       .catch((error) => console.error("Error fetching countries:", error));
    //   }, []);

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
    
            // Transform API data into options for the FormSelect component
            const countryOptions = data.map((country) => ({
              value: country.cca2, // Use the country code as the value
              label: country.name.common, // Use the common name as the label
              flag: country.flags.svg, // URL of the country's flag image
            })) 
            .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by label
    
            setCountries(countryOptions);
          } catch (error) {
            console.error("Error fetching countries:", error);
            message.error("Failed to fetch countries!");
          }
        };
    
        fetchCountries();
      }, []);
    
      const customFilterOption = (input, option) => {
        return option.label.toLowerCase().includes(input.toLowerCase());
      };
  return (
    <div>
        <FormInput/>
        <FormInput type='password' label='Password'/>

        {/* <Form.Item hasFeedback> */}
        <FormSelect
            label='Select a Country'
            name='Country'
            placeholder='Please select a country'
            options={countries}
            filterOption={customFilterOption}
        />
     
        
        
    </div>
  )
}

export default TestingPage