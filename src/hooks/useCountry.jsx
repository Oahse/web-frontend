import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * Custom hook to fetch and provide a sorted list of countries with their names, flags, and ISO codes.
 *
 * @returns {Array|null} countries - An array of country objects containing `name`, `flag`, and `code`.
 *                                   Returns `null` initially until data is fetched.
 */
const useCountries = () => {
    // State to store the fetched countries
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      /**
       * Fetch countries and flags from the REST API.
       * 
       * - Uses the REST Countries API to fetch a list of all countries.
       * - Transforms the data to extract necessary fields (`name`, `flag`, `code`).
       * - Sorts the countries alphabetically by name.
       * - Updates the state with the processed list.
       */
      axios
        .get("https://restcountries.com/v3.1/all") // API endpoint to fetch country data
        .then((response) => {
          // Process and sort the data
          const countryData = response.data.map((country) => {
            const idd = country.idd?.suffixes || [];
            return {
              name: country.name.common, // Common name of the country
              flag: country.flags.svg, // URL of the country's flag image
              code: country.cca2, // ISO 3166-1 alpha-2 country code
              idd: idd.length > 0 ? idd.map(suffix => `${country.idd.root}${suffix}`) : [] // Handle the suffixes safely
            };
          });
  
          // Sort countries alphabetically by name
          countryData.sort((a, b) => a.name.localeCompare(b.name));
  
          // Update the state with the fetched and sorted country data
          setCountries(countryData);
        })
        .catch((error) => {
          // Log any errors that occur during the API call
          console.error("Error fetching countries:", error);
        });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts
  
    // Return the countries array (or null if not yet fetched)
    return countries;
  };

// ===================================÷===

/**
 * Custom hook to get the user's country based on their geolocation.
 *
 * @returns {Object|null} - The country object containing `name`, `flag`, and `code`,
 *                          or `null` if the location cannot be determined.
 */
const useCountryByLocation = () => {
    const [country, setCountry] = useState(null); // State to store the user's country
    const [error, setError] = useState(null); // State to store any errors

    useEffect(() => {
        /**
         * Fetch the user's geolocation and determine their country.
         */
        const fetchCountry = async () => {
            try {
                // Get the user's geolocation using the browser API
                // const getLocation = new Promise((resolve, reject) => {
                //     navigator.geolocation.getCurrentPosition(resolve, reject);
                // });

                // const position = await getLocation;
                // const { latitude, longitude } = position.coords;

                // Use a geolocation API to get country info from the coordinates
                // const response = await axios.get(
                //     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                // );
                const response  = await axios.get(
                    'https://ipapi.co/json/' // Example IP geolocation API
                );

                const countryData = response.data;
                // console.log('waring',response)
                // Fetch the country's flag using the REST Countries API
                const flagResponse = await axios.get(
                    `https://restcountries.com/v3.1/alpha/${countryData.country_code_iso3
                    }`
                );
                setCountry({
                    ...countryData,
                    flag: flagResponse.data[0]?.flags?.svg || '',
                });
            } catch (err) {
                console.error("Error fetching country data:", err);
                setError("Unable to determine country.");
            }
        };

        if (navigator.geolocation) {
            fetchCountry();
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []); // Empty dependency array ensures the effect runs once on mount

    return { country, error };
};


export {useCountries,useCountryByLocation};
