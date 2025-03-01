
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const truncateText = ({ text, charLimit }) => {
    /**
     * Truncate text to a certain number of characters and append '...' if needed.
     * @param {string} text - The text to truncate.
     * @param {number} charLimit - The maximum number of characters allowed.
     * @returns {string} - The truncated text with '...' if it exceeds the character limit.
     */
    if (text.length <= charLimit) {
      return text; // Return the original text if within the character limit
    }
    
    return text.slice(0, charLimit) + '...'; // Truncate to charLimit and add '...'
  };
  
const CurrencyConverter = ({ amount, fromCurrency, toCurrency }) => {
    const [conversionRate, setConversionRate] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(amount);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                const rate = response.data.rates[toCurrency];
                setConversionRate(rate);
            } catch (error) {
                console.error('Error fetching conversion rates:', error);
            }
        };

        fetchConversionRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        setConvertedAmount((amount * conversionRate).toFixed(2));
    }, [amount, conversionRate]);

    return (
        <span>{toCurrency} {convertedAmount} </span>
    );
};
const updateURL = (url, state, replace = false) =>
    replace
      ? window.history.replaceState(state, '', url)
      : window.history.pushState(state, '', url);
  
const getPathFromActivePage = (activePage) => {
    switch (activePage) {
      case 0:
        return '/admin/dashboard';
      case 1:
        return '/admin/orders';
      case 2:
        return '/admin/products';
      case 3:
        return '/admin/customers';
      case 4:
        return '/admin/contents';
      case 5:
        return '/admin/finance';
      case 6:
        return '/admin/analytics';
      case 7:
        return '/admin/discount';
      case 8:
        return '/admin/marketing';
      case 9:
        return '/admin/platform';
      default:
        return '/admin/dashboard'; // Default path if none of the cases match
    }
  };
export {CurrencyConverter, truncateText,getPathFromActivePage,updateURL}
